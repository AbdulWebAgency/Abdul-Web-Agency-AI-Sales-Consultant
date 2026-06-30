
CREATE POLICY "portfolio public read" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'portfolio');
CREATE POLICY "admins upload portfolio" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update portfolio" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete portfolio" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
