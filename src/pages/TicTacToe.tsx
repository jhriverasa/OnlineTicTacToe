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
  IonAlert,
  IonModal,
  AlertInput,
  IonRippleEffect,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import { menuController } from "@ionic/core";

import {
  BoardConst,
  MenuOptions,
  PlayerTurn,
  GameType,
  checkWinner,
  isBoardEqual,
  //onlineGameServices
  createRoom,
  joinRoom,
  playInOnlineRoom,
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
  const [onlineIdRoom, setOnlineIdRoom] = useState("");

  const [menuClickedOption, setMenuClickedOption] = useState(
    MenuOptions.newGame
  );
  const [isRoomAlertOpen, setRoomAlertOpen] = useState(false);
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);

  const OnClickMenuOption = (selectedOption) => {
    setMenuClickedOption(selectedOption);

    //New Game Selected
    if (selectedOption === MenuOptions.newGame) {
      setNewGame();
      menuController.close();
    }

    //Host Game Selected
    if (selectedOption === MenuOptions.hostGame) {
      setRoomAlertOpen(true);
      //Close menu so we can use the alert
      menuController.close();
    }

    //Join Game Selected
    if (selectedOption === MenuOptions.joinGame) {
      setRoomAlertOpen(true);
      //Close menu so we can use the alert
      menuController.close();
    }

    //About Selected
    if (selectedOption === MenuOptions.about) {
      setAboutModalOpen(true);
    }
  };

  const moveAsAi = (board) => {
    const newBoardState = board.slice();

    const index = newBoardState.findIndex((curr) => {
      return curr === BoardConst.blank;
    });

    newBoardState[index] = BoardConst.o;
    const newTurn = getPlayerTurn(newBoardState);
    setBoardState(newBoardState);

    setTurn(newTurn);
    if (newTurn === PlayerTurn.endGame) {
      //update score
      updateScore(newBoardState, score);
    }
  };

  const onChangeBoardState = (cell) => {
    const newBoardState = boardState.slice();
    //Determine the kind of move X or O
    const move =
      gameType === GameType.ai || gameType === GameType.host
        ? BoardConst.x
        : BoardConst.o;

    newBoardState[cell] = move;
    setBoardState(newBoardState);
    const newTurn = getPlayerTurn(newBoardState);
    setTurn(newTurn);

    //if playing vs AI get a new move and do it
    if (gameType === GameType.ai) {
      if (newTurn !== PlayerTurn.endGame) {
        setTimeout(() => {
          moveAsAi(newBoardState);
        }, 1000);
      } else {
        updateScore(newBoardState, score);
      }
    }

    if (gameType === GameType.host || gameType === GameType.join) {
      const roomData = {
        gameState: newBoardState,
        score:
          newTurn === PlayerTurn.endGame
            ? updateScore(newBoardState, score)
            : score,
      };
      console.log(newBoardState);
      playInOnlineRoom(onlineIdRoom, roomData);
    }
  };

  const getPlayerTurn = (board) => {
    //if Someone won end the game
    const possibleWinner = checkWinner(board);
    if (
      possibleWinner === BoardConst.o ||
      possibleWinner === BoardConst.x ||
      possibleWinner === BoardConst.draw
    ) {
      return PlayerTurn.endGame;
    }

    if (true) {
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
    setGameType(GameType.ai);
  };

  const hostNewGame = async (pass) => {
    //Conditions on pass

    if (pass !== "") {
      setBoardState(blankBoardState);
      setTurn(PlayerTurn.waitingForPlayer);
      setGameType(GameType.host);

      const id = await createRoom(pass, onChangeOnlineBoard);
      setOnlineIdRoom(id);
    } else {
      console.log("error creating the game");
    }
  };

  const joinToGame = async (pass) => {
    //conditions on pass

    if (pass !== "") {
      setBoardState(blankBoardState);
      setTurn(PlayerTurn.one);
      setGameType(GameType.join);
      const id = await joinRoom(pass, onChangeOnlineBoard);
      setOnlineIdRoom(id);
    } else {
      console.log("error joining to a game");
    }
  };

  const playNewOnlineGame = async () => {
    if (onlineIdRoom !== "") {
      setBoardState(blankBoardState);
      setTurn(PlayerTurn.one);
      //setGameType(GameType.join);
      playInOnlineRoom(onlineIdRoom, { gameState: blankBoardState });
    } else {
      console.log("error creating a new online game");
    }
  };

  const onChangeOnlineBoard = (data) => {
    const roomData = data;
    const onlineGameState = Object.values(roomData.gameState);
    // a new game
    console.log(gameType);
    if (
      (menuClickedOption === MenuOptions.hostGame ||
        menuClickedOption === MenuOptions.joinGame) &&
      !roomData.waitingForPlayer &&
      isBoardEqual(onlineGameState, blankBoardState) &&
      !isBoardEqual(Object.values(roomData.score), [0, 0, 0]) // comparing arrays
    ) {
      setTurn(PlayerTurn.one);
      setBoardState(blankBoardState);//update to the player who didint push new game button
      console.log("Nuevo juego");
      return 0; //stop
    }

    // a player joined to game
    if (
      menuClickedOption === MenuOptions.hostGame &&
      !roomData.waitingForPlayer &&
      isBoardEqual(onlineGameState, blankBoardState)
    ) {
      setTurn(PlayerTurn.one);
      console.log("un jugador se unio a tu partida");
      return 0; //stop
    }

    // Is my turn as a joined player?
    if (
      menuClickedOption === MenuOptions.joinGame &&
      getPlayerTurn(onlineGameState) === PlayerTurn.two &&
      !isBoardEqual(onlineGameState, blankBoardState)
    ) {
      if (Array.isArray(onlineGameState)) setBoardState(onlineGameState); //avoid warnings ts
      setTurn(PlayerTurn.two);
      console.log("Juega P2");
    }

    // Is my turn as a host player?
    if (
      menuClickedOption === MenuOptions.hostGame &&
      !roomData.waitingForPlayer &&
      getPlayerTurn(onlineGameState) === PlayerTurn.one
    ) {
      if (Array.isArray(onlineGameState)) setBoardState(onlineGameState); //avoid warnings ts
      setTurn(PlayerTurn.one);
      console.log("Juega P1");
    }

    // game has ended?
    if (
      (menuClickedOption === MenuOptions.hostGame ||
        menuClickedOption === MenuOptions.joinGame) &&
      getPlayerTurn(onlineGameState) === PlayerTurn.endGame
    ) {
      if (Array.isArray(onlineGameState)) setBoardState(onlineGameState); //avoid warnings ts
      setTurn(PlayerTurn.endGame);
      setScore(roomData.score);
      console.log("Finalizado");
    }
  };

  const updateScore = (board, lastScore) => {
    const result = checkWinner(board);
    let newScore;

    if (result === BoardConst.x) {
      newScore = [lastScore[0] + 1, lastScore[1], lastScore[2]];
    }
    if (result === BoardConst.o) {
      newScore = [lastScore[0], lastScore[1] + 1, lastScore[2]];
    }
    if (result === BoardConst.draw) {
      newScore = [lastScore[0], lastScore[1], lastScore[2] + 1];
    }
    setScore(newScore);
    return newScore;
  };

  const resetScore = () => {
    setScore([0, 0, 0]);
  };

  const renderStateMessage = () => {
    if (gameType === GameType.ai) {
      if (turn === PlayerTurn.one) return "Your Turn!";
      if (turn === PlayerTurn.two) return "Player Two turn!";
    }
    if (gameType === GameType.host) {
      if (turn === PlayerTurn.waitingForPlayer)
        return "Waiting for a player...";
      if (turn === PlayerTurn.one) return "Your Turn!";
      if (turn === PlayerTurn.two) return "Player Two turn!";
    }
    if (gameType === GameType.join) {
      if (turn === PlayerTurn.waitingForPlayer) return "joining to a game...";
      if (turn === PlayerTurn.one) return "Player One turn!";
      if (turn === PlayerTurn.two) return "Your turn!";
    }

    const possibleWinner = checkWinner(boardState);
    if (turn === PlayerTurn.endGame) {
      if (possibleWinner === BoardConst.x) return "Player One Won!";
      if (possibleWinner === BoardConst.o) return "Player Two Won!";
      if (possibleWinner === BoardConst.draw) return "Draw!";
    }
    return "error";
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" menu="main" />
          <IonTitle size="large">{`Tic-Tac-Toe ${
            gameType === GameType.host || gameType === GameType.join
              ? "- Online"
              : ""
          } `}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Mainmenu onClickOption={OnClickMenuOption} />

      <IonContent fullscreen>
        <IonAlert
          isOpen={isRoomAlertOpen}
          onDidDismiss={() => {}}
          header={`${
            menuClickedOption === MenuOptions.hostGame ? "Create" : "Join"
          } Room`}
          inputs={[
            {
              name: "pass",
              type: "text",
              id: "pass",
              value: "",
              placeholder: "Room Pass",
              handler: () => {},
              attributes: {
                onChange: () => {},
              },
            },
          ]}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {
                // OnClickMenuOption(MenuOptions.newGame);
                setRoomAlertOpen(false);
              },
            },
            {
              text: "Ok",
              handler: (data) => {
                const pass = data.pass;
                if (menuClickedOption === MenuOptions.hostGame)
                  hostNewGame(pass);
                if (menuClickedOption === MenuOptions.joinGame)
                  joinToGame(pass);
              },
            },
          ]}
        />
        <IonModal
          isOpen={isAboutModalOpen}
          onDidDismiss={() => {
            setAboutModalOpen(false);
          }}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <IonLabel color="secondary">Tic-Tac-Toe Online version</IonLabel>
            <IonLabel color="secondary">
              Reto 6 - Jhonatan Rivera Saumeth
            </IonLabel>
            <div className="my-3">
              <img src="./assets/icon/tictactoe.png" />
            </div>
          </div>
          <IonButton onClick={() => setAboutModalOpen(false)}>Close</IonButton>
        </IonModal>
        <Board
          boardState={boardState}
          isMyTurn={isMyTurn}
          onChangeBoardState={onChangeBoardState}
        />
        <div className="flex flex-col items-center my-3">
          <IonLabel color="danger" className="py-2">
            {renderStateMessage()}
          </IonLabel>
          <IonLabel color="secondary">Player 1: {score[0]}</IonLabel>
          <IonLabel color="secondary">Player 2: {score[1]}</IonLabel>
          <IonLabel color="secondary">Draw: {score[2]}</IonLabel>

          {(gameType === GameType.ai || onlineIdRoom === "") && (
            <IonButton
              expand="block"
              fill="outline"
              className="my-3"
              onClick={resetScore}
            >
              Reset Scores
            </IonButton>
          )}
          <IonButton
            expand="block"
            fill="outline"
            className={`my-3 ${
              (menuClickedOption === MenuOptions.hostGame ||
                menuClickedOption === MenuOptions.joinGame) &&
              onlineIdRoom !== ""
                ? ""
                : "invisible"
            }`}
            onClick={playNewOnlineGame}
          >
            Play New Game
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TicTacToe;
