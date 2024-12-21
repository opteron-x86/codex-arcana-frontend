import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import { Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const client = generateClient<Schema>();

const Dashboard = () => {
  const { user, signOut } = useAuthenticator();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  
  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <div className="min-h-screen bg-dark-bg text-off-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl text-amber-500">
            Welcome, {user?.signInDetails?.loginId}
          </h1>
          <button
            onClick={async () => {
              await signOut();
              navigate('/');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-200 rounded-lg
                     transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-amber-900/30">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-serif text-xl text-amber-500">Your Tasks</h2>
            <button
              onClick={createTodo}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 
                       text-slate-900 rounded-lg transition-colors duration-200"
            >
              <Plus size={20} />
              New Task
            </button>
          </div>

          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-between items-center p-3 bg-slate-700/50 
                         rounded-lg hover:bg-slate-700/70 transition-colors duration-200"
              >
                <span className="text-gray-200">{todo.content}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1 hover:text-amber-500 transition-colors duration-200"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;