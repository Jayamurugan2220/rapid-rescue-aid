-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create ambulances table
CREATE TABLE public.ambulances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_number TEXT NOT NULL UNIQUE,
  driver_name TEXT NOT NULL,
  driver_phone TEXT NOT NULL,
  current_latitude NUMERIC(10, 8),
  current_longitude NUMERIC(11, 8),
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.ambulances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available ambulances"
  ON public.ambulances FOR SELECT
  USING (true);

-- Create ambulance requests table
CREATE TABLE public.ambulance_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  emergency_type TEXT NOT NULL,
  pickup_latitude NUMERIC(10, 8) NOT NULL,
  pickup_longitude NUMERIC(11, 8) NOT NULL,
  pickup_address TEXT,
  ambulance_id UUID REFERENCES public.ambulances(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'en_route', 'arrived', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.ambulance_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own requests"
  ON public.ambulance_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create requests"
  ON public.ambulance_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own requests"
  ON public.ambulance_requests FOR UPDATE
  USING (auth.uid() = user_id);

-- Enable realtime for ambulance requests
ALTER PUBLICATION supabase_realtime ADD TABLE public.ambulance_requests;

-- Insert sample ambulances
INSERT INTO public.ambulances (vehicle_number, driver_name, driver_phone, current_latitude, current_longitude, is_available)
VALUES 
  ('AMB-001', 'John Smith', '+1-555-0101', 40.7128, -74.0060, true),
  ('AMB-002', 'Sarah Johnson', '+1-555-0102', 40.7589, -73.9851, true),
  ('AMB-003', 'Mike Davis', '+1-555-0103', 40.7484, -73.9857, true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for ambulance_requests
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.ambulance_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();