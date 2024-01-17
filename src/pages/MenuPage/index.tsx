import React, { useEffect } from "react";
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
import { Link } from "react-router-dom";
import getVenues from "../../services/getVenue";
import axios from "axios";

const Menu = () => {
  // const toggleDarkModeHandler = () => document.body.classList.toggle("dark");
  const getVlenue = async () => {
    try {
      let res = await getVenues();
      console.log({ res: res.data.data });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getVlenue();
  }, []);

  return (
    <IonPage className={styles.page}>
      <IonHeader
        className={`${styles.header} ion-no-border`}
        translucent={true}
      >
        <IonImg className={styles.bannerImage} src={bannerImage} />
      </IonHeader>
      <IonContent className={styles.container} fullscreen>
        <p className={styles.restName}>Amsterdam</p>
        <p className={styles.selectMenu}>Select Menu</p>
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

        <Link to="/factor-girl-berlin/home">
          <IonCol>
            <IonImg className={styles.menuImg} src={menuImg} />
            <p className={styles.labelContainer}>non-veg</p>
          </IonCol>
        </Link>
        <Link to="/factor-girl-berlin/home">
          <IonCol>
            <IonImg className={styles.menuImg} src={menuImg} />
            <p className={styles.labelContainer}>non-veg</p>
          </IonCol>
        </Link>
      </IonContent>
    </IonPage>
  );
};

export default Menu;
