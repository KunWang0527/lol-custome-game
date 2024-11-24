import React from 'react';
import { GameProvider } from './context/GameContext';
import PlayerInput from './components/PlayerInput/PlayerInput';
import TeamRandomizer from './components/TeamRandomizer/TeamRandomizer';
import RoleAssignment from './components/RoleAssignment/RoleAssignment';
import FinalRankings from './components/FinalRanking/FinalRankings';
import GameScoring from './components/GameScoring/GameScoring';
import { useGame } from './context/GameContext';

const GameStageManager = () => {
  const { gameStage } = useGame();

  switch (gameStage) {
    case 'registration':
      return <PlayerInput />;
    case 'team-selection':
      return <TeamRandomizer />;
    case 'role-assignment':
      return <RoleAssignment />;;
    case 'in-game':
      return <GameScoring />;
    case 'mvp-selection':
      return <div>MVP Selection Coming Soon</div>;
    case 'finished':
      return <FinalRankings />;;
    default:
      return <PlayerInput />;
  }
};

const App = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Tahm Cup
          </h1>
          <GameStageManager />
        </div>
      </div>
    </GameProvider>
  );
};

export default App;