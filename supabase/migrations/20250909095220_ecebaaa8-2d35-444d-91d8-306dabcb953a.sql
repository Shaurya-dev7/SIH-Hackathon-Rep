-- Fix security warning: Set search_path for functions
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
  SELECT role::TEXT FROM public.user_roles WHERE user_id = user_uuid LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;