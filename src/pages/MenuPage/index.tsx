import React from "react";
import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToggle,
} from "@ionic/react";
import "./styles.css";
import bannerImage from "../../assets/bannerImage.png";
import menuImg from "../../assets/menuImg.png";

const Menu = () => {
  // const toggleDarkModeHandler = () => document.body.classList.toggle("dark");

  return (
    <IonPage className="page">
      <IonHeader className="ion-no-border header" translucent={true}>
        <IonImg className="bannerImage" src={bannerImage} />
      </IonHeader>
      <IonContent fullscreen>
        <IonText className="restName">
          <p>Amsterdam</p>
        </IonText>
        <IonText className="selectMenu">
          <h2>Select Menu</h2>
        </IonText>
        {/* <IonList>
          <IonItem lines="none">
            <IonIcon slot="start" />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle
              slot="end"
              name="darkMode"
              onIonChange={toggleDarkModeHandler}
            />
          </IonItem>
        </IonList> */}

        <IonCol>
          <IonImg className="menuImg" src={menuImg} />
          <p className="labelContainer">non-veg</p>
        </IonCol>

        <IonCol>
          <IonImg className="menuImg" src={menuImg} />
          <p className="labelContainer">non-veg</p>
        </IonCol>
      </IonContent>
    </IonPage>
  );
};

export default Menu;
