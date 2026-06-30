
-- Document feedback table insertion model: writes happen only via server route
-- using service_role (which bypasses RLS). No anon/authenticated INSERT policy
-- is intentional. Admin reads/updates/deletes already covered by existing
-- policies using private.has_role(...).
COMMENT ON TABLE public.feedback IS
  'User feedback from AI consultant. Inserts happen exclusively via the server route /api/public/feedback-submit using the service role; no public INSERT policy is granted by design. Admin read/update/delete handled by RLS via private.has_role().';

-- Storage policies for the private bug-screenshots bucket.
-- Uploads happen via the server route using service_role (bypasses RLS).
-- Admin users need to be able to list/read objects from the dashboard.
DROP POLICY IF EXISTS "Admins can read bug screenshots" ON storage.objects;
CREATE POLICY "Admins can read bug screenshots"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'bug-screenshots'
    AND private.has_role(auth.uid(), 'admin'::public.app_role)
  );

DROP POLICY IF EXISTS "Admins can delete bug screenshots" ON storage.objects;
CREATE POLICY "Admins can delete bug screenshots"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'bug-screenshots'
    AND private.has_role(auth.uid(), 'admin'::public.app_role)
  );
