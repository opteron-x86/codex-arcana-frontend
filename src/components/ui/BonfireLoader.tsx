import { Flame } from 'lucide-react';

const BonfireLoader = () => (
  <div className="flex flex-col items-center justify-center gap-4">
    <div className="relative">
      <Flame 
        size={48} 
        className="text-ember animate-ember-pulse relative z-10"
      />
      <div className="absolute -inset-2 bg-ember/20 blur-xl animate-ember-pulse" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-ash-700 rounded-full" />
    </div>
    <p className="text-ash-400 animate-pulse font-serif">Loading...</p>
  </div>
);

export default BonfireLoader;

