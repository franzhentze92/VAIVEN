-- Run this in your Supabase SQL Editor to fix the profile loading issue
-- This script is safe to run multiple times

-- Ensure required extensions
create extension if not exists pgcrypto;

-- 1. Create the client_profiles table with proper structure (won't fail if exists)
CREATE TABLE IF NOT EXISTS client_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    full_name TEXT,
    phone TEXT,
    company TEXT,
    language TEXT NOT NULL DEFAULT 'es',
    notifications TEXT NOT NULL DEFAULT 'all',
    currency TEXT NOT NULL DEFAULT 'GTQ',
    default_origin TEXT,
    preferred_transporters TEXT NOT NULL DEFAULT 'any',
    insurance_level TEXT NOT NULL DEFAULT 'basic',
    profile_picture_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 2. Create index for faster lookups (won't fail if exists)
CREATE INDEX IF NOT EXISTS idx_client_profiles_user_id ON client_profiles(user_id);

-- 3. Enable Row Level Security (won't fail if already enabled)
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Users can view own profile" ON client_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON client_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON client_profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON client_profiles;

-- 5. Create new policies
CREATE POLICY "Users can view own profile" ON client_profiles
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own profile" ON client_profiles
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own profile" ON client_profiles
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own profile" ON client_profiles
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- 6. Grant permissions (won't fail if already granted)
GRANT ALL ON client_profiles TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- 7. Create function to auto-update updated_at (won't fail if exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. Drop existing trigger if exists, then recreate
DROP TRIGGER IF EXISTS update_client_profiles_updated_at ON client_profiles;

-- 9. Create trigger for updated_at
CREATE TRIGGER update_client_profiles_updated_at 
    BEFORE UPDATE ON client_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 10. Test the setup and show current status
SELECT 'Database setup complete!' as status;

-- 11. Show current table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'client_profiles' 
ORDER BY ordinal_position;

-- 12. Show current policies
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'client_profiles';

-- Transporter profiles schema (safe to run multiple times)

-- Table
create table if not exists public.transporter_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  company text,
  language text not null default 'es',
  notifications text not null default 'all',
  service_areas text,
  vehicle_types text,
  capacity_kg numeric(12,2),
  bio text,
  -- additional business fields
  fleet_size integer,
  operating_hours text,
  vehicle_plate text,
  license_number text,
  insurance_provider text,
  insurance_number text,
  years_experience integer,
  preferred_routes text,
  profile_picture_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ensure columns exist when table already created
alter table public.transporter_profiles
  add column if not exists fleet_size integer,
  add column if not exists operating_hours text,
  add column if not exists vehicle_plate text,
  add column if not exists license_number text,
  add column if not exists insurance_provider text,
  add column if not exists insurance_number text,
  add column if not exists years_experience integer,
  add column if not exists preferred_routes text,
  add column if not exists dpi_number text,
  add column if not exists birth_date date,
  add column if not exists birth_place text,
  add column if not exists address text,
  add column if not exists email text;

alter table public.transporter_profiles enable row level security;

-- Policies
drop policy if exists "Transporter view own" on public.transporter_profiles;
create policy "Transporter view own" on public.transporter_profiles
for select to authenticated using (user_id = auth.uid());

drop policy if exists "Transporter insert own" on public.transporter_profiles;
create policy "Transporter insert own" on public.transporter_profiles
for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "Transporter update own" on public.transporter_profiles;
create policy "Transporter update own" on public.transporter_profiles
for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "Transporter delete own" on public.transporter_profiles;
create policy "Transporter delete own" on public.transporter_profiles
for delete to authenticated using (user_id = auth.uid());

-- Grants for PostgREST (authenticated role)
grant all on public.transporter_profiles to authenticated;
grant usage on schema public to authenticated;

-- Trigger for updated_at
drop trigger if exists trg_transporter_profiles_updated_at on public.transporter_profiles;
create trigger trg_transporter_profiles_updated_at
before update on public.transporter_profiles
for each row execute function update_updated_at_column();

-- Vehicles extended details (idempotent)
alter table if exists public.transporter_vehicles
  add column if not exists brand text,
  add column if not exists model text,
  add column if not exists axle_count integer,
  add column if not exists length_m numeric(8,2),
  add column if not exists width_m numeric(8,2),
  add column if not exists height_m numeric(8,2),
  add column if not exists fuel_type text,
  add column if not exists emission_standard text,
  add column if not exists gps_tracking boolean default false,
  add column if not exists owner_type text;

-- Routes: link to a specific vehicle (idempotent)
alter table if exists public.transporter_routes
  add column if not exists vehicle_id uuid references public.transporter_vehicles(id) on delete set null;
create index if not exists idx_transporter_routes_vehicle_id on public.transporter_routes(vehicle_id);

-- COMPREHENSIVE FIX FOR TRANSPORTER_PROFILES TABLE
-- This script ensures all required fields exist and fixes any constraint issues

-- First, let's check if the table exists and create it if it doesn't
create table if not exists public.transporter_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  company text,
  language text not null default 'es',
  notifications text not null default 'all',
  service_areas text,
  vehicle_types text,
  capacity_kg numeric(12,2),
  bio text,
  fleet_size integer,
  operating_hours text,
  vehicle_plate text,
  license_number text,
  insurance_provider text,
  insurance_number text,
  years_experience integer,
  preferred_routes text,
  profile_picture_url text,
  email text,
  dpi_number text,
  birth_date date,
  birth_place text,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Now add any missing columns (safe to run multiple times)
alter table public.transporter_profiles
  add column if not exists email text,
  add column if not exists dpi_number text,
  add column if not exists birth_date date,
  add column if not exists birth_place text,
  add column if not exists address text,
  add column if not exists fleet_size integer,
  add column if not exists operating_hours text,
  add column if not exists vehicle_plate text,
  add column if not exists license_number text,
  add column if not exists insurance_provider text,
  add column if not exists insurance_number text,
  add column if not exists years_experience integer,
  add column if not exists preferred_routes text,
  add column if not exists profile_picture_url text,
  add column if not exists capacity_kg numeric(12,2),
  add column if not exists vehicle_types text,
  add column if not exists bio text;

-- Ensure the table has the correct structure
comment on table public.transporter_profiles is 'Complete transporter profile information for client display';

-- Enable RLS if not already enabled
alter table public.transporter_profiles enable row level security;

-- Drop and recreate policies to ensure they're correct
drop policy if exists "Transporter view own" on public.transporter_profiles;
drop policy if exists "Transporter insert own" on public.transporter_profiles;
drop policy if exists "Transporter update own" on public.transporter_profiles;
drop policy if exists "Transporter delete own" on public.transporter_profiles;
drop policy if exists "Clients can view transporter profiles" on public.transporter_profiles;

-- Create policies
create policy "Transporter view own" on public.transporter_profiles
for select to authenticated using (user_id = auth.uid());

create policy "Transporter insert own" on public.transporter_profiles
for insert to authenticated with check (user_id = auth.uid());

create policy "Transporter update own" on public.transporter_profiles
for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Transporter delete own" on public.transporter_profiles
for delete to authenticated using (user_id = auth.uid());

-- NEW POLICY: Allow clients to view transporter profiles when evaluating offers
create policy "Clients can view transporter profiles" on public.transporter_profiles
for select to authenticated using (true);

-- Grant permissions
grant all on public.transporter_profiles to authenticated;
grant usage on schema public to authenticated;

-- Create/update trigger for updated_at
drop trigger if exists trg_transporter_profiles_updated_at on public.transporter_profiles;
create trigger trg_transporter_profiles_updated_at
before update on public.transporter_profiles
for each row execute function update_updated_at_column();

-- Create unique constraint on user_id to prevent duplicates
drop index if exists idx_transporter_profiles_user_id_unique;
create unique index idx_transporter_profiles_user_id_unique on public.transporter_profiles(user_id);

-- Show final table structure
select 
  'Database setup complete! Transporter profiles table is ready.' as status,
  'All required fields have been added.' as details;

-- =====================================================
-- CLEANUP SCRIPT FOR DUPLICATE PROFILES
-- =====================================================
-- Run this if you're getting duplicate key constraint errors

-- First, let's see if there are duplicate profiles
SELECT 
  user_id,
  COUNT(*) as profile_count,
  array_agg(id) as profile_ids
FROM transporter_profiles 
GROUP BY user_id 
HAVING COUNT(*) > 1;

-- If duplicates exist, keep the most recent one and delete others
WITH duplicate_profiles AS (
  SELECT 
    user_id,
    id,
    created_at,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) as rn
  FROM transporter_profiles
)
DELETE FROM transporter_profiles 
WHERE id IN (
  SELECT id 
  FROM duplicate_profiles 
  WHERE rn > 1
);

-- Verify the cleanup worked
SELECT 
  user_id,
  COUNT(*) as profile_count
FROM transporter_profiles 
GROUP BY user_id 
HAVING COUNT(*) > 1;

-- If no results above, cleanup was successful!
-- Now try saving your profile again in the frontend.

-- =====================================================
-- QUICK TEST FOR USER ID MISMATCH
-- =====================================================
-- Run this to see if there's a user ID format mismatch

-- Check the exact user_id from offers table
SELECT 
  'Offers table' as source,
  transporter_user_id,
  transporter_name,
  LENGTH(transporter_user_id::text) as id_length,
  transporter_user_id::text as id_as_text
FROM offers 
WHERE transporter_user_id IS NOT NULL
LIMIT 3;

-- Check the exact user_id from transporter_profiles table
SELECT 
  'Profiles table' as source,
  user_id,
  full_name,
  LENGTH(user_id::text) as id_length,
  user_id::text as id_as_text
FROM transporter_profiles 
LIMIT 3;

-- Try to find the specific user ID from the offer
SELECT 
  'Looking for specific user ID' as test,
  'f9ff0e6f-fe36-47a7-a2ac-6ff76d1b3801' as search_id,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM transporter_profiles 
      WHERE user_id = 'f9ff0e6f-fe36-47a7-a2ac-6ff76d1b3801'
    ) THEN 'FOUND in profiles'
    ELSE 'NOT FOUND in profiles'
  END as result;

-- Check if there are any profiles at all
SELECT 
  'Total profiles count' as info,
  COUNT(*) as total_profiles
FROM transporter_profiles;

-- =====================================================
-- DEBUGGING SCRIPTS FOR CLIENT DASHBOARD ISSUE
-- =====================================================
-- Run these to see why transporter profile data isn't showing up

-- 1. Check if transporter_profiles table has data
SELECT 
  'transporter_profiles table data' as table_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN full_name IS NOT NULL THEN 1 END) as profiles_with_names,
  COUNT(CASE WHEN phone IS NOT NULL THEN 1 END) as profiles_with_phones,
  COUNT(CASE WHEN company IS NOT NULL THEN 1 END) as profiles_with_companies
FROM transporter_profiles;

-- 2. Check specific transporter profile data
SELECT 
  id,
  user_id,
  full_name,
  phone,
  company,
  email,
  dpi_number,
  license_number,
  years_experience,
  service_areas,
  created_at
FROM transporter_profiles 
LIMIT 5;

-- 3. Check offers table to see transporter_user_ids
SELECT 
  'offers table data' as table_name,
  COUNT(*) as total_offers,
  COUNT(CASE WHEN transporter_user_id IS NOT NULL THEN 1 END) as offers_with_transporter,
  COUNT(DISTINCT transporter_user_id) as unique_transporters
FROM offers;

-- 4. Check specific offers with transporter info
SELECT 
  id,
  shipment_id,
  transporter_user_id,
  transporter_name,
  amount,
  created_at
FROM offers 
WHERE transporter_user_id IS NOT NULL
LIMIT 5;

-- 5. Check if there's a mismatch between offers and profiles
SELECT 
  o.id as offer_id,
  o.transporter_user_id,
  o.transporter_name,
  CASE 
    WHEN tp.id IS NOT NULL THEN 'Profile found'
    ELSE 'No profile found'
  END as profile_status,
  tp.full_name as profile_name,
  tp.phone as profile_phone
FROM offers o
LEFT JOIN transporter_profiles tp ON o.transporter_user_id = tp.user_id
WHERE o.transporter_user_id IS NOT NULL
LIMIT 10;

-- 6. Check if the user_id format matches between tables
SELECT 
  'Sample user_id from offers:' as info,
  transporter_user_id,
  LENGTH(transporter_user_id::text) as id_length
FROM offers 
WHERE transporter_user_id IS NOT NULL 
LIMIT 1;

SELECT 
  'Sample user_id from profiles:' as info,
  user_id,
  LENGTH(user_id::text) as id_length
FROM transporter_profiles 
LIMIT 1;

-- =====================================================
-- QUICK FIX FOR CLIENT DASHBOARD ISSUE
-- =====================================================
-- This will fix the empty profile fields issue

-- Add policy to allow clients to view transporter profiles
DROP POLICY IF EXISTS "Clients can view transporter profiles" ON public.transporter_profiles;
CREATE POLICY "Clients can view transporter profiles" ON public.transporter_profiles
FOR SELECT TO authenticated USING (true);

-- Verify the policy was created
SELECT 
  'Policy created successfully' as status,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'transporter_profiles' 
AND policyname = 'Clients can view transporter profiles';

-- ========================================
-- VEHICLE LOADING ISSUE DEBUG & FIX
-- ========================================

-- 1. Check the transporter_vehicles table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default,
  is_identity
FROM information_schema.columns 
WHERE table_name = 'transporter_vehicles' 
ORDER BY ordinal_position;

-- 2. Check if the table has the correct primary key
SELECT 
  tc.constraint_name,
  tc.constraint_type,
  kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = 'transporter_vehicles' 
  AND tc.constraint_type = 'PRIMARY KEY';

-- 3. Check RLS policies on transporter_vehicles
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'transporter_vehicles';

-- 4. Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'transporter_vehicles';

-- 5. Check the actual data in transporter_vehicles
SELECT 
  id,
  user_id,
  name,
  vehicle_type,
  created_at
FROM transporter_vehicles 
LIMIT 10;

-- 6. Check the offers table to see what vehicle_ids are stored
SELECT 
  id,
  transporter_user_id,
  vehicle_id,
  vehicle_type,
  created_at
FROM offers 
WHERE vehicle_id IS NOT NULL
LIMIT 10;

-- 7. Check if there's a mismatch between offers.vehicle_id and transporter_vehicles.id
SELECT 
  o.id as offer_id,
  o.vehicle_id as offer_vehicle_id,
  o.vehicle_type as offer_vehicle_type,
  tv.id as vehicle_id,
  tv.name as vehicle_name,
  tv.vehicle_type as vehicle_type
FROM offers o
LEFT JOIN transporter_vehicles tv ON o.vehicle_id = tv.id
WHERE o.vehicle_id IS NOT NULL
LIMIT 10;

-- 8. If the transporter_vehicles table is missing the id column or has wrong type, fix it:
-- (Run this only if the table structure is wrong)

-- First, check if the id column exists and has the right type
DO $$
BEGIN
  -- Check if id column exists and is UUID
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'transporter_vehicles' 
    AND column_name = 'id' 
    AND data_type = 'uuid'
  ) THEN
    -- Add id column if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'transporter_vehicles' 
      AND column_name = 'id'
    ) THEN
      ALTER TABLE transporter_vehicles ADD COLUMN id UUID DEFAULT gen_random_uuid();
    ELSE
      -- Change existing id column to UUID
      ALTER TABLE transporter_vehicles ALTER COLUMN id TYPE UUID USING id::uuid;
    END IF;
    
    -- Make it primary key if it's not already
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE table_name = 'transporter_vehicles' 
      AND constraint_type = 'PRIMARY KEY'
    ) THEN
      ALTER TABLE transporter_vehicles ADD PRIMARY KEY (id);
    END IF;
  END IF;
END $$;

-- 9. Ensure RLS policies allow reading vehicles
-- Drop existing policies if they're too restrictive
DROP POLICY IF EXISTS "Users can view own vehicles" ON public.transporter_vehicles;
DROP POLICY IF EXISTS "Users can insert own vehicles" ON public.transporter_vehicles;
DROP POLICY IF EXISTS "Users can update own vehicles" ON public.transporter_vehicles;
DROP POLICY IF EXISTS "Users can delete own vehicles" ON public.transporter_vehicles;

-- Create proper RLS policies
CREATE POLICY "Users can view own vehicles" ON public.transporter_vehicles
FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can insert own vehicles" ON public.transporter_vehicles
FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own vehicles" ON public.transporter_vehicles
FOR UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can delete own vehicles" ON public.transporter_vehicles
FOR DELETE TO authenticated USING (user_id = auth.uid());

-- 10. Verify the fix by checking the data again
SELECT 
  o.id as offer_id,
  o.vehicle_id as offer_vehicle_id,
  o.vehicle_type as offer_vehicle_type,
  tv.id as vehicle_id,
  tv.name as vehicle_name,
  tv.vehicle_type as vehicle_type
FROM offers o
LEFT JOIN transporter_vehicles tv ON o.vehicle_id = tv.id
WHERE o.vehicle_id IS NOT NULL
LIMIT 10;

-- ========================================
-- VEHICLE PHOTO FIELD CHECK & FIX
-- ========================================

-- Check if vehicles have a photo field
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'transporter_vehicles' 
AND column_name IN ('photo_url', 'image_url', 'picture_url', 'profile_picture_url')
ORDER BY column_name;

-- If no photo field exists, add one
DO $$
BEGIN
  -- Check if photo_url column exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'transporter_vehicles' 
    AND column_name = 'photo_url'
  ) THEN
    -- Add photo_url column
    ALTER TABLE transporter_vehicles ADD COLUMN photo_url TEXT;
    
    -- Add comment
    COMMENT ON COLUMN transporter_vehicles.photo_url IS 'URL to vehicle photo/image';
    
    RAISE NOTICE 'Added photo_url column to transporter_vehicles table';
  ELSE
    RAISE NOTICE 'photo_url column already exists in transporter_vehicles table';
  END IF;
END $$;

-- Check the final table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'transporter_vehicles' 
ORDER BY ordinal_position;

-- ========================================
-- VEHICLE PHOTOS - USING EXISTING BUCKET
-- ========================================

-- Vehicle photos are uploaded to the existing 'transporter-docs' bucket
-- This bucket already has the correct RLS policies for authenticated users
-- No additional setup required!

-- The system will:

-- Create RLS policy to allow authenticated users to upload vehicle photos
CREATE POLICY "Allow authenticated users to upload vehicle photos" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'vehicle-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create RLS policy to allow authenticated users to view vehicle photos
CREATE POLICY "Allow authenticated users to view vehicle photos" ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'vehicle-photos'
);

-- Create RLS policy to allow users to update their own vehicle photos
CREATE POLICY "Allow users to update own vehicle photos" ON storage.objects
FOR UPDATE TO authenticated
USING (
  bucket_id = 'vehicle-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create RLS policy to allow users to delete their own vehicle photos
CREATE POLICY "Allow users to delete own vehicle photos" ON storage.objects
FOR DELETE TO authenticated
USING (
  bucket_id = 'vehicle-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Alternative: If you prefer to use the existing transporter-docs bucket, update its policies:
-- (Uncomment these if you want to use transporter-docs instead)

/*
-- Update transporter-docs bucket policies to allow vehicle photo uploads
CREATE POLICY "Allow authenticated users to upload vehicle photos to transporter-docs" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'transporter-docs' AND
  (storage.foldername(name))[1] = 'vehicle-photos' AND
  auth.uid()::text = (storage.foldername(name))[2]
);

CREATE POLICY "Allow authenticated users to view vehicle photos from transporter-docs" ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'transporter-docs' AND
  (storage.foldername(name))[1] = 'vehicle-photos'
);
*/
