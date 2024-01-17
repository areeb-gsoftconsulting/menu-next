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
import { useSelector } from "react-redux";

const Menu = () => {
  // const toggleDarkModeHandler = () => document.body.classList.toggle("dark");
  const venue = useSelector((data: any) => data.restaurant.venue);
  console.log({ venue });

  return (
    <IonPage className={styles.page}>
      <IonHeader
        className={`${styles.header} ion-no-border`}
        translucent={true}
      >
        <IonImg className={styles.bannerImage} src={bannerImage} />
      </IonHeader>
      <IonContent className={styles.container} fullscreen>
        <p className={styles.restName}>{venue?.name}</p>
        <p className={styles.selectMenu}>Select Menu</p>

        {venue.menus.map((obj: any, ind: any) => {
          return (
            <Link to="/factor-girl-berlin/home">
              <IonCol key={ind}>
                <IonImg className={styles.menuImg} src={obj.imageUrl} />
                <p className={styles.labelContainer}>{obj.name}</p>
              </IonCol>
            </Link>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Menu;
