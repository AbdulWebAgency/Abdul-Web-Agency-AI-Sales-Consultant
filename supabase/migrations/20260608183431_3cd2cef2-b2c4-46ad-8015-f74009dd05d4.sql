-- Move has_role out of the API-exposed public schema into a private schema so
-- signed-in users cannot call the SECURITY DEFINER function through PostgREST.
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Repoint all RLS policies to private.has_role
DROP POLICY IF EXISTS "admins insert projects" ON public.projects;
DROP POLICY IF EXISTS "admins update projects" ON public.projects;
DROP POLICY IF EXISTS "admins delete projects" ON public.projects;
CREATE POLICY "admins insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "admins update projects" ON public.projects FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "admins delete projects" ON public.projects FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins read enquiries" ON public.contact_submissions;
DROP POLICY IF EXISTS "admins update enquiries" ON public.contact_submissions;
DROP POLICY IF EXISTS "admins delete enquiries" ON public.contact_submissions;
CREATE POLICY "admins read enquiries" ON public.contact_submissions FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "admins update enquiries" ON public.contact_submissions FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "admins delete enquiries" ON public.contact_submissions FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins upload portfolio" ON storage.objects;
DROP POLICY IF EXISTS "admins update portfolio" ON storage.objects;
DROP POLICY IF EXISTS "admins delete portfolio" ON storage.objects;
CREATE POLICY "admins upload portfolio" ON storage.objects FOR INSERT TO authenticated WITH CHECK ((bucket_id = 'portfolio') AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "admins update portfolio" ON storage.objects FOR UPDATE TO authenticated USING ((bucket_id = 'portfolio') AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "admins delete portfolio" ON storage.objects FOR DELETE TO authenticated USING ((bucket_id = 'portfolio') AND private.has_role(auth.uid(), 'admin'::public.app_role));

-- Drop the public-schema function now that nothing references it
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);