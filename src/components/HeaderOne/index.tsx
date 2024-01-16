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
} from "@ionic/react";
import { search, cartOutline } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategorySlider from "../CategorySlider";
import styles from "./styles.module.css";
import lightLogo from "../../assets/logoLight.png";
import darkLogo from "../../assets/logoDark.png";

type Props = {};

const HeaderOne = ({ setIsCartOpen }: any) => {
  const [isDark, setIsDark] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <IonHeader
      mode="ios"
      className={`ion-no-border ${styles.transitionHeader}`}
      translucent={true}
    >
      <IonToolbar className={`${styles.toolbarScrolled}`}>
        {!showSearch ? (
          <div className={styles.headerContainer}>
            <IonText>
              <p className={styles.labelContainer}>Amsterdam</p>
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
                  {/* <IonToggle
              onIonChange={toggleDarkModeHandler}
              name="darkMode"
            /> */}
                  <IonIcon
                    className={styles.cartIcon}
                    icon={search}
                    onClick={() => setShowSearch(true)}
                  ></IonIcon>
                </IonCol>
                <IonCol onClick={() => setIsCartOpen(true)} size="4">
                  <IonBadge className={styles.badge}>11</IonBadge>
                  <IonIcon
                    className={styles.cartIcon}
                    icon={cartOutline}
                  ></IonIcon>
                </IonCol>
              </IonRow>
            </IonRow>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "15px 5px 15px 5px",
            }}
          >
            <IonSearchbar
              mode="md"
              className={`${styles.custom} ${styles.customSearchbar} ion-no-padding`} // Applying the custom styles
              placeholder="Search"
              debounce={1000}
              onIonInput={(e) => console.log(e.detail.value)}
            ></IonSearchbar>
            <IonText
              onClick={() => setShowSearch(false)}
              style={{
                marginTop: "17px",
                cursor: "pointer",
                fontSize: "13px",
                marginLeft: "5px",
              }}
            >
              Cancel
            </IonText>
          </div>
        )}

        {!showSearch && <CategorySlider />}
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderOne;
