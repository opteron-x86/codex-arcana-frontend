import { useState, useEffect } from 'react';
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

  /**
   * 1) This is the function that calls your "create player" (or "login") endpoint.
   *    The endpoint is presumably something like POST https://YOUR_API/players
   */
  async function createPlayer() {
    try {
      const token = auth.user?.id_token; 
      if (!token) {
        throw new Error('No token found. Are you sure the user is authenticated?');
      }

      // Example POST to your "create/update player" endpoint
      const response = await fetch('https://13i18l9mw7.execute-api.us-east-2.amazonaws.com/players', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        // If your lambda or backend expects a body, you can pass it here
        // But typically, just sending the token in the Authorization header
        // is enough if you're using a Cognito Authorizer to pull sub, email, etc.
        body: JSON.stringify({ exampleField: 'someValue' }),
      });

      if (!response.ok) {
        throw new Error(`Error creating player. Status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Player creation result:', data);
    } catch (err: unknown) {
      console.error('createPlayer error:', err);
      // You might display an error if needed
    }
  }

  /**
   * 2) Example function to fetch cards from an authenticated endpoint
   */
  async function fetchCards() {
    try {
      setIsLoading(true);
      setError(null);

      const token = auth.user?.id_token; 
      if (!token) {
        throw new Error('No token found. Are you sure the user is authenticated?');
      }

      const response = await fetch('https://13i18l9mw7.execute-api.us-east-2.amazonaws.com/cards', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching cards. Status: ${response.status} ${response.statusText}`);
      }

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

  /**
   * 3) useEffect: whenever auth.isAuthenticated becomes true,
   *    we can create the player in the backend if they don't exist.
   *    This runs only once (or again if isAuthenticated toggles),
   *    ensuring the player's record is inserted or updated.
   */
  useEffect(() => {
    if (auth.isAuthenticated) {
      createPlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated]);

  // You can also auto-fetch cards in a similar effect:
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

  return (
    <div>
      <h2>Welcome, {auth.user?.profile?.email}</h2>

      <button onClick={fetchCards} disabled={isLoading}>
        {isLoading ? 'Fetching...' : 'Fetch Cards'}
      </button>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
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
