import {
  IonMenu,
  IonItem,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonLabel,
  IonList,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterOutlet,
} from "@ionic/react";
import {

  atOutline,
  desktopOutline,
  diceOutline,
  earthOutline,
} from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";

const TicTacToe = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start"/>
          <IonTitle size="large">Tic-Tac-Toe</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonMenu
        side="start"
        swipeGesture={false}
        menuId="first"
        contentId="menuContent"
      >
        <IonList>
          <IonItem>
            <IonIcon icon={diceOutline} slot="start" />
            <IonLabel>New Game vs IA</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={desktopOutline} slot="start" />
            <IonLabel>Host a Game</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={earthOutline} slot="start" />
            <IonLabel>Join Room</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={atOutline} slot="start" />
            <IonLabel>About</IonLabel>
          </IonItem>
        </IonList>
        <IonRouterOutlet id="menuContent"></IonRouterOutlet>
      </IonMenu>
    </IonPage>
  );
};

export default TicTacToe;
