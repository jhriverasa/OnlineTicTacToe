import React, { useState } from "react";

import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonLabel,
  IonRippleEffect,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import { BoardConst } from "../utils";
import Board from "../components/Board";
import Mainmenu from "../components/header/MainMenu";

const TicTacToe = () => {
  const blank = BoardConst.blank;
  const blankBoardState = [
    blank,
    blank,
    blank,
    blank,
    blank,
    blank,
    blank,
    blank,
    blank,
  ];
  const [boardState, setBoardState] = useState(blankBoardState);

  const onChangeBoardState = (cell) => {
    const newBoardState = boardState.slice();
    newBoardState[cell] = BoardConst.x;
    setBoardState(newBoardState);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" menu="main" />
          <IonTitle size="large">Tic-Tac-Toe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Mainmenu />

      <IonContent fullscreen>
        <Board
          boardState={boardState}
          onChangeBoardState={onChangeBoardState}
        />
        <div className="flex flex-col items-center">
          <IonLabel color="secondary">Player 1: {0}</IonLabel>
          <IonLabel color="secondary">Player 2: {0}</IonLabel>
          <IonLabel color="secondary">Draw: {0}</IonLabel>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TicTacToe;
