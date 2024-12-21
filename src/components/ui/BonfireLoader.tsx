import { Flame } from 'lucide-react';

const BonfireLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Flame icon with pulsing animation */}
        <Flame 
          size={48} 
          className="text-ember animate-ember-pulse relative z-10"
        />
        
        {/* Glow effect */}
        <div className="absolute -inset-2 bg-ember/20 blur-xl animate-ember-pulse" />
        
        {/* Base "wood" effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-ash-700 rounded-full" />
      </div>
      
      <p className="text-ash-400 animate-pulse font-serif">Loading...</p>
    </div>
  );
};

export default BonfireLoader;