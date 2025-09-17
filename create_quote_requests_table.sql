-- Create quote_requests table for client-to-transporter quote requests
-- Run this in your Supabase SQL Editor

-- Create the quote_requests table
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  client_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transporter_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'accepted', 'rejected', 'expired')),
  response_message TEXT,
  response_amount DECIMAL(10,2),
  response_estimated_duration TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quote_requests_shipment_id ON quote_requests(shipment_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_client_user_id ON quote_requests(client_user_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_transporter_user_id ON quote_requests(transporter_user_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_quote_requests_expires_at ON quote_requests(expires_at);

-- Add RLS (Row Level Security) policies
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view quote requests where they are either the client or the transporter
CREATE POLICY "Users can view relevant quote requests" ON quote_requests
FOR SELECT TO authenticated 
USING (
  auth.uid() = client_user_id OR 
  auth.uid() = transporter_user_id
);

-- Policy 2: Clients can insert quote requests where they are the client
CREATE POLICY "Clients can insert quote requests" ON quote_requests
FOR INSERT TO authenticated 
WITH CHECK (
  auth.uid() = client_user_id
);

-- Policy 3: Transporters can update quote requests where they are the transporter (to respond)
CREATE POLICY "Transporters can respond to quote requests" ON quote_requests
FOR UPDATE TO authenticated 
USING (auth.uid() = transporter_user_id)
WITH CHECK (auth.uid() = transporter_user_id);

-- Policy 4: Clients can update quote requests where they are the client (to accept/reject responses)
CREATE POLICY "Clients can update their quote requests" ON quote_requests
FOR UPDATE TO authenticated 
USING (auth.uid() = client_user_id)
WITH CHECK (auth.uid() = client_user_id);

-- Policy 5: Clients can delete their own quote requests
CREATE POLICY "Clients can delete their quote requests" ON quote_requests
FOR DELETE TO authenticated 
USING (auth.uid() = client_user_id);

-- Grant necessary permissions
GRANT ALL ON quote_requests TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_quote_requests_updated_at ON quote_requests;
CREATE TRIGGER trg_quote_requests_updated_at
    BEFORE UPDATE ON quote_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments to document the table
COMMENT ON TABLE quote_requests IS 'Client-to-transporter quote requests';
COMMENT ON COLUMN quote_requests.shipment_id IS 'The shipment the client wants quoted';
COMMENT ON COLUMN quote_requests.client_user_id IS 'The client requesting the quote';
COMMENT ON COLUMN quote_requests.transporter_user_id IS 'The transporter being asked for a quote';
COMMENT ON COLUMN quote_requests.message IS 'Initial message from client';
COMMENT ON COLUMN quote_requests.status IS 'Current status of the quote request';
COMMENT ON COLUMN quote_requests.response_message IS 'Transporter response message';
COMMENT ON COLUMN quote_requests.response_amount IS 'Transporter quoted amount';
COMMENT ON COLUMN quote_requests.response_estimated_duration IS 'Transporter estimated duration';
COMMENT ON COLUMN quote_requests.expires_at IS 'When the quote request expires';

-- Verify the table was created successfully
SELECT 
  'Quote requests table created successfully' as status,
  'Clients can now send quote requests to transporters' as details;

-- Show the table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'quote_requests' 
ORDER BY ordinal_position;
