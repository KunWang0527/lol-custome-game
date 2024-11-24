import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Shuffle, ArrowRight } from 'lucide-react';

const TeamRandomizer = () => {
  const { players, setTeamA, setTeamB, setGameStage } = useGame();
  const [localTeamA, setLocalTeamA] = useState([]);
  const [localTeamB, setLocalTeamB] = useState([]);

  const randomizeTeams = () => {
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const teamAPlayers = shuffledPlayers.slice(0, 5);
    const teamBPlayers = shuffledPlayers.slice(5);
    
    setLocalTeamA(teamAPlayers);
    setLocalTeamB(teamBPlayers);
  };

  const handleProceed = () => {
    if (localTeamA.length === 5 && localTeamB.length === 5) {
      setTeamA(localTeamA);
      setTeamB(localTeamB);
      setGameStage('role-assignment');
    }
  };

  const PlayerSlot = ({ player }) => {
    return (
      <div className="flex items-center gap-3 p-2 rounded-lg border bg-white group">
        <div className="h-9 w-9 rounded-full overflow-hidden flex-shrink-0 bg-muted">
          <img
            src={player.avatar}
            alt={player.name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-medium text-sm">{player.name}</span>
      </div>
    );
  };

  const EmptySlot = () => (
    <div className="flex items-center gap-3 p-2 rounded-lg border border-dashed">
      <div className="h-9 w-9 rounded-full bg-muted/50 flex-shrink-0" />
      <span className="text-muted-foreground text-sm">Empty slot</span>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Team Selection</h2>
        <Button 
          onClick={randomizeTeams}
          className="flex items-center gap-2"
          size="lg"
        >
          <Shuffle size={16} />
          Randomize Teams
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Team A */}
        <Card className="border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-600 flex items-center justify-between">
              Team Blue
              <span className="text-sm text-muted-foreground font-normal">
                {localTeamA.length}/5 players
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {localTeamA.length > 0 ? (
                localTeamA.map(player => (
                  <PlayerSlot key={player.id} player={player} />
                ))
              ) : (
                <>
                  <EmptySlot />
                  <EmptySlot />
                  <EmptySlot />
                  <EmptySlot />
                  <EmptySlot />
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Team B */}
        <Card className="border-red-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-600 flex items-center justify-between">
              Team Red
              <span className="text-sm text-muted-foreground font-normal">
                {localTeamB.length}/5 players
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {localTeamB.length > 0 ? (
                localTeamB.map(player => (
                  <PlayerSlot key={player.id} player={player} />
                ))
              ) : (
                <>
                  <EmptySlot />
                  <EmptySlot />
                  <EmptySlot />
                  <EmptySlot />
                  <EmptySlot />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleProceed}
          disabled={localTeamA.length !== 5 || localTeamB.length !== 5}
          className="flex items-center gap-2"
          size="lg"
        >
          Proceed to Role Assignment
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TeamRandomizer;