-- Update billing fields to focus on card details instead of bank details
-- Run this in your Supabase SQL Editor to update the billing functionality

-- Remove old billing fields that are no longer needed
ALTER TABLE client_profiles 
DROP COLUMN IF EXISTS bank_name,
DROP COLUMN IF EXISTS account_number,
DROP COLUMN IF EXISTS auto_confirm_payments,
DROP COLUMN IF EXISTS payment_reminders,
DROP COLUMN IF EXISTS payment_method;

-- Add new card detail fields
ALTER TABLE client_profiles 
ADD COLUMN IF NOT EXISTS card_number TEXT,
ADD COLUMN IF NOT EXISTS card_expiry TEXT,
ADD COLUMN IF NOT EXISTS card_cvv TEXT;

-- Add comments to document the new fields
COMMENT ON COLUMN client_profiles.card_number IS 'Credit/debit card number (masked)';
COMMENT ON COLUMN client_profiles.card_expiry IS 'Card expiration date (MM/YY)';
COMMENT ON COLUMN client_profiles.card_cvv IS 'Card security code (CVV)';
COMMENT ON COLUMN client_profiles.billing_address IS 'Complete billing address';
COMMENT ON COLUMN client_profiles.tax_id IS 'Tax identification number (NIT/DPI)';
COMMENT ON COLUMN client_profiles.billing_company_name IS 'Company name for billing purposes';

-- Show the updated table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'client_profiles' 
ORDER BY ordinal_position;
