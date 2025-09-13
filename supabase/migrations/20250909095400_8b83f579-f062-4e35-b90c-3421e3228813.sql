-- Add missing columns to bookings table if they don't exist
DO $$ 
BEGIN
    -- Check and add columns one by one
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='service_id') THEN
        ALTER TABLE public.bookings ADD COLUMN service_id UUID REFERENCES public.services(id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='technician_id') THEN
        ALTER TABLE public.bookings ADD COLUMN technician_id UUID REFERENCES public.technicians(id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='priority') THEN
        ALTER TABLE public.bookings ADD COLUMN priority booking_priority DEFAULT 'medium';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='scheduled_start') THEN
        ALTER TABLE public.bookings ADD COLUMN scheduled_start TIMESTAMP WITH TIME ZONE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='scheduled_end') THEN
        ALTER TABLE public.bookings ADD COLUMN scheduled_end TIMESTAMP WITH TIME ZONE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='actual_start') THEN
        ALTER TABLE public.bookings ADD COLUMN actual_start TIMESTAMP WITH TIME ZONE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='actual_end') THEN
        ALTER TABLE public.bookings ADD COLUMN actual_end TIMESTAMP WITH TIME ZONE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='total_cost') THEN
        ALTER TABLE public.bookings ADD COLUMN total_cost DECIMAL(10,2);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='notes') THEN
        ALTER TABLE public.bookings ADD COLUMN notes TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='location_coordinates') THEN
        ALTER TABLE public.bookings ADD COLUMN location_coordinates POINT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='completion_photos') THEN
        ALTER TABLE public.bookings ADD COLUMN completion_photos TEXT[];
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='bookings' AND column_name='customer_signature') THEN
        ALTER TABLE public.bookings ADD COLUMN customer_signature TEXT;
    END IF;
END $$;

-- Add missing columns to profiles table if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='address') THEN
        ALTER TABLE public.profiles ADD COLUMN address JSONB;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='emergency_contact') THEN
        ALTER TABLE public.profiles ADD COLUMN emergency_contact JSONB;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='preferences') THEN
        ALTER TABLE public.profiles ADD COLUMN preferences JSONB;
    END IF;
END $$;

-- Create function to check user role (if not exists)
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
  SELECT role::TEXT FROM public.user_roles WHERE user_id = user_uuid LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Insert default service categories if they don't exist
INSERT INTO public.service_categories (name, description, icon) 
SELECT name, description, icon FROM (VALUES
    ('Kitchen Appliances', 'Repair services for kitchen appliances', '🍳'),
    ('Home Appliances', 'General household appliance repairs', '🏠'),
    ('Cleaning & Laundry', 'Washing machines, dryers, and cleaning equipment', '🧺'),
    ('HVAC Systems', 'Heating, ventilation, and air conditioning', '❄️'),
    ('Electronics', 'TV, audio systems, and electronic devices', '📺')
) AS new_categories(name, description, icon)
WHERE NOT EXISTS (SELECT 1 FROM public.service_categories WHERE service_categories.name = new_categories.name);

-- Insert sample services if they don't exist
INSERT INTO public.services (category_id, name, description, base_price, estimated_duration)
SELECT 
    sc.id,
    services_data.service_name,
    services_data.service_desc,
    services_data.price::DECIMAL(10,2),
    services_data.duration
FROM public.service_categories sc
CROSS JOIN (VALUES
    ('Kitchen Appliances', 'Refrigerator Repair', 'Complete refrigerator diagnosis and repair', 89.99, 120),
    ('Kitchen Appliances', 'Dishwasher Repair', 'Dishwasher maintenance and repair service', 79.99, 90),
    ('Kitchen Appliances', 'Oven Repair', 'Oven and range repair services', 99.99, 150),
    ('Kitchen Appliances', 'Microwave Repair', 'Microwave diagnosis and repair', 59.99, 60),
    ('Cleaning & Laundry', 'Washing Machine Repair', 'Complete washing machine service', 89.99, 120),
    ('Cleaning & Laundry', 'Dryer Repair', 'Dryer maintenance and repair', 79.99, 90),
    ('HVAC Systems', 'AC Repair', 'Air conditioning system repair', 129.99, 180),
    ('Electronics', 'TV Repair', 'Television diagnosis and repair', 89.99, 120)
) AS services_data(category_name, service_name, service_desc, price, duration)
WHERE sc.name = services_data.category_name
AND NOT EXISTS (SELECT 1 FROM public.services WHERE services.name = services_data.service_name);

-- Create function to automatically create warranty after booking completion
CREATE OR REPLACE FUNCTION public.create_warranty_on_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- Create warranty when booking is completed
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    INSERT INTO public.warranties (booking_id, start_date, end_date, terms)
    VALUES (
      NEW.id,
      CURRENT_DATE,
      CURRENT_DATE + INTERVAL '28 days',
      'RepairUp standard 28-day warranty covers parts and labor for the specific repair performed.'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS create_warranty_on_booking_completion ON public.bookings;
CREATE TRIGGER create_warranty_on_booking_completion
  AFTER UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.create_warranty_on_completion();