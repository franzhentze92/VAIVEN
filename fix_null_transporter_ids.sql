-- Fix NULL transporter_user_id values in reviews table
-- Run this in your Supabase SQL Editor

-- First, let's see what shipments these NULL reviews belong to
SELECT 
  r.id as review_id,
  r.shipment_id,
  r.transporter_user_id,
  r.client_user_id,
  r.rating,
  r.comment,
  s.title as shipment_title
FROM reviews r
LEFT JOIN shipments s ON r.shipment_id = s.id
WHERE r.transporter_user_id IS NULL;

-- Now let's find the transporter_user_id for these shipments from the offers table
SELECT 
  r.id as review_id,
  r.shipment_id,
  r.transporter_user_id as current_transporter_id,
  o.transporter_user_id as correct_transporter_id,
  r.rating,
  r.comment,
  s.title as shipment_title
FROM reviews r
LEFT JOIN shipments s ON r.shipment_id = s.id
LEFT JOIN offers o ON r.shipment_id = o.shipment_id AND o.status IN ('paid', 'completed')
WHERE r.transporter_user_id IS NULL;

-- Update the NULL transporter_user_id values
UPDATE reviews 
SET transporter_user_id = (
  SELECT o.transporter_user_id 
  FROM offers o 
  WHERE o.shipment_id = reviews.shipment_id 
  AND o.status IN ('paid', 'completed')
  LIMIT 1
)
WHERE transporter_user_id IS NULL;

-- Verify the fix
SELECT 
  r.id as review_id,
  r.shipment_id,
  r.transporter_user_id,
  r.client_user_id,
  r.rating,
  r.comment,
  s.title as shipment_title
FROM reviews r
LEFT JOIN shipments s ON r.shipment_id = s.id
ORDER BY r.created_at DESC;

SELECT 'Reviews updated successfully!' as status;
