import { BoardConst } from "./constants";

const checkWinner = (board) => {
  const noWinner = 999;
  let winner = noWinner;

  //rows
  if (
    board[0] !== BoardConst.blank &&
    board[0] === board[1] &&
    board[1] === board[2]
  ) {
    console.log("first row")
    winner = board[0];
  }
  if (
    board[3] !== BoardConst.blank &&
    board[3] === board[4] &&
    board[4] === board[5]
  ) {
    winner = board[3];
  }
  if (
    board[6] !== BoardConst.blank &&
    board[6] === board[7] &&
    board[7] === board[8]
  ) {
    winner = board[6];
  }

  //cols
  if (
    board[0] !== BoardConst.blank &&
    board[0] === board[3] &&
    board[3] === board[6]
  ) {
    winner = board[0];
  }
  if (
    board[1] !== BoardConst.blank &&
    board[1] === board[4] &&
    board[4] === board[7]
  ) {
    winner = board[1];
  }
  if (
    board[2] !== BoardConst.blank &&
    board[2] === board[5] &&
    board[5] === board[8]
  ) {
    winner = board[2];
  }

  //diagonals
  if (
    board[0] !== BoardConst.blank &&
    board[0] === board[4] &&
    board[4] === board[8]
  ) {
    winner = board[0];
  }
  if (
    board[6] !== BoardConst.blank &&
    board[6] === board[4] &&
    board[4] === board[2]
  ) {
    winner = board[6];
  }

  const isPlayable = board.some((cur) => {
    return cur === BoardConst.blank;
  });

  if (!isPlayable && winner === noWinner) {
    return BoardConst.draw;
  }

  return winner;
};

export { checkWinner };
