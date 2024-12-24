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
  const [ownedCards, setOwnedCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingMasterlist, setIsLoadingMasterlist] = useState(false);
  const [isLoadingOwnedCards, setIsLoadingOwnedCards] = useState(false);

  /**
   * Fetch cards from the masterlist.
   */
  async function fetchMasterlistCards() {
    try {
      setIsLoadingMasterlist(true);
      setError(null);

      const token = auth.user?.id_token; // Fetch ID token for authentication
      if (!token) {
        throw new Error("No token found. Are you sure the user is authenticated?");
      }

      const response = await fetch(
        "https://13i18l9mw7.execute-api.us-east-2.amazonaws.comcards",
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
      setMasterlistCards(data.cards || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      setMasterlistCards([]);
    } finally {
      setIsLoadingMasterlist(false);
    }
  }

  /**
   * Fetch the player's owned cards.
   */
  async function fetchOwnedCards() {
    try {
      setIsLoadingOwnedCards(true);
      setError(null);

      const token = auth.user?.id_token;
      if (!token) {
        throw new Error("No token found. Are you sure the user is authenticated?");
      }

      const response = await fetch(
        "https://13i18l9mw7.execute-api.us-east-2.amazonaws.com/players/cards",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching owned cards. Status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setOwnedCards(data.cards || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      setOwnedCards([]);
    } finally {
      setIsLoadingOwnedCards(false);
    }
  }

  /**
   * Fetch masterlist cards when the component mounts or auth state changes.
   */
  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchMasterlistCards();
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
      <pre> Access Token: {auth.user?.access_token} </pre>
      <pre> Refresh Token: {auth.user?.refresh_token} </pre>

      <h3>Masterlist of Cards</h3>
      {isLoadingMasterlist ? (
        <p>Loading cards...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : masterlistCards.length === 0 ? (
        <p>No cards available.</p>
      ) : (
        <ul>
          {masterlistCards.map((card) => (
            <li key={card.id}>
              <strong>{card.name}</strong>: {card.description}
            </li>
          ))}
        </ul>
      )}

      <h3>Player's Inventory</h3>
      <button onClick={fetchOwnedCards} disabled={isLoadingOwnedCards}>
        {isLoadingOwnedCards ? "Fetching..." : "Fetch Inventory"}
      </button>
      {isLoadingOwnedCards ? (
        <p>Loading owned cards...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : ownedCards.length === 0 ? (
        <p>No cards in your inventory.</p>
      ) : (
        <ul>
          {ownedCards.map((card) => (
            <li key={card.id}>
              <strong>{card.name}</strong> (x{card.quantity}): {card.description}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => auth.removeUser()}>Sign Out</button>
    </div>
  );
}

export default App;
