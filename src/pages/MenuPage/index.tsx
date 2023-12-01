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
import styles from "./styles.module.css";
import bannerImage from "../../assets/bannerImage.png";
import menuImg from "../../assets/menuImg.png";

const Menu = () => {
  // const toggleDarkModeHandler = () => document.body.classList.toggle("dark");

  return (
    <IonPage className={styles.page}>
      <IonHeader
        className={`${styles.header} ion-no-border`}
        translucent={true}
      >
        <IonImg className={styles.bannerImage} src={bannerImage} />
      </IonHeader>
      <IonContent className={styles.container} fullscreen>
        <IonText className={styles.restName}>
          <p>Amsterdam</p>
        </IonText>
        <IonText className={styles.selectMenu}>
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
          <IonImg className={styles.menuImg} src={menuImg} />
          <p className={styles.labelContainer}>non-veg</p>
        </IonCol>

        <IonCol>
          <IonImg className={styles.menuImg} src={menuImg} />
          <p className={styles.labelContainer}>non-veg</p>
        </IonCol>
      </IonContent>
    </IonPage>
  );
};

export default Menu;
