-- Create payments table for storing payment records
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
  client_user_id UUID REFERENCES auth.users(id),
  transporter_user_id UUID REFERENCES auth.users(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'GTQ',
  payment_method TEXT DEFAULT 'manual',
  transaction_id TEXT,
  status TEXT DEFAULT 'completed',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_offer_id ON payments(offer_id);
CREATE INDEX IF NOT EXISTS idx_payments_client_user_id ON payments(client_user_id);
CREATE INDEX IF NOT EXISTS idx_payments_transporter_user_id ON payments(transporter_user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

-- Add RLS (Row Level Security) policies
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see payments they made (as clients)
CREATE POLICY "Users can view their own payments" ON payments
  FOR SELECT USING (auth.uid() = client_user_id);

-- Policy: Users can insert their own payments
CREATE POLICY "Users can insert their own payments" ON payments
  FOR INSERT WITH CHECK (auth.uid() = client_user_id);

-- Policy: Users can update their own payments
CREATE POLICY "Users can update their own payments" ON payments
  FOR UPDATE USING (auth.uid() = client_user_id);

-- Policy: Users can delete their own payments
CREATE POLICY "Users can delete their own payments" ON payments
  FOR DELETE USING (auth.uid() = client_user_id);
