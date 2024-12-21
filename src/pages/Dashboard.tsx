import { useAuthenticator } from '@aws-amplify/ui-react';

const GameDashboard = () => {
  const { user, signOut } = useAuthenticator();

  return (
    <div className="min-h-screen bg-dark-bg text-off-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl text-amber-500">
            Welcome, {user?.username || 'Player'}
          </h1>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-200 rounded-lg
                     transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
        
        {/* Placeholder for game features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-amber-900/30">
            <h2 className="font-serif text-xl text-amber-500 mb-4">Your Cards</h2>
            <p className="text-gray-300">Card collection will appear here</p>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-amber-900/30">
            <h2 className="font-serif text-xl text-amber-500 mb-4">Recent Battles</h2>
            <p className="text-gray-300">Battle history will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;