import {
  IonMenu,
  IonItem,
  IonIcon,
  IonLabel,
  IonList,
  IonRouterOutlet,
} from "@ionic/react";

import {
  atOutline,
  desktopOutline,
  diceOutline,
  earthOutline,
} from "ionicons/icons";

const MainMenu = () => {
  return (
    <IonMenu
      side="start"
      swipeGesture={false}
      menuId="main"
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
  );
};

export default MainMenu;
