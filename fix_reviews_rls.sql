-- Fix RLS policies for reviews table to allow transporters to see reviews about them
-- Run this in your Supabase SQL Editor

-- Drop ALL existing policies first
DROP POLICY IF EXISTS "Users can view their own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can insert their own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can update their own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can delete their own reviews" ON reviews;
DROP POLICY IF EXISTS "Clients can view their own reviews" ON reviews;
DROP POLICY IF EXISTS "Transporters can view reviews about them" ON reviews;

-- Create new policies that allow both clients and transporters to see relevant reviews

-- Policy: Clients can see reviews they created
CREATE POLICY "Clients can view their own reviews" ON reviews
  FOR SELECT USING (auth.uid() = client_user_id);

-- Policy: Transporters can see reviews about them
CREATE POLICY "Transporters can view reviews about them" ON reviews
  FOR SELECT USING (auth.uid() = transporter_user_id);

-- Policy: Users can only insert reviews for themselves (as clients)
CREATE POLICY "Users can insert their own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = client_user_id);

-- Policy: Users can only update their own reviews
CREATE POLICY "Users can update their own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = client_user_id);

-- Policy: Users can only delete their own reviews
CREATE POLICY "Users can delete their own reviews" ON reviews
  FOR DELETE USING (auth.uid() = client_user_id);

-- Grant permissions
GRANT ALL ON reviews TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Test the policies
SELECT 'Reviews RLS policies updated successfully!' as status;
