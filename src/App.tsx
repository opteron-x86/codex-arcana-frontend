import { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";

interface Card {
  id: string;
  name: string;
  description: string;
  // Add more fields based on your API's card data
}

function App() {
  const auth = useAuth();
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetch cards from the masterlist.
   */
  async function fetchCards() {
    try {
      setIsLoading(true);
      setError(null);

      const token = auth.user?.id_token; // Fetch ID token for authentication
      if (!token) {
        throw new Error("No token found. Are you sure the user is authenticated?");
      }

      const response = await fetch(
        "https://13i18l9mw7.execute-api.us-east-2.amazonaws.com//cards",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching cards. Status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setCards(data.cards || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      setCards([]);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Add a card to the player's inventory.
   */
  async function addCardToInventory(cardId: string) {
    try {
      const token = auth.user?.id_token;
      if (!token) {
        throw new Error("No token found. Are you sure the user is authenticated?");
      }

      const response = await fetch(
        `https://13i18l9mw7.execute-api.us-east-2.amazonaws.com/players/cards`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cardId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error adding card. Status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Card added to inventory:", data);
      alert(`Card added to inventory: ${data.cardId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Error: ${err.message}`);
      } else {
        alert("An unknown error occurred.");
      }
    }
  }

  /**
   * Fetch masterlist cards when the component mounts or auth state changes.
   */
  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated]);

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
      <h3>Masterlist of Cards</h3>

      {isLoading ? (
        <p>Loading cards...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : cards.length === 0 ? (
        <p>No cards available.</p>
      ) : (
        <ul>
          {cards.map((card) => (
            <li key={card.id}>
              <strong>{card.name}</strong>: {card.description}
              <button onClick={() => addCardToInventory(card.id)}>Add to Inventory</button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => auth.removeUser()}>Sign Out</button>
    </div>
  );
}

export default App;
