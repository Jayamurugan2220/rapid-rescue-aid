import { AlertCircle, Heart, Phone, Users } from 'lucide-react';

const tips = [
  {
    icon: Phone,
    title: 'Stay on the Line',
    description: 'Keep your phone accessible for ambulance crew to contact you.',
  },
  {
    icon: Users,
    title: 'Notify Someone',
    description: 'Alert a family member or friend about the emergency if possible.',
  },
  {
    icon: Heart,
    title: 'Stay Calm',
    description: 'Take deep breaths and try to remain calm. Help is on the way.',
  },
  {
    icon: AlertCircle,
    title: 'Clear Access',
    description: 'Ensure the ambulance can reach you. Unlock doors, turn on lights.',
  },
];

const EmergencyTipsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              While You <span className="text-secondary">Wait</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Important tips to follow after requesting an ambulance
            </p>
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-secondary/5 border border-secondary/20 hover:border-secondary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-block p-3 rounded-lg bg-secondary/10 text-secondary">
                  <tip.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>

          {/* Emergency Note */}
          <div className="mt-12 p-6 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-center text-muted-foreground">
              <span className="font-semibold text-primary">Important:</span> If the patient is unconscious 
              or not breathing, start CPR if trained. The ambulance crew will guide you if needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyTipsSection;
