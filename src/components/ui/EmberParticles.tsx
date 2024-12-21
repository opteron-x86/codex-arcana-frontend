import React, { useRef, useEffect } from 'react';

const EmberParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createEmber = (container: HTMLElement) => {
      const ember = document.createElement('div');

      const size = Math.random() * 2 + 2;
      const startX = Math.random() * 100;

      ember.className = `
        absolute bottom-0 rounded-full
        animate-float opacity-0
        bg-ember
      `;

      ember.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${startX}%;
        animation: float ${6 + Math.random() * 4}s ease-in-out infinite,
                  fade ${4 + Math.random() * 2}s ease-in-out forwards;
      `;

      container.appendChild(ember);

      setTimeout(() => {
        ember.remove();
      }, 8000);
    };

    const initialCount = 50;
    for (let i = 0; i < initialCount; i++) {
      createEmber(container);
    }

    const intervalId = setInterval(() => {
      createEmber(container);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
    />
  );
};

export default EmberParticles;
