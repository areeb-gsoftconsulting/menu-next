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
import { search, cartOutline, heartOutline } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategorySlider from "../CategorySlider";
import styles from "./styles.module.css";
import lightLogo from "../../assets/logoLight.png";
import darkLogo from "../../assets/logoDark.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsDark } from "../../store/slices/themeSlice";

type Props = {};

const HeaderTwo = ({ setIsCartOpen, setOpenFav, openFav }: any) => {
  const isDark = useSelector((data: any) => data.theme.isDark);

  const venue = useSelector((data: any) => data.restaurant.venue);
  const dispatch = useDispatch();
  const cart = useSelector((data: any) => data.cart.items);
  const liked = useSelector((data: any) => data.like.items);

  const toggleDarkModeHandler = () => {
    document.body.classList.toggle("dark");
    return document.body.classList.contains("dark")
      ? dispatch(setIsDark(true))
      : dispatch(setIsDark(false));
  };

  return (
    <IonHeader mode="ios" className={`ion-no-border`} translucent={true}>
      <IonToolbar className={`${styles.toolbar} ${styles.transitionHeader}`}>
        <IonText>
          <p className={styles.labelContainer}>{venue.name}</p>
        </IonText>

        <IonRow class="ion-justify-content-between">
          <Link style={{ marginTop: "15px" }} to="/">
            <IonImg src={isDark ? lightLogo : darkLogo} />
          </Link>

          {/*  */}
          <IonRow class="ion-justify-content-between ion-align-items-center ion-align-items-center">
            <IonCol size="8">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {liked.length > 0 && (
                  <IonBadge
                    onClick={() => setOpenFav(!openFav)}
                    className={styles.badgeLike}
                  >
                    {liked.length}
                  </IonBadge>
                )}
                <IonIcon
                  className={styles.heartIcon}
                  icon={heartOutline}
                  size="large"
                  onClick={() => setOpenFav(!openFav)}
                ></IonIcon>
                <IonToggle
                  onIonChange={toggleDarkModeHandler}
                  name="darkMode"
                />
              </div>
            </IonCol>
            <IonCol onClick={() => setIsCartOpen(true)} size="4">
              {cart.length > 0 && (
                <IonBadge className={styles.badge}>{cart.length}</IonBadge>
              )}
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
