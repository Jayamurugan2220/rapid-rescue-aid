import { MapPin, Phone, Navigation, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    number: '01',
    title: 'Request Emergency',
    description: 'Tap the emergency button. Your location is automatically detected and shared.',
  },
  {
    icon: Navigation,
    number: '02',
    title: 'Instant Dispatch',
    description: 'Nearest available ambulance receives your request and starts heading your way.',
  },
  {
    icon: MapPin,
    number: '03',
    title: 'Track in Real-Time',
    description: 'Watch the ambulance location on map with live ETA and crew contact details.',
  },
  {
    icon: CheckCircle,
    number: '04',
    title: 'Help Arrives',
    description: 'Certified medical professionals arrive prepared with your emergency details.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four simple steps from emergency to rescue. Designed for speed when every second matters.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Connection Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border -z-10">
                    <div className="h-full bg-gradient-to-r from-primary to-transparent w-0 group-hover:w-full transition-all duration-500"></div>
                  </div>
                )}

                <div className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 text-6xl font-bold text-muted/20 group-hover:text-primary/20 transition-colors">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 inline-block p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <step.icon className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
