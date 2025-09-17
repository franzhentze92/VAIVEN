-- Create offers table for transporter offers on shipments
-- Run this in your Supabase SQL Editor

-- Create the offers table
CREATE TABLE IF NOT EXISTS offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  transporter_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  message TEXT,
  estimated_duration TEXT,
  vehicle_type TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'paid', 'completed', 'cancelled')),
  accepted_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_offers_shipment_id ON offers(shipment_id);
CREATE INDEX IF NOT EXISTS idx_offers_transporter_user_id ON offers(transporter_user_id);
CREATE INDEX IF NOT EXISTS idx_offers_status ON offers(status);
CREATE INDEX IF NOT EXISTS idx_offers_created_at ON offers(created_at);

-- Add RLS (Row Level Security) policies
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view offers on their shipments
CREATE POLICY "Users can view offers on their shipments" ON offers
FOR SELECT TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM shipments 
    WHERE shipments.id = offers.shipment_id 
    AND shipments.user_id = auth.uid()
  )
);

-- Policy 2: Transporters can view their own offers
CREATE POLICY "Transporters can view their own offers" ON offers
FOR SELECT TO authenticated 
USING (auth.uid() = transporter_user_id);

-- Policy 3: Transporters can insert offers on shipments
CREATE POLICY "Transporters can insert offers" ON offers
FOR INSERT TO authenticated 
WITH CHECK (
  auth.uid() = transporter_user_id AND
  EXISTS (
    SELECT 1 FROM shipments 
    WHERE shipments.id = offers.shipment_id 
    AND shipments.status = 'pending'
  )
);

-- Policy 4: Clients can update offers on their shipments (accept/reject)
CREATE POLICY "Clients can update offers on their shipments" ON offers
FOR UPDATE TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM shipments 
    WHERE shipments.id = offers.shipment_id 
    AND shipments.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM shipments 
    WHERE shipments.id = offers.shipment_id 
    AND shipments.user_id = auth.uid()
  )
);

-- Policy 5: Transporters can update their own offers (limited fields)
CREATE POLICY "Transporters can update their own offers" ON offers
FOR UPDATE TO authenticated 
USING (auth.uid() = transporter_user_id)
WITH CHECK (auth.uid() = transporter_user_id);

-- Grant necessary permissions
GRANT ALL ON offers TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS trg_offers_updated_at ON offers;
CREATE TRIGGER trg_offers_updated_at
    BEFORE UPDATE ON offers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments to document the table
COMMENT ON TABLE offers IS 'Transporter offers on client shipments';
COMMENT ON COLUMN offers.shipment_id IS 'The shipment being offered on';
COMMENT ON COLUMN offers.transporter_user_id IS 'The transporter making the offer';
COMMENT ON COLUMN offers.amount IS 'The quoted amount for the shipment';
COMMENT ON COLUMN offers.status IS 'Current status of the offer';

-- Verify the table was created successfully
SELECT 
  'Offers table created successfully' as status,
  'Transporters can now make offers on shipments' as details;

-- Show the table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'offers' 
ORDER BY ordinal_position;
