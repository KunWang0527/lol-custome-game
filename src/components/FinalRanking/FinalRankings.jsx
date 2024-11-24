import React from 'react';
import { useGame } from '../../context/GameContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Medal, RotateCw, Trophy, Users, Crown, Star, Target } from 'lucide-react';

const FinalRankings = () => {
  const { 
    players, 
    scores, 
    resetGame,
    resetTournament 
  } = useGame();

  // Sort players by score
  const rankedPlayers = [...players].sort((a, b) => {
    return (scores[b.id] || 0) - (scores[a.id] || 0);
  });

  const getMedalColor = (rank) => {
    switch(rank) {
      case 0: return 'text-yellow-400 bg-yellow-50';    // Gold
      case 1: return 'text-gray-400 bg-gray-50';     // Silver
      case 2: return 'text-amber-700 bg-amber-50';    // Bronze
      default: return 'text-gray-400';
    }
  };

  const getRankDisplay = (rank) => {
    switch(rank) {
      case 0:
        return (
          <div className="flex items-center gap-1">
            <Crown className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-600 font-medium">1st</span>
          </div>
        );
      case 1:
        return (
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600 font-medium">2nd</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center gap-1">
            <Target className="h-5 w-5 text-amber-700" />
            <span className="text-amber-800 font-medium">3rd</span>
          </div>
        );
      default:
        return <span className="text-gray-400 font-medium">{rank + 1}th</span>;
    }
  };

  // Calculate statistics
  const totalGames = Math.floor(
    Object.values(scores).reduce((max, score) => Math.max(max, score), 0) / 2
  );
  const stats = {
    totalPlayers: players.length,
    totalGames: totalGames,
    highestScore: Math.max(...Object.values(scores), 0),
    averageScore: (Object.values(scores).reduce((a, b) => a + b, 0) / players.length).toFixed(1),
    lowestScore: Math.min(...Object.values(scores).filter(score => score > 0), 0)
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Tournament Summary */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Tournament Results</CardTitle>
            <div className="text-center text-muted-foreground">
              Games Played: {stats.totalGames}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <Users className="h-5 w-5 mb-2 mx-auto text-blue-500" />
                <div className="text-2xl font-bold text-blue-600">{stats.totalPlayers}</div>
                <div className="text-sm text-blue-600/70">Players</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg text-center">
                <Trophy className="h-5 w-5 mb-2 mx-auto text-yellow-500" />
                <div className="text-2xl font-bold text-yellow-600">{stats.highestScore}</div>
                <div className="text-sm text-yellow-600/70">Highest Score</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg text-center">
                <Medal className="h-5 w-5 mb-2 mx-auto text-emerald-500" />
                <div className="text-2xl font-bold text-emerald-600">{stats.averageScore}</div>
                <div className="text-sm text-emerald-600/70">Average Score</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center">
                <Target className="h-5 w-5 mb-2 mx-auto text-purple-500" />
                <div className="text-2xl font-bold text-purple-600">{stats.lowestScore}</div>
                <div className="text-sm text-purple-600/70">Lowest Score</div>
              </div>
            </div>

            {/* Scoring System Reminder */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="font-medium text-foreground">Scoring System:</div>
                <div>• Win: +2 points</div>
                <div>• Loss: +1 point</div>
                <div>• MVP: +1 additional point</div>
              </div>
            </div>

            {/* Rankings List */}
            <div className="space-y-3">
              {rankedPlayers.map((player, index) => (
                <div 
                  key={player.id}
                  className={`flex items-center p-4 rounded-lg border ${
                    getMedalColor(index).split(' ')[1]
                  }`}
                >
                  {/* Rank */}
                  <div className="w-16 flex justify-center">
                    {getRankDisplay(index)}
                  </div>

                  {/* Player Info */}
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={player.avatar}
                        alt={player.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="font-medium truncate">{player.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {index === 0 && 'Tournament MVP'}
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="w-24 text-right">
                    <div className="font-bold text-lg">{scores[player.id] || 0}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            onClick={resetGame}
            size="lg"
            className="h-12 text-lg flex items-center justify-center gap-2"
          >
            <RotateCw size={20} />
            New Game (Keep Scores)
          </Button>
          <Button
            onClick={resetTournament}
            variant="outline"
            size="lg"
            className="h-12 text-lg"
          >
            Start New Tournament
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-muted-foreground">
          Scores and rankings are automatically saved
        </div>
      </div>
    </div>
  );
};

export default FinalRankings;