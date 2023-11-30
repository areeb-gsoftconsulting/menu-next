import React from "react";
import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import "./styles.css";
import bannerImage from "../../assets/bannerImage.png";
import menuImg from "../../assets/menuImg.png";

const Menu = () => {
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
