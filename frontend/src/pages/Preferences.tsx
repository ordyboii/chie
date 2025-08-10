import { useState } from 'react';

export default function Preferences() {
  const [username, setUsername] = useState('You');
  const [dailyReminder, setDailyReminder] = useState(true);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Account Preferences</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Username</label>
          <input
            className="border rounded-lg px-3 py-2 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={dailyReminder}
            onChange={(e) => setDailyReminder(e.target.checked)}
          />
          <label>Enable daily challenge reminders</label>
        </div>
        <button className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}

