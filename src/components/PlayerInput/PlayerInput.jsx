import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, X } from 'lucide-react';
import { PLAYER_AVATARS, DEFAULT_AVATAR } from '../../constants/avatars';

const PlayerInput = () => {
  const { players, addPlayer, removePlayer, gameStage, setGameStage } = useGame();
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATAR);
  const [isAvatarSelectOpen, setIsAvatarSelectOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && players.length < 10) {
      const newPlayer = {
        id: Date.now(),
        name: name.trim(),
        avatar: selectedAvatar,
        score: 0
      };
      addPlayer(newPlayer);
      setName('');
      setSelectedAvatar(DEFAULT_AVATAR);
    }
  };

  const handleProceed = () => {
    if (players.length === 10) {
      setGameStage('team-selection');
    }
  };

  const PlayerSlot = ({ player, index }) => {
    if (!player) {
      return (
        <div className="flex items-center gap-2 p-2 border-2 border-dashed border-muted rounded-md">
          <div className="h-6 w-6 bg-muted/50 rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-xs text-muted-foreground">{index + 1}</span>
          </div>
          <span className="text-sm text-muted-foreground">Empty</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md group">
        <div className="h-6 w-6 rounded-full flex items-center justify-center overflow-hidden bg-muted">
          <img 
            src={player.avatar} 
            alt={player.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-sm font-medium">{player.name}</span>
        <button
          onClick={() => removePlayer(player.id)}
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={14} />
        </button>
      </div>
    );
  };

  const AvatarSelector = () => (
    <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border p-4 z-10 w-[300px]">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Select Player Profile</h3>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(PLAYER_AVATARS).map(([key, { url, name }]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setSelectedAvatar(url);
                setIsAvatarSelectOpen(false);
              }}
              className="h-8 w-8 rounded-full overflow-hidden hover:ring-2 ring-primary transition-all group relative"
            >
              <img 
                src={url} 
                alt={name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-[10px] text-white capitalize">{name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsAvatarSelectOpen(!isAvatarSelectOpen)}
                  className="h-10 w-10 rounded-full overflow-hidden border-2 border-muted hover:border-primary transition-colors"
                >
                  <img 
                    src={selectedAvatar} 
                    alt="Selected avatar" 
                    className="w-full h-full object-cover"
                  />
                </button>
                
                {isAvatarSelectOpen && <AvatarSelector />}
              </div>
              
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
            </div>
          </form>

          {/* Players Display */}
          <div className="space-y-4">
            {/* Players 1-5 */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Players 1-5</h3>
              <div className="grid grid-cols-5 gap-2">
                {[...Array(5)].map((_, index) => (
                  <PlayerSlot
                    key={players[index]?.id || `empty-${index}`}
                    player={players[index]}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Players 6-10 */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Players 6-10</h3>
              <div className="grid grid-cols-5 gap-2">
                {[...Array(5)].map((_, index) => (
                  <PlayerSlot
                    key={players[index + 5]?.id || `empty-${index + 5}`}
                    player={players[index + 5]}
                    index={index + 5}
                  />
                ))}
              </div>
            </div>
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