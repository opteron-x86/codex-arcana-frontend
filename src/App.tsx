import { useState } from 'react';
import { useAuth } from 'react-oidc-context';

interface Card {
  id: string;
  name: string;
  // Add more fields based on your API's card data
}

function App() {
  const auth = useAuth();
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCards() {
    try {
      setIsLoading(true);
      setError(null);

      const token = auth.user?.id_token; 
      if (!token) {
        throw new Error('No token found. Are you sure the user is authenticated?');
      }

      const response = await fetch('https://ha6b9z9jdj.execute-api.us-east-2.amazonaws.com/stage1/cards', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching cards. Status: ${response.status} ${response.statusText}`);
      }

      // Assume the response is something like { cards: Card[] }
      const data = await response.json();
      setCards(data.cards || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setCards([]);
    } finally {
      setIsLoading(false);
    }
  }
  // Optionally, you could fetch cards automatically once authenticated:
  // useEffect(() => {
  //   if (auth.isAuthenticated) {
  //     fetchCards();
  //   }
  // }, [auth.isAuthenticated]);

  if (auth.isLoading) {
    return <div>Loading OIDC auth...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (!auth.isAuthenticated) {
    return <button onClick={() => auth.signinRedirect()}>Sign In</button>;
  }

  // Authenticated UI
  return (
    <div>
      <h2>Welcome, {auth.user?.profile?.email}</h2>
      
      {/* Button to manually trigger card fetching */}
      <button onClick={fetchCards} disabled={isLoading}>
        {isLoading ? 'Fetching...' : 'Fetch Cards'}
      </button>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      {/* Display the fetched cards */}
      {cards.length > 0 ? (
        <ul>
          {cards.map((card) => (
            <li key={card.id}>{card.name || card.id}</li>
          ))}
        </ul>
      ) : (
        !isLoading && <div>No cards yet.</div>
      )}
      
      <button onClick={() => auth.removeUser()}>Sign Out (local)</button>
    </div>
  );
}

export default App;
