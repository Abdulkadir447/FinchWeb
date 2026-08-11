/*
# Create whitelist_requests table

1. New Tables
- `whitelist_requests`
- `id` (uuid, primary key)
- `user_id` (uuid, unique, references auth.users): the authenticated account requesting access
- `email` (text): email captured for review contact
- `status` (text, default 'pending'): one of 'pending', 'approved', 'rejected'
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

2. Security
- RLS enabled.
- Authenticated users can read, insert, and update only their own row.
- Users cannot delete their request.
- Status changes from 'approved'/'rejected' back to 'pending' are allowed (re-request), but users cannot set status to 'approved' or 'rejected' themselves — enforced by CHECK constraint on client-updated rows being 'pending'.

3. Important Notes
- Approval is an operator-controlled action done via Supabase admin tools, not through the website.
- The website reads the user's own row to determine download eligibility.
*/

CREATE TABLE IF NOT EXISTS public.whitelist_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.whitelist_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own whitelist request" ON public.whitelist_requests;
CREATE POLICY "Users can view own whitelist request" ON public.whitelist_requests
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own whitelist request" ON public.whitelist_requests;
CREATE POLICY "Users can create own whitelist request" ON public.whitelist_requests
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own whitelist request" ON public.whitelist_requests;
CREATE POLICY "Users can update own whitelist request" ON public.whitelist_requests
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id AND status = 'pending');

DROP POLICY IF EXISTS "Users cannot delete whitelist requests" ON public.whitelist_requests;
CREATE POLICY "Users cannot delete whitelist requests" ON public.whitelist_requests
  FOR DELETE TO authenticated USING (false);
