const BoardConst = { x: 1, o: 0, blank: -1, draw: 2 };
const PlayerTurn = { one: 0, two: 1, endGame: 2 ,waitingForPlayer:3};
const GameType = { ai: 0, host: 1, join: 2 };
const MenuOptions = { newGame: 0, hostGame: 1, joinGame: 2, about: 3 };

export { BoardConst, MenuOptions, PlayerTurn, GameType };
