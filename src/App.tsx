import { useEffect, useState } from 'react';
import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Card from './Card';

// Create the Amplify Data client for your GraphQL models
const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // `useAuthenticator` gives you the user, signOut, authStatus, etc.
  const { user, signOut, authStatus } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
  ]);

  // ObserveQuery to watch real-time changes on your Todo model
  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => {
        setTodos(data.items);
      },
      error: (observeError) => {
        console.error('ObserveQuery error:', observeError);
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  // Create a new Todo entry
  function createTodo() {
    const content = window.prompt('Todo content');
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  // Delete a Todo entry
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  // Fetch protected API data (cards) using the user's ID token
  useEffect(() => {
    async function fetchCards() {
      try {
        if (authStatus !== 'authenticated') {
          console.log('Not authenticated. Skipping card fetch.');
          setIsLoading(false);
          return;
        }

        // Access the ID token from the user object
        const token = user?.signInUserSession?.idToken?.jwtToken;
        if (!token) {
          console.error('No token found on user object.');
          setIsLoading(false);
          return;
        }

        console.log('Fetching cards with token:', token);

        const response = await fetch('https://ha6b9z9jdj.execute-api.us-east-2.amazonaws.com/stage1/cards', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          let errorMessage = `HTTP error ${response.status}: ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMessage += ` - ${errorData?.message || 'No error message from server'}`;
          } catch (jsonError) {
            console.error('Error parsing JSON error response', jsonError);
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setCards(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching cards:', err);
        setError(err.message);
        setCards([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCards();
  }, [authStatus, user]);

  return (
    <main>
      <h1>{user?.username}'s Todos</h1>

      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => deleteTodo(todo.id)}
            style={{ cursor: 'pointer' }}
          >
            {todo.content}
          </li>
        ))}
      </ul>

      <h2>Card List</h2>
      {isLoading && <div>Loading cards...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {!isLoading && cards.length === 0 && !error && <div>No cards found.</div>}
      {!isLoading && cards.length > 0 && (
        <div className="card-list">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      )}

      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
