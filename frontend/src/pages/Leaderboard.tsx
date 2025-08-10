export default function Leaderboard() {
  const leaderboard = [
    { name: 'UserA', score: 950 },
    { name: 'UserB', score: 870 },
    { name: 'You', score: 800 }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      <table className="w-full border-collapse border border-orange-300">
        <thead>
          <tr className="bg-orange-200">
            <th className="border border-orange-300 p-2">Rank</th>
            <th className="border border-orange-300 p-2">Name</th>
            <th className="border border-orange-300 p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, i) => (
            <tr key={i} className="hover:bg-orange-100">
              <td className="border border-orange-300 p-2">{i + 1}</td>
              <td className="border border-orange-300 p-2">{player.name}</td>
              <td className="border border-orange-300 p-2">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

