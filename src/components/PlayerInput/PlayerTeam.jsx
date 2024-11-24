import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { UserPlus } from 'lucide-react';
import PlayerTeam from './PlayerTeam';

const PlayerInput = () => {
  const { players, addPlayer, removePlayer, gameStage, setGameStage } = useGame();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && players.length < 10) {
      const newPlayer = {
        id: Date.now(),
        name: name.trim(),
        score: 0
      };
      addPlayer(newPlayer);
      setName('');
    }
  };

  const handleProceed = () => {
    if (players.length === 10) {
      setGameStage('team-selection');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Player Registration</h2>
            <span className="text-sm font-medium bg-muted px-2 py-1 rounded-md">
              {players.length}/10 players
            </span>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              type="text"
              placeholder="Enter player name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1"
              maxLength={20}
            />
            <Button 
              type="submit" 
              disabled={!name.trim() || players.length >= 10}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <UserPlus size={16} />
              Add Player
            </Button>
          </form>

          {/* Teams */}
          <div className="space-y-4 bg-white rounded-lg p-4">
            <PlayerTeam 
              title="Players 1-5" 
              players={players.slice(0, 5)} 
              startIndex={0}
              onRemove={removePlayer}
            />
            <div className="h-px bg-gray-200 my-4" />
            <PlayerTeam 
              title="Players 6-10" 
              players={players.slice(5, 10)} 
              startIndex={5}
              onRemove={removePlayer}
            />
          </div>

          {/* Proceed Button */}
          <div className="pt-4 border-t">
            <Button
              onClick={handleProceed}
              disabled={players.length !== 10}
              className="w-full"
            >
              Proceed to Team Selection
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlayerInput;