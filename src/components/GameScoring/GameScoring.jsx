import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy } from 'lucide-react';

const GameScoring = () => {
  const { teamA, teamB, scores, setScores, setGameStage } = useGame();
  const [winningTeam, setWinningTeam] = useState(null);
  const [mvpA, setMvpA] = useState(null);
  const [mvpB, setMvpB] = useState(null);

  const handleGameEnd = () => {
    if (!winningTeam || !mvpA || !mvpB) {
      alert('Please select winning team and MVPs for both teams');
      return;
    }

    // Calculate new scores while preserving existing ones
    const newScores = { ...scores };
    
    // Score for Team A
    teamA.forEach(player => {
      const currentScore = newScores[player.id] || 0;
      newScores[player.id] = currentScore + (winningTeam === 'A' ? 2 : 1); // Base score
      if (player.id === mvpA.id) newScores[player.id] += 1; // MVP bonus
    });

    // Score for Team B
    teamB.forEach(player => {
      const currentScore = newScores[player.id] || 0;
      newScores[player.id] = currentScore + (winningTeam === 'B' ? 2 : 1); // Base score
      if (player.id === mvpB.id) newScores[player.id] += 1; // MVP bonus
    });

    setScores(newScores);
    setGameStage('finished');
  };

  const PlayerMVPCard = ({ player, isSelected, onSelect, isWinningTeam }) => (
    <div
      onClick={onSelect}
      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
        isSelected 
          ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-400/50' 
          : 'border-gray-200 hover:border-yellow-400 hover:bg-yellow-50/50'
      }`}
    >
      <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={player.avatar}
          alt={player.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{player.name}</div>
        {isSelected && (
          <div className="text-xs text-yellow-600 flex items-center gap-1">
            <Trophy size={12} /> MVP Selected
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          Current Score: {scores[player.id] || 0}
        </div>
      </div>
      {isWinningTeam && (
        <div className="text-xs text-emerald-600 font-medium px-2 py-1 bg-emerald-50 rounded-full">
          Winner
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Game Results</h2>

      {/* Winner Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Select Winner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant={winningTeam === 'A' ? 'default' : 'outline'}
              size="lg"
              className="h-24 text-lg relative overflow-hidden group"
              onClick={() => setWinningTeam('A')}
            >
              <div className="relative z-10">Team Blue Victory</div>
              {winningTeam === 'A' && (
                <div className="absolute inset-0 bg-blue-500/10" />
              )}
            </Button>
            <Button
              variant={winningTeam === 'B' ? 'default' : 'outline'}
              size="lg"
              className="h-24 text-lg relative overflow-hidden group"
              onClick={() => setWinningTeam('B')}
            >
              <div className="relative z-10">Team Red Victory</div>
              {winningTeam === 'B' && (
                <div className="absolute inset-0 bg-red-500/10" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scoring Explanation */}
      <Card className="mb-8 bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground space-y-1">
            <div>Scoring System:</div>
            <div>• Winning Team: +2 points</div>
            <div>• Losing Team: +1 point</div>
            <div>• MVP Bonus: +1 additional point</div>
          </div>
        </CardContent>
      </Card>

      {/* MVP Selection */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Team A MVP */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex-1">Team Blue MVP</div>
              {winningTeam === 'A' && (
                <div className="text-xs text-emerald-600 font-medium px-2 py-1 bg-emerald-50 rounded-full">
                  Winners
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {teamA.map(player => (
                <PlayerMVPCard
                  key={player.id}
                  player={player}
                  isSelected={mvpA?.id === player.id}
                  onSelect={() => setMvpA(player)}
                  isWinningTeam={winningTeam === 'A'}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team B MVP */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex-1">Team Red MVP</div>
              {winningTeam === 'B' && (
                <div className="text-xs text-emerald-600 font-medium px-2 py-1 bg-emerald-50 rounded-full">
                  Winners
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {teamB.map(player => (
                <PlayerMVPCard
                  key={player.id}
                  player={player}
                  isSelected={mvpB?.id === player.id}
                  onSelect={() => setMvpB(player)}
                  isWinningTeam={winningTeam === 'B'}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleGameEnd}
          disabled={!winningTeam || !mvpA || !mvpB}
          size="lg"
          className="flex items-center gap-2"
        >
          Submit Results
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default GameScoring;