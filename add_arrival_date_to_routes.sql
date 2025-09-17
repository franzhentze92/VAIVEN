-- Add arrival_date field to transporter_routes table
-- This field will store the actual arrival date specified by the transportista

-- Add the arrival_date column if it doesn't exist
ALTER TABLE IF EXISTS public.transporter_routes 
ADD COLUMN IF NOT EXISTS arrival_date DATE;

-- Add a comment to document the field
COMMENT ON COLUMN public.transporter_routes.arrival_date IS 'Actual arrival date specified by the transportista when creating the route';

-- Create an index on arrival_date for better query performance
CREATE INDEX IF NOT EXISTS idx_transporter_routes_arrival_date ON public.transporter_routes(arrival_date);

-- Update existing routes to have a default arrival date (1 day after departure)
-- This is a one-time migration for existing data
UPDATE public.transporter_routes 
SET arrival_date = departure_date + INTERVAL '1 day'
WHERE arrival_date IS NULL AND departure_date IS NOT NULL;

-- For routes without departure_date, set arrival_date to created_at + 1 day
UPDATE public.transporter_routes 
SET arrival_date = created_at + INTERVAL '1 day'
WHERE arrival_date IS NULL AND departure_date IS NULL;
