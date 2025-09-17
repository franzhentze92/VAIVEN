-- Create shipments table for client shipments
-- Run this in your Supabase SQL Editor

-- Create the shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  origin_address TEXT NOT NULL,
  destination_address TEXT NOT NULL,
  pickup_date TIMESTAMP WITH TIME ZONE,
  delivery_date TIMESTAMP WITH TIME ZONE,
  pickup_time TEXT,
  delivery_time TEXT,
  weight DECIMAL(10,2) NOT NULL,
  volume DECIMAL(10,2),
  cargo_type TEXT NOT NULL,
  dimensions_length DECIMAL(10,2),
  dimensions_width DECIMAL(10,2),
  dimensions_height DECIMAL(10,2),
  pieces INTEGER,
  packaging TEXT,
  special_requirements TEXT,
  insurance_value DECIMAL(10,2),
  pickup_instructions TEXT,
  delivery_instructions TEXT,
  contact_person TEXT,
  contact_phone TEXT,
  priority TEXT DEFAULT 'normal',
  temperature TEXT,
  humidity TEXT,
  customs BOOLEAN DEFAULT false,
  documents TEXT[] DEFAULT '{}',
  pickup_lat DECIMAL(10,8),
  pickup_lng DECIMAL(11,8),
  delivery_lat DECIMAL(10,8),
  delivery_lng DECIMAL(11,8),
  estimated_price DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'booked', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shipments_user_id ON shipments(user_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_shipments_cargo_type ON shipments(cargo_type);
CREATE INDEX IF NOT EXISTS idx_shipments_created_at ON shipments(created_at);
CREATE INDEX IF NOT EXISTS idx_shipments_pickup_date ON shipments(pickup_date);
CREATE INDEX IF NOT EXISTS idx_shipments_origin_destination ON shipments(origin_address, destination_address);

-- Add RLS (Row Level Security) policies
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view their own shipments
CREATE POLICY "Users can view own shipments" ON shipments
FOR SELECT TO authenticated 
USING (auth.uid() = user_id);

-- Policy 2: Users can insert their own shipments
CREATE POLICY "Users can insert own shipments" ON shipments
FOR INSERT TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can update their own shipments
CREATE POLICY "Users can update own shipments" ON shipments
FOR UPDATE TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy 4: Users can delete their own shipments
CREATE POLICY "Users can delete own shipments" ON shipments
FOR DELETE TO authenticated 
USING (auth.uid() = user_id);

-- Policy 5: Transporters can view pending shipments (for marketplace)
CREATE POLICY "Transporters can view pending shipments" ON shipments
FOR SELECT TO authenticated 
USING (status = 'pending');

-- Grant necessary permissions
GRANT ALL ON shipments TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS trg_shipments_updated_at ON shipments;
CREATE TRIGGER trg_shipments_updated_at
    BEFORE UPDATE ON shipments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments to document the table
COMMENT ON TABLE shipments IS 'Client shipments for transportation';
COMMENT ON COLUMN shipments.user_id IS 'The client who created the shipment';
COMMENT ON COLUMN shipments.status IS 'Current status of the shipment';
COMMENT ON COLUMN shipments.priority IS 'Priority level: low, normal, high, urgent';
COMMENT ON COLUMN shipments.cargo_type IS 'Type of cargo being transported';
COMMENT ON COLUMN shipments.documents IS 'Array of required documents';

-- Verify the table was created successfully
SELECT 
  'Shipments table created successfully' as status,
  'Clients can now create shipments for transportation' as details;

-- Show the table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'shipments' 
ORDER BY ordinal_position;
