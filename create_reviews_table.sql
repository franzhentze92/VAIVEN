-- Create reviews table for storing client reviews of transporters
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
  transporter_user_id UUID REFERENCES auth.users(id),
  client_user_id UUID REFERENCES auth.users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_shipment_id ON reviews(shipment_id);
CREATE INDEX IF NOT EXISTS idx_reviews_transporter_user_id ON reviews(transporter_user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_client_user_id ON reviews(client_user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);

-- Add RLS (Row Level Security) policies
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see reviews they created
CREATE POLICY "Users can view their own reviews" ON reviews
  FOR SELECT USING (auth.uid() = client_user_id);

-- Policy: Users can only insert reviews for themselves
CREATE POLICY "Users can insert their own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = client_user_id);

-- Policy: Users can only update their own reviews
CREATE POLICY "Users can update their own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = client_user_id);

-- Policy: Users can only delete their own reviews
CREATE POLICY "Users can delete their own reviews" ON reviews
  FOR DELETE USING (auth.uid() = client_user_id);
