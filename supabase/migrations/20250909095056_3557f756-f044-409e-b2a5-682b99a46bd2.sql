-- Create enums for various status types
CREATE TYPE public.booking_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE public.technician_status AS ENUM ('available', 'busy', 'offline', 'on_break');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE public.payment_method AS ENUM ('card', 'cash', 'bank_transfer');
CREATE TYPE public.warranty_status AS ENUM ('active', 'expired', 'voided');
CREATE TYPE public.user_role AS ENUM ('admin', 'customer', 'technician', 'manager');

-- Create service_categories table
CREATE TABLE public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create services table for predefined repair services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.service_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2),
  estimated_duration INTEGER, -- in minutes
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create technicians table
CREATE TABLE public.technicians (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE, -- Reference to auth user if technician has login
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  specialties TEXT[], -- Array of specialization areas
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_jobs INTEGER DEFAULT 0,
  status technician_status DEFAULT 'available',
  location JSONB, -- Current location for dispatch
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method payment_method NOT NULL,
  payment_status payment_status DEFAULT 'pending',
  transaction_id TEXT,
  stripe_payment_intent_id TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create warranties table
CREATE TABLE public.warranties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  warranty_period INTEGER DEFAULT 28, -- days
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status warranty_status DEFAULT 'active',
  terms TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create reviews_ratings table
CREATE TABLE public.reviews_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  technician_id UUID REFERENCES public.technicians(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'customer',
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- Enhance existing bookings table with new columns
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS service_id UUID REFERENCES public.services(id),
ADD COLUMN IF NOT EXISTS technician_id UUID REFERENCES public.technicians(id),
ADD COLUMN IF NOT EXISTS priority booking_priority DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS scheduled_start TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS scheduled_end TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS actual_start TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS actual_end TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS total_cost DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS location_coordinates POINT, -- Precise GPS coordinates
ADD COLUMN IF NOT EXISTS completion_photos TEXT[], -- Array of photo URLs
ADD COLUMN IF NOT EXISTS customer_signature TEXT; -- Base64 signature

-- Enhance profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS address JSONB, -- Structured address
ADD COLUMN IF NOT EXISTS emergency_contact JSONB, -- Emergency contact info
ADD COLUMN IF NOT EXISTS preferences JSONB; -- User preferences

-- Enable RLS on all tables
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.warranties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
  SELECT role::TEXT FROM public.user_roles WHERE user_id = user_uuid LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create RLS policies for service_categories (public read, admin write)
CREATE POLICY "Anyone can view service categories" ON public.service_categories
FOR SELECT USING (true);

CREATE POLICY "Admins can manage service categories" ON public.service_categories
FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create RLS policies for services (public read, admin write)
CREATE POLICY "Anyone can view services" ON public.services
FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage services" ON public.services
FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create RLS policies for technicians
CREATE POLICY "Admins can view all technicians" ON public.technicians
FOR SELECT USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

CREATE POLICY "Technicians can view their own profile" ON public.technicians
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage technicians" ON public.technicians
FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- Create RLS policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE bookings.id = payments.booking_id 
    AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create payments for their bookings" ON public.payments
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE bookings.id = booking_id 
    AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage all payments" ON public.payments
FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- Create RLS policies for warranties
CREATE POLICY "Users can view their own warranties" ON public.warranties
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE bookings.id = warranties.booking_id 
    AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage warranties" ON public.warranties
FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'manager'));

-- Create RLS policies for reviews_ratings
CREATE POLICY "Anyone can view reviews" ON public.reviews_ratings
FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for their bookings" ON public.reviews_ratings
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own reviews" ON public.reviews_ratings
FOR UPDATE USING (user_id = auth.uid());

-- Create RLS policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage user roles" ON public.user_roles
FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create triggers for updated_at columns
CREATE TRIGGER update_service_categories_updated_at
  BEFORE UPDATE ON public.service_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER update_technicians_updated_at
  BEFORE UPDATE ON public.technicians
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER update_warranties_updated_at
  BEFORE UPDATE ON public.warranties
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER update_reviews_ratings_updated_at
  BEFORE UPDATE ON public.reviews_ratings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Insert default service categories
INSERT INTO public.service_categories (name, description, icon) VALUES
('Kitchen Appliances', 'Repair services for kitchen appliances', '🍳'),
('Home Appliances', 'General household appliance repairs', '🏠'),
('Cleaning & Laundry', 'Washing machines, dryers, and cleaning equipment', '🧺'),
('HVAC Systems', 'Heating, ventilation, and air conditioning', '❄️'),
('Electronics', 'TV, audio systems, and electronic devices', '📺');

-- Insert sample services
INSERT INTO public.services (category_id, name, description, base_price, estimated_duration) 
SELECT 
  sc.id,
  service_name,
  service_desc,
  price::DECIMAL(10,2),
  duration
FROM public.service_categories sc
CROSS JOIN (VALUES
  ('Refrigerator Repair', 'Complete refrigerator diagnosis and repair', 89.99, 120),
  ('Dishwasher Repair', 'Dishwasher maintenance and repair service', 79.99, 90),
  ('Oven Repair', 'Oven and range repair services', 99.99, 150),
  ('Microwave Repair', 'Microwave diagnosis and repair', 59.99, 60),
  ('Washing Machine Repair', 'Complete washing machine service', 89.99, 120),
  ('Dryer Repair', 'Dryer maintenance and repair', 79.99, 90),
  ('AC Repair', 'Air conditioning system repair', 129.99, 180),
  ('TV Repair', 'Television diagnosis and repair', 89.99, 120)
) AS services(service_name, service_desc, price, duration)
WHERE sc.name IN ('Kitchen Appliances', 'Home Appliances', 'Cleaning & Laundry', 'HVAC Systems', 'Electronics');

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

-- Create trigger for automatic warranty creation
CREATE TRIGGER create_warranty_on_booking_completion
  AFTER UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.create_warranty_on_completion();