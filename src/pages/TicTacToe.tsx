import { useState } from "react";

import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonLabel,
  IonButton,
  IonRippleEffect,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import {
  BoardConst,
  MenuOptions,
  PlayerTurn,
  GameType,
  checkWinner,
} from "../utils";

import Board from "../components/Board";
import Mainmenu from "../components/header/MainMenu";

const TicTacToe = () => {
  const blk = BoardConst.blank;
  const blankBoardState = [blk, blk, blk, blk, blk, blk, blk, blk, blk];

  const [gameType, setGameType] = useState(GameType.ai);
  const [boardState, setBoardState] = useState(blankBoardState);
  const [score, setScore] = useState([0, 0, 0]); //p1,p2,draw
  const [turn, setTurn] = useState(PlayerTurn.one);

  const OnClickMenuOption = (selectedOption) => {
    if (selectedOption === MenuOptions.newGame) {
      setNewGame();
    }
  };

  const moveAsAi = (board) => {
    const newBoardState = board.slice();

    const index = newBoardState.findIndex((curr) => {
      return curr === BoardConst.blank;
    });

    newBoardState[index] = BoardConst.o;
    setBoardState(newBoardState);
    const newTurn = getPlayerTurn(newBoardState);
    setTurn(newTurn);
    if (newTurn === PlayerTurn.endGame) {
      //update score
      updateScore(newBoardState, score);
    }
  };

  const onChangeBoardState = (cell) => {
    const newBoardState = boardState.slice();
    newBoardState[cell] = BoardConst.x;
    setBoardState(newBoardState);
    const newTurn = getPlayerTurn(newBoardState);
    setTurn(newTurn);

    //if playing vs AI get a new move and do it
    // also update stats
    if (newTurn === PlayerTurn.endGame) {
      //update score
      updateScore(newBoardState, score);
    } else {
      setTimeout(() => {
        moveAsAi(newBoardState);
      }, 1000);
    }
  };

  const getPlayerTurn = (board) => {
    //if Someone won end the game
    if (
      checkWinner(board) === BoardConst.o ||
      checkWinner(board) === BoardConst.x ||
      checkWinner(board) === BoardConst.draw
    ) {
      return PlayerTurn.endGame;
    }

    if (gameType === GameType.ai) {
      //Get num of plays for each player
      const nPOnePlays = board.reduce((total, curr) => {
        return total + (curr === BoardConst.x ? 1 : 0);
      }, 0);
      const nPTwoPlays = board.reduce((total, curr) => {
        return total + (curr === BoardConst.o ? 1 : 0);
      }, 0);

      //Get Turn
      if (nPOnePlays + nPTwoPlays === 9) {
        return PlayerTurn.endGame;
      }

      if (nPOnePlays > nPTwoPlays) {
        return PlayerTurn.two;
      }

      if (nPOnePlays === nPTwoPlays) {
        return PlayerTurn.one;
      } else {
        //case impossible (just to ensure a number is returned)
        return 1;
      }
    } else {
      return 1;
    }
  };

  const isMyTurn = () => {
    const ret =
      (gameType === GameType.ai && turn === PlayerTurn.one) ||
      (gameType === GameType.host && turn === PlayerTurn.one) ||
      (gameType === GameType.join && turn === PlayerTurn.two);

    return ret;
  };

  const setNewGame = () => {
    setBoardState(blankBoardState);
    setTurn(PlayerTurn.one);
  };

  const updateScore = (board, lastScore) => {
    const result = checkWinner(board);
    console.log(result);
    if (result === BoardConst.x) {
      setScore([lastScore[0] + 1, lastScore[1], lastScore[2]]);
    }
    if (result === BoardConst.o) {
      setScore([lastScore[0], lastScore[1] + 1, lastScore[2]]);
    }
    if (result === BoardConst.draw) {
      setScore([lastScore[0], lastScore[1], lastScore[2] + 1]);
    }
  };

  const resetScore = () => {
    setScore([0, 0, 0]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" menu="main" />
          <IonTitle size="large">Tic-Tac-Toe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Mainmenu onClickOption={OnClickMenuOption} />

      <IonContent fullscreen>
        <Board
          boardState={boardState}
          isMyTurn={isMyTurn}
          onChangeBoardState={onChangeBoardState}
        />
        <div className="flex flex-col items-center my-3">
          <IonLabel color="danger" className="py-2">
            {turn === PlayerTurn.one && "Your Turn!"}
            {turn === PlayerTurn.two && "Player Two turn!"}
            {turn === PlayerTurn.endGame && "END!"}
          </IonLabel>
          <IonLabel color="secondary">Player 1: {score[0]}</IonLabel>
          <IonLabel color="secondary">Player 2: {score[1]}</IonLabel>
          <IonLabel color="secondary">Draw: {score[2]}</IonLabel>
          <IonButton
            expand="block"
            fill="outline"
            className="my-3"
            onClick={resetScore}
          >
            Reset Scores
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TicTacToe;
