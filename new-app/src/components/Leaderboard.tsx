import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Star } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  level: number;
  streak: number;
  achievements: string[];
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "SakuraLearner", score: 2850, level: 15, streak: 28, achievements: ["Speed Demon", "Perfect Week"] },
  { rank: 2, username: "TokyoDreamer", score: 2640, level: 13, streak: 15, achievements: ["Consistent", "Grammar Master"] },
  { rank: 3, username: "NihongoNinja", score: 2420, level: 12, streak: 22, achievements: ["Kanji King", "Streak Master"] },
  { rank: 4, username: "AnimeWatcher", score: 2180, level: 11, streak: 8, achievements: ["Daily Player"] },
  { rank: 5, username: "JapanBound", score: 1950, level: 9, streak: 12, achievements: ["Beginner's Luck"] },
];

const levels = [
  { name: "Beginner", minScore: 0, color: "bg-gray-500" },
  { name: "Student", minScore: 500, color: "bg-blue-500" },
  { name: "Learner", minScore: 1000, color: "bg-green-500" },
  { name: "Scholar", minScore: 1500, color: "bg-purple-500" },
  { name: "Expert", minScore: 2000, color: "bg-orange-500" },
  { name: "Master", minScore: 2500, color: "bg-red-500" },
];

export const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getLevelInfo = (score: number) => {
    const level = levels.slice().reverse().find(l => score >= l.minScore);
    return level || levels[0];
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">学習者ランキング</h2>
        <p className="text-muted-foreground">Compete with other Japanese learners!</p>
      </div>

      {/* Level Progress */}
      <Card className="p-6 bg-gradient-to-r from-accent/20 to-primary/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          Level System
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {levels.map((level, index) => (
            <div key={level.name} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${level.color}`} />
              <div className="text-sm">
                <div className="font-medium">{level.name}</div>
                <div className="text-xs text-muted-foreground">{level.minScore}+ pts</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard */}
      <div className="space-y-3">
        {mockLeaderboard.map((entry) => {
          const levelInfo = getLevelInfo(entry.score);
          return (
            <Card key={entry.rank} className="p-4 hover:shadow-soft transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getRankIcon(entry.rank)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{entry.username}</h3>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${levelInfo.color} text-white`}
                      >
                        Level {entry.level}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{entry.score.toLocaleString()} points</span>
                      <span>{entry.streak} day streak</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 max-w-[200px]">
                  {entry.achievements.slice(0, 2).map((achievement) => (
                    <Badge key={achievement} variant="outline" className="text-xs">
                      {achievement}
                    </Badge>
                  ))}
                  {entry.achievements.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{entry.achievements.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Your Progress */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="text-lg font-semibold mb-4 text-center">Your Progress</h3>
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-primary">1,250 points</div>
          <div className="text-muted-foreground">Level 8 • Rank #127</div>
          <div className="text-sm text-muted-foreground">
            250 points to reach <span className="font-medium text-foreground">Scholar</span> level
          </div>
        </div>
      </Card>
    </div>
  );
};
