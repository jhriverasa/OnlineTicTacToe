import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import Mainmenu from "../components/header/MainMenu";

const TicTacToe = () => {
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
        <div className="flex">
          <div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
          <div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
          </div>
          <div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TicTacToe;
