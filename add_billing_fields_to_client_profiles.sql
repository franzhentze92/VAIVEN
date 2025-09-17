-- Add billing and payment fields to existing client_profiles table
-- Run this in your Supabase SQL Editor to add the new billing functionality

-- Add new billing and payment columns
ALTER TABLE client_profiles 
ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS bank_name TEXT,
ADD COLUMN IF NOT EXISTS account_number TEXT,
ADD COLUMN IF NOT EXISTS billing_address TEXT,
ADD COLUMN IF NOT EXISTS tax_id TEXT,
ADD COLUMN IF NOT EXISTS billing_company_name TEXT,
ADD COLUMN IF NOT EXISTS auto_confirm_payments TEXT DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS payment_reminders TEXT DEFAULT 'enabled';

-- Add comments to document the new fields
COMMENT ON COLUMN client_profiles.payment_method IS 'Preferred payment method for the client';
COMMENT ON COLUMN client_profiles.bank_name IS 'Bank name for bank transfers';
COMMENT ON COLUMN client_profiles.account_number IS 'Bank account number';
COMMENT ON COLUMN client_profiles.billing_address IS 'Complete billing address';
COMMENT ON COLUMN client_profiles.tax_id IS 'Tax identification number (NIT/DPI)';
COMMENT ON COLUMN client_profiles.billing_company_name IS 'Company name for billing purposes';
COMMENT ON COLUMN client_profiles.auto_confirm_payments IS 'Auto-confirmation preference for payments';
COMMENT ON COLUMN client_profiles.payment_reminders IS 'Payment reminder preferences';

-- Update existing profiles to have default values for new fields
UPDATE client_profiles 
SET 
  payment_method = COALESCE(payment_method, 'manual'),
  auto_confirm_payments = COALESCE(auto_confirm_payments, 'manual'),
  payment_reminders = COALESCE(payment_reminders, 'enabled')
WHERE payment_method IS NULL OR auto_confirm_payments IS NULL OR payment_reminders IS NULL;

-- Show the updated table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'client_profiles' 
ORDER BY ordinal_position;
