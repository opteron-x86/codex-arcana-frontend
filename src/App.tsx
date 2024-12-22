import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Card from './Card'; // Import the Card component

function App() {
  const [cards, setCards] = useState<any[]>([]); // Store the fetched cards
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCards() {
      try {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();

        const response = await fetch('https://ha6b9z9jdj.execute-api.us-east-2.amazonaws.com/stage1/cards', { // Replace with your API Gateway endpoint
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json(); // Try to parse error response
          throw new Error(`HTTP error ${response.status}: ${errorData?.message || response.statusText}`);
        }

        const data = await response.json();
        setCards(data);
      } catch (err: any) {
        console.error("Error fetching cards:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCards();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (isLoading) {
    return <div>Loading cards...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Card List</h1>
      <div className="card-list">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;