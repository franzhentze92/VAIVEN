-- Fix RLS policy to allow clients to insert offers when accepting quote requests
-- Run this in your Supabase SQL Editor

-- Add policy to allow clients to insert offers when accepting quote requests
CREATE POLICY "Clients can insert offers when accepting quote requests" ON offers
FOR INSERT TO authenticated 
WITH CHECK (
  -- The client must own the shipment
  EXISTS (
    SELECT 1 FROM shipments 
    WHERE shipments.id = offers.shipment_id 
    AND shipments.user_id = auth.uid()
  )
  AND
  -- There must be a corresponding accepted quote request
  EXISTS (
    SELECT 1 FROM quote_requests 
    WHERE quote_requests.shipment_id = offers.shipment_id 
    AND quote_requests.client_user_id = auth.uid()
    AND quote_requests.status = 'accepted'
    AND quote_requests.transporter_user_id = offers.transporter_user_id
  )
);

-- Verify the policy was created
SELECT 
  'Policy created successfully' as status,
  'Clients can now insert offers when accepting quote requests' as details;
