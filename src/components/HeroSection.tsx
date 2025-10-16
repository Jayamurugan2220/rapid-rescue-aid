import { Button } from '@/components/ui/button';
import { MapPin, Phone } from 'lucide-react';
import AmbulanceAnimation from './AmbulanceAnimation';

const HeroSection = () => {
  const handleEmergencyRequest = () => {
    // This will be connected to backend later
    console.log('Emergency request initiated');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Ambulance Animation */}
          <div className="mb-8">
            <AmbulanceAnimation />
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-destructive bg-clip-text text-transparent">
                Emergency
              </span>
              {' '}
              <span className="text-foreground">Response</span>
              <br />
              <span className="text-foreground">In Seconds</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Request an ambulance instantly. Track in real-time. Save lives faster.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-button)] animate-pulse-emergency group"
              onClick={handleEmergencyRequest}
            >
              <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Request Ambulance Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Track Active Request
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">{'<2 min'}</div>
              <div className="text-sm text-muted-foreground">Average Response Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">24/7</div>
              <div className="text-sm text-muted-foreground">Always Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground">GPS Tracked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
