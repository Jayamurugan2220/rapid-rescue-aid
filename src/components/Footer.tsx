import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" />
            <span>for saving lives</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rapid Rescue. Connecting emergencies with care.
          </p>
          <p className="text-xs text-muted-foreground">
            In case of life-threatening emergency, always call your local emergency number (911, 112, etc.)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
