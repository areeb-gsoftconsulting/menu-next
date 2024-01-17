import {
  IonHeader,
  IonToolbar,
  IonText,
  IonRow,
  IonImg,
  IonCol,
  IonIcon,
  IonBadge,
  IonSearchbar,
  IonToggle,
} from "@ionic/react";
import { search, cartOutline } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategorySlider from "../CategorySlider";
import styles from "./styles.module.css";
import lightLogo from "../../assets/logoLight.png";
import darkLogo from "../../assets/logoDark.png";
import { useSelector } from "react-redux";

type Props = {};

const HeaderTwo = ({ setIsCartOpen }: any) => {
  const [isDark, setIsDark] = useState(false);
  const venue = useSelector((data: any) => data.restaurant.venue);

  const toggleDarkModeHandler = () => {
    document.body.classList.toggle("dark");
    return document.body.classList.contains("dark")
      ? setIsDark(true)
      : setIsDark(false);
  };

  return (
    <IonHeader mode="ios" className={`ion-no-border`} translucent={true}>
      <IonToolbar className={`${styles.toolbar} ${styles.transitionHeader}`}>
        <IonText>
          <p className={styles.labelContainer}>{venue.name}</p>
        </IonText>

        <IonRow class="ion-justify-content-between">
          <Link style={{ marginTop: "10px" }} to="/">
            <IonImg src={isDark ? lightLogo : darkLogo} />
          </Link>

          {/*  */}
          <IonRow class="ion-justify-content-between ion-align-items-center">
            <IonCol size="8">
              {/* <IonIcon
              className={styles.heartIcon}
              icon={heartOutline}
            ></IonIcon> */}
              <IonToggle onIonChange={toggleDarkModeHandler} name="darkMode" />
            </IonCol>
            <IonCol onClick={() => setIsCartOpen(true)} size="4">
              <IonBadge className={styles.badge}>11</IonBadge>
              <IonIcon className={styles.cartIcon} icon={cartOutline}></IonIcon>
            </IonCol>
          </IonRow>
        </IonRow>

        <IonSearchbar
          mode="md"
          className={`${styles.custom} ${styles.customSearchbar} ion-no-padding`} // Applying the custom styles
          placeholder="Search"
        ></IonSearchbar>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderTwo;
