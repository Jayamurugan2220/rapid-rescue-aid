import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MapPin, Phone } from 'lucide-react';

const RequestAmbulance = () => {
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [emergencyType, setEmergencyType] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        loadUserProfile(session.user.id);
      }
    });
  }, [navigate]);

  const loadUserProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (data) {
      setPatientName(data.full_name || '');
      setPatientPhone(data.phone_number || '');
    }
  };

  const getCurrentLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            setAddress(data.display_name || `${lat}, ${lng}`);
          } catch (error) {
            setAddress(`${lat}, ${lng}`);
          }
          
          setLoadingLocation(false);
          toast({
            title: "Location detected",
            description: "Your current location has been set.",
          });
        },
        (error) => {
          setLoadingLocation(false);
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      setLoadingLocation(false);
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      toast({
        title: "Location required",
        description: "Please detect your location first.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ambulance_requests')
        .insert([
          {
            user_id: user.id,
            patient_name: patientName,
            patient_phone: patientPhone,
            emergency_type: emergencyType,
            pickup_latitude: location.lat,
            pickup_longitude: location.lng,
            pickup_address: address,
            notes: notes || null,
            status: 'pending',
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Request submitted!",
        description: "An ambulance is being dispatched to your location.",
      });
      navigate(`/track/${data.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          ← Back to Home
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Request Emergency Ambulance</CardTitle>
            <CardDescription>
              Fill in the details below. Help is on the way!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientPhone">Patient Phone</Label>
                <Input
                  id="patientPhone"
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyType">Emergency Type</Label>
                <Select value={emergencyType} onValueChange={setEmergencyType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select emergency type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiac">Cardiac Emergency</SelectItem>
                    <SelectItem value="accident">Traffic Accident</SelectItem>
                    <SelectItem value="breathing">Breathing Difficulty</SelectItem>
                    <SelectItem value="trauma">Severe Trauma</SelectItem>
                    <SelectItem value="stroke">Stroke</SelectItem>
                    <SelectItem value="other">Other Medical Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Pickup Location</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={loadingLocation}
                    className="flex-1"
                  >
                    {loadingLocation ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <MapPin className="mr-2 h-4 w-4" />
                    )}
                    Detect My Location
                  </Button>
                </div>
                {address && (
                  <p className="text-sm text-muted-foreground mt-2">
                    📍 {address}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any important medical information or directions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                disabled={loading || !location}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Requesting Ambulance...
                  </>
                ) : (
                  <>
                    <Phone className="mr-2 h-4 w-4" />
                    Request Ambulance Now
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestAmbulance;
