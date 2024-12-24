import { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";

interface Card {
  id: string;
  name: string;
  description: string;
  quantity: number;
  values: { top: number; right: number; bottom: number; left: number }; // Adjust based on your schema
  element: string;
  rarity: string;
  power_rating: number;
}

function App() {
  const auth = useAuth();

  const [masterlistCards, setMasterlistCards] = useState<Card[]>([]);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetch masterlist of cards.
   */
  async function fetchMasterlistCards() {
    try {
      setIsLoading(true);
      setError(null);

      const token = auth.user?.id_token; 
      if (!token) {
        throw new Error("No token found. Are you sure the user is authenticated?");
      }

      const response = await fetch("https://<API_GATEWAY_ID>.execute-api.<REGION>.amazonaws.com/cards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching cards. Status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setMasterlistCards(data.cards || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      setMasterlistCards([]);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Fetch player-owned cards.
   */
  async function fetchPlayerCards() {
    try {
      setIsLoading(true);
      setError(null);

      const token = auth.user?.id_token; 
      if (!token) {
        throw new Error("No token found. Are you sure the user is authenticated?");
      }

      const response = await fetch("https://<API_GATEWAY_ID>.execute-api.<REGION>.amazonaws.com/players/cards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching player cards. Status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setPlayerCards(data.cards || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      setPlayerCards([]);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Add a card from the masterlist to the player's inventory.
   */
  async function addCardToInventory(cardId: string) {
    try {
      const token = auth.user?.id_token;
      if (!token) {
        throw new Error("No token found. Are you sure the user is authenticated?");
      }

      const response = await fetch(`https://<API_GATEWAY_ID>.execute-api.<REGION>.amazonaws.com/players/cards`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardId }),
      });

      if (!response.ok) {
        throw new Error(`Error adding card. Status: ${response.status} ${response.statusText}`);
      }

      alert("Card added to inventory!");
      fetchPlayerCards(); // Refresh player's inventory after adding
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "An unknown error occurred.");
    }
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchMasterlistCards();
      fetchPlayerCards();
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
      <pre> ID Token: {auth.user?.id_token} </pre>
      <h3>Masterlist of Cards</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {masterlistCards.length > 0 ? (
        <ul>
          {masterlistCards.map((card) => (
            <li key={card.id}>
              <strong>{card.name}</strong>: {card.description}
              <button onClick={() => addCardToInventory(card.id)}>Add to Inventory</button>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No masterlist cards found.</p>
      )}

      <h3>Your Inventory</h3>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {playerCards.length > 0 ? (
        <ul>
          {playerCards.map((card) => (
            <li key={card.id}>
              <strong>{card.name}</strong> (x{card.quantity}): {card.description}
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>You don't own any cards yet.</p>
      )}

      <button onClick={() => auth.removeUser()}>Sign Out</button>
    </div>
  );
}

export default App;
