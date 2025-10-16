import { useEffect, useState } from 'react';

const AmbulanceAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full h-32 overflow-hidden">
      <div className={`absolute transition-all duration-1000 ${isVisible ? 'animate-ambulance-drive' : 'opacity-0'}`}>
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Ambulance body */}
          <rect x="10" y="30" width="70" height="35" rx="3" fill="hsl(var(--primary))" />
          <rect x="60" y="20" width="40" height="45" rx="3" fill="hsl(var(--primary))" />
          
          {/* Windows */}
          <rect x="65" y="25" width="15" height="12" rx="2" fill="white" opacity="0.9" />
          <rect x="82" y="25" width="15" height="12" rx="2" fill="white" opacity="0.9" />
          
          {/* Cross symbol */}
          <rect x="15" y="40" width="15" height="3" rx="1" fill="white" />
          <rect x="21" y="34" width="3" height="15" rx="1" fill="white" />
          
          {/* Lights */}
          <circle cx="95" cy="27" r="3" fill="hsl(var(--accent))" className="animate-pulse" />
          
          {/* Wheels */}
          <circle cx="25" cy="65" r="8" fill="hsl(220 15% 20%)" />
          <circle cx="25" cy="65" r="4" fill="hsl(220 15% 40%)" />
          <circle cx="85" cy="65" r="8" fill="hsl(220 15% 20%)" />
          <circle cx="85" cy="65" r="4" fill="hsl(220 15% 40%)" />
          
          {/* Motion lines */}
          <line x1="0" y1="45" x2="8" y2="45" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.5" />
          <line x1="0" y1="52" x2="6" y2="52" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
};

export default AmbulanceAnimation;
