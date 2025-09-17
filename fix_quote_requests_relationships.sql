-- Fix quote_requests table relationships
-- Run this in your Supabase SQL Editor

-- First, let's check the current structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'quote_requests' 
ORDER BY ordinal_position;

-- Add foreign key constraint to transporter_profiles if it doesn't exist
-- First check if the constraint already exists
SELECT 
  conname,
  contype,
  confrelid::regclass AS referenced_table,
  conkey,
  confkey
FROM pg_constraint 
WHERE conrelid = 'quote_requests'::regclass 
AND contype = 'f';

-- If the foreign key doesn't exist, add it
-- Note: This assumes transporter_profiles has user_id as the primary key
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conrelid = 'quote_requests'::regclass 
        AND confrelid = 'transporter_profiles'::regclass
        AND contype = 'f'
    ) THEN
        ALTER TABLE quote_requests 
        ADD CONSTRAINT fk_quote_requests_transporter_profiles 
        FOREIGN KEY (transporter_user_id) REFERENCES transporter_profiles(user_id) ON DELETE CASCADE;
    END IF;
END $$;

-- Also ensure the relationship to client_profiles exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conrelid = 'quote_requests'::regclass 
        AND confrelid = 'client_profiles'::regclass
        AND contype = 'f'
    ) THEN
        ALTER TABLE quote_requests 
        ADD CONSTRAINT fk_quote_requests_client_profiles 
        FOREIGN KEY (client_user_id) REFERENCES client_profiles(user_id) ON DELETE CASCADE;
    END IF;
END $$;

-- Verify the relationships are now in place
SELECT 
  conname as constraint_name,
  contype as constraint_type,
  confrelid::regclass AS referenced_table,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'quote_requests'::regclass 
AND contype = 'f';

-- Test the relationship by trying a simple query
SELECT 'Testing quote_requests relationship...' as status;

-- This should work now without the relationship error
SELECT 
  qr.id,
  qr.status,
  tp.company,
  tp.full_name
FROM quote_requests qr
LEFT JOIN transporter_profiles tp ON qr.transporter_user_id = tp.user_id
LIMIT 5;

SELECT 'Relationships fixed successfully!' as status;
