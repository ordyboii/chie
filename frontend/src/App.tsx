import { useState } from 'react';
import Chat from './pages/Chat';
import Leaderboard from './pages/Leaderboard';
import Preferences from './pages/Preferences';

export default function App() {
  const [tab, setTab] = useState('chat');

  return (
    <div className="font-sans min-h-screen bg-orange-50">
      <header className="bg-orange-100 border-b border-orange-300 shadow">
        <nav className="max-w-4xl mx-auto flex justify-between p-4">
          <h1 className="text-2xl font-bold text-orange-700">🦊 Chie</h1>
          <div className="flex gap-4">
            {['chat', 'leaderboard', 'preferences'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 rounded-lg font-semibold hover:bg-orange-200 transition ${tab === t ? 'bg-orange-300 text-white' : 'text-orange-700'
                  }`}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {tab === 'chat' && <Chat />}
        {tab === 'leaderboard' && <Leaderboard />}
        {tab === 'preferences' && <Preferences />}
      </main>
    </div>
  );
}

