import { Navigation, Clock, Shield, Phone, MapPin, Activity } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Instant Location Detection',
    description: 'Automatically shares your location with nearest ambulance services for fastest response.',
    color: 'text-primary',
  },
  {
    icon: Navigation,
    title: 'Real-Time Tracking',
    description: 'Watch the ambulance approach on live map with ETA updates every second.',
    color: 'text-secondary',
  },
  {
    icon: Clock,
    title: 'Quick Response',
    description: 'Average response time under 2 minutes. Every second counts in emergencies.',
    color: 'text-accent',
  },
  {
    icon: Shield,
    title: 'Verified Ambulances',
    description: 'All registered ambulances are verified with certified medical staff onboard.',
    color: 'text-primary',
  },
  {
    icon: Phone,
    title: 'Direct Communication',
    description: 'Instant call connection with ambulance crew and emergency contacts.',
    color: 'text-secondary',
  },
  {
    icon: Activity,
    title: '24/7 Availability',
    description: 'Round-the-clock emergency response. Help is always just a tap away.',
    color: 'text-accent',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why Choose <span className="text-primary">Rapid Rescue</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced technology meets emergency care. Built for speed, reliability, and peace of mind.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-card)] animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`mb-4 inline-block p-3 rounded-lg bg-muted ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
