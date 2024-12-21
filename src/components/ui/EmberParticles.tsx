import React, { useEffect, useRef } from 'react';

const EmberParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create initial particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      createParticle(container);
    }
    
    // Continuously create new particles
    const interval = setInterval(() => {
      createParticle(container);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  const createParticle = (container: HTMLElement) => {
    const particle = document.createElement('div');
    
    // Random size between 2-4px
    const size = Math.random() * 2 + 2;
    
    // Random starting position along the bottom
    const startX = Math.random() * 100;
    
    particle.className = `
      absolute bottom-0 rounded-full
      animate-float opacity-0
      bg-ember
    `;
    
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${startX}%;
      animation: float ${6 + Math.random() * 4}s ease-in-out infinite,
                fade ${4 + Math.random() * 2}s ease-in-out forwards;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
    }, 8000);
  };
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
    />
  );
};

export default EmberParticles;