import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ROLES = ['Top', 'Jungle', 'Mid', 'Bot', 'Support'];

const RoleAssignment = () => {
  const { teamA, teamB, setGameStage } = useGame();
  const [teamARoles, setTeamARoles] = useState({});
  const [teamBRoles, setTeamBRoles] = useState({});
  const [draggedPlayer, setDraggedPlayer] = useState(null);
  const [dragSource, setDragSource] = useState(null);

  const handleDragStart = (player, team) => {
    setDraggedPlayer(player);
    setDragSource(team);
  };

  const handleDrop = (role, team) => {
    if (!draggedPlayer) return;

    const setRoles = team === 'A' ? setTeamARoles : setTeamBRoles;
    const currentRoles = team === 'A' ? teamARoles : teamBRoles;

    // If dropping in same team, remove player from previous role
    if (dragSource === team) {
      const previousRole = Object.entries(currentRoles).find(
        ([_, player]) => player.id === draggedPlayer.id
      )?.[0];
      if (previousRole) {
        setRoles(prev => {
          const newRoles = { ...prev };
          delete newRoles[previousRole];
          return newRoles;
        });
      }
    }

    setRoles(prev => ({
      ...prev,
      [role]: draggedPlayer
    }));
    setDraggedPlayer(null);
    setDragSource(null);
  };

  const getUnassignedPlayers = (team) => {
    const roles = team === 'A' ? teamARoles : teamBRoles;
    const teamPlayers = team === 'A' ? teamA : teamB;
    const assignedIds = Object.values(roles).map(p => p.id);
    return teamPlayers.filter(p => !assignedIds.includes(p.id));
  };

  const handleProceed = () => {
    if (Object.keys(teamARoles).length === 5 && Object.keys(teamBRoles).length === 5) {
      setGameStage('in-game');
    }
  };

  const RoleSlot = ({ role, team }) => {
    const roles = team === 'A' ? teamARoles : teamBRoles;
    const player = roles[role];

    return (
      <div
        className={`p-3 rounded-lg border-2 ${
          !player ? 'border-dashed border-gray-200 bg-gray-50' : 'border-solid border-gray-200 bg-white'
        } min-h-[48px] flex gap-3 items-center`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(role, team)}
      >
        <div className="w-24 flex-shrink-0">
          <span className="text-sm font-medium text-gray-500">{role}</span>
        </div>
        
        {player ? (
          <div
            className="flex items-center gap-2 flex-1 cursor-grab"
            draggable
            onDragStart={() => handleDragStart(player, team)}
          >
            <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={player.avatar}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium text-sm">{player.name}</span>
          </div>
        ) : (
          <div className="flex-1 text-sm text-gray-400">
            Drop player here
          </div>
        )}
      </div>
    );
  };

  const UnassignedPlayer = ({ player, team }) => (
    <div
      className="flex items-center gap-2 p-2 bg-white rounded border cursor-grab"
      draggable
      onDragStart={() => handleDragStart(player, team)}
    >
      <div className="h-6 w-6 rounded-full overflow-hidden flex-shrink-0">
        <img 
          src={player.avatar}
          alt={player.name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-sm font-medium">{player.name}</span>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Role Assignment</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Team A */}
        <div className="space-y-6">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-600">Team Blue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ROLES.map(role => (
                <RoleSlot key={role} role={role} team="A" />
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-50/50">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Unassigned Players</h3>
              <div className="flex flex-wrap gap-2">
                {getUnassignedPlayers('A').map(player => (
                  <UnassignedPlayer key={player.id} player={player} team="A" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team B */}
        <div className="space-y-6">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Team Red</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ROLES.map(role => (
                <RoleSlot key={role} role={role} team="B" />
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-50/50">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Unassigned Players</h3>
              <div className="flex flex-wrap gap-2">
                {getUnassignedPlayers('B').map(player => (
                  <UnassignedPlayer key={player.id} player={player} team="B" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleProceed}
          disabled={Object.keys(teamARoles).length !== 5 || Object.keys(teamBRoles).length !== 5}
          className="flex items-center gap-2"
        >
          Start Game
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default RoleAssignment;