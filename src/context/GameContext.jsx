import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

// Get stored data from localStorage
const getStoredData = () => {
  try {
    const storedPlayers = localStorage.getItem('tahmCupPlayers');
    const storedScores = localStorage.getItem('tahmCupScores');
    return {
      players: storedPlayers ? JSON.parse(storedPlayers) : [],
      scores: storedScores ? JSON.parse(storedScores) : {}
    };
  } catch (error) {
    console.error('Error loading stored data:', error);
    return { players: [], scores: {} };
  }
};

export const GameProvider = ({ children }) => {
  const storedData = getStoredData();
  const [players, setPlayers] = useState(storedData.players);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [scores, setScores] = useState(storedData.scores);
  const [gameStage, setGameStage] = useState('registration');

  // Persist players and scores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tahmCupPlayers', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('tahmCupScores', JSON.stringify(scores));
  }, [scores]);

  const addPlayer = (player) => {
    if (players.length < 10) {
      setPlayers([...players, player]);
    }
  };

  const removePlayer = (playerId) => {
    setPlayers(players.filter(player => player.id !== playerId));
    // Also remove their scores when removed
    setScores(prevScores => {
      const { [playerId]: removed, ...rest } = prevScores;
      return rest;
    });
  };

  const updatePlayer = (playerId, updates) => {
    setPlayers(players.map(player => 
      player.id === playerId ? { ...player, ...updates } : player
    ));
  };

  const resetGame = () => {
    // Reset only game state, keep players and scores
    setTeamA([]);
    setTeamB([]);
    setGameStage('registration');
  };

  const resetTournament = () => {
    // Reset everything including localStorage
    setPlayers([]);
    setTeamA([]);
    setTeamB([]);
    setScores({});
    setGameStage('registration');
    localStorage.removeItem('tahmCupPlayers');
    localStorage.removeItem('tahmCupScores');
  };

  const value = {
    players,
    setPlayers,
    teamA,
    setTeamA,
    teamB,
    setTeamB,
    scores,
    setScores,
    gameStage,
    setGameStage,
    addPlayer,
    removePlayer,
    updatePlayer,
    resetGame,
    resetTournament
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;