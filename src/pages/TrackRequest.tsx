import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MapPin, Phone, Clock, Activity } from 'lucide-react';

const TrackRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState<any>(null);
  const [ambulance, setAmbulance] = useState<any>(null);

  useEffect(() => {
    loadRequest();
    
    const channel = supabase
      .channel(`request-${id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'ambulance_requests',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          setRequest(payload.new);
          if (payload.new.ambulance_id) {
            loadAmbulance(payload.new.ambulance_id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const loadRequest = async () => {
    try {
      const { data: requestData, error } = await supabase
        .from('ambulance_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setRequest(requestData);

      if (requestData.ambulance_id) {
        await loadAmbulance(requestData.ambulance_id);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load request details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadAmbulance = async (ambulanceId: string) => {
    const { data } = await supabase
      .from('ambulances')
      .select('*')
      .eq('id', ambulanceId)
      .single();
    
    if (data) {
      setAmbulance(data);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500',
      assigned: 'bg-blue-500',
      en_route: 'bg-orange-500',
      arrived: 'bg-green-500',
      completed: 'bg-gray-500',
      cancelled: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: 'Finding Ambulance...',
      assigned: 'Ambulance Assigned',
      en_route: 'Ambulance On The Way',
      arrived: 'Ambulance Arrived',
      completed: 'Request Completed',
      cancelled: 'Request Cancelled',
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Request not found</p>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          ← Back to Home
        </Button>

        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Request Status</CardTitle>
                <Badge className={getStatusColor(request.status)}>
                  {getStatusText(request.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Activity className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Emergency Type</p>
                  <p className="text-muted-foreground capitalize">
                    {request.emergency_type.replace('_', ' ')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Pickup Location</p>
                  <p className="text-muted-foreground">{request.pickup_address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Requested At</p>
                  <p className="text-muted-foreground">
                    {new Date(request.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ambulance Details */}
          {ambulance && (
            <Card>
              <CardHeader>
                <CardTitle>Ambulance Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Vehicle Number</p>
                  <p className="text-2xl font-bold text-primary">
                    {ambulance.vehicle_number}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Driver</p>
                    <p className="text-muted-foreground">{ambulance.driver_name}</p>
                  </div>
                  <div>
                    <p className="font-medium">Contact</p>
                    <a 
                      href={`tel:${ambulance.driver_phone}`}
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <Phone className="h-4 w-4" />
                      {ambulance.driver_phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Patient Details */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">Name</p>
                <p className="text-muted-foreground">{request.patient_name}</p>
              </div>
              <div>
                <p className="font-medium">Contact</p>
                <p className="text-muted-foreground">{request.patient_phone}</p>
              </div>
              {request.notes && (
                <div>
                  <p className="font-medium">Additional Notes</p>
                  <p className="text-muted-foreground">{request.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackRequest;
