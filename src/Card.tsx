// Card.tsx
import React from 'react';

interface CardProps {
  card: {
    id: string;
    name: string;
    description: string;
    // ... other card properties
  };
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="card">
      <h3>{card.name}</h3>
      <p>{card.description}</p>
      {/* Display other card details, image, etc. */}
    </div>
  );
};

export default Card;