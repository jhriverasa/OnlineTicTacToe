import {
  IonMenu,
  IonItem,
  IonIcon,
  IonLabel,
  IonList,
  IonRouterOutlet,
  IonRippleEffect,
} from "@ionic/react";

import {
  atOutline,
  desktopOutline,
  diceOutline,
  earthOutline,
} from "ionicons/icons";

import { MenuOptions } from "../../utils";

const MainMenu = ({ onClickOption }) => {
  return (
    <IonMenu
      side="start"
      swipeGesture={false}
      menuId="main"
      contentId="menuContent"
    >
      <IonList>
        <IonItem
          className="ion-activatable"
          onClick={() => {
            onClickOption(MenuOptions.newGame);
          }}
        >
          <IonRippleEffect />
          <IonIcon icon={diceOutline} slot="" />
          <IonLabel className="px-4">New Game vs AI</IonLabel>
        </IonItem>
        <IonItem
          className="ion-activatable"
          onClick={() => {
            onClickOption(MenuOptions.hostGame);
          }}
        >
          <IonRippleEffect />
          <IonIcon icon={desktopOutline} slot="" />
          <IonLabel className="px-4">Host a Game</IonLabel>
        </IonItem>
        <IonItem
          className="ion-activatable"
          onClick={() => {
            onClickOption(MenuOptions.joinGame);
          }}
        >
          <IonRippleEffect />
          <IonIcon icon={earthOutline} slot="" />
          <IonLabel className="px-4">Join Room</IonLabel>
        </IonItem>
        <IonItem
          className="ion-activatable"
          onClick={() => {
            onClickOption(MenuOptions.about);
          }}
        >
          <IonRippleEffect />
          <IonIcon icon={atOutline} slot="" />
          <IonLabel className="px-4">About</IonLabel>
        </IonItem>
      </IonList>
      <IonRouterOutlet id="menuContent"></IonRouterOutlet>
    </IonMenu>
  );
};

export default MainMenu;
