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
import { search, cartOutline, heartOutline } from "ionicons/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategorySlider from "../CategorySlider";
import styles from "./styles.module.css";
import lightLogo from "../../assets/logoLight.png";
import darkLogo from "../../assets/logoDark.png";
import { useSelector } from "react-redux";

type Props = {};

const HeaderOne = ({ setIsCartOpen, setOpenFav, openFav }: any) => {
  const isDark = useSelector((data: any) => data.theme.isDark);
  const [showSearch, setShowSearch] = useState(false);
  const venue = useSelector((data: any) => data.restaurant.venue);
  const currentMenu = useSelector((data: any) => data.restaurant.currentMenu);
  const cart = useSelector((data: any) => data.cart.items);
  const liked = useSelector((data: any) => data.like.items);
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
              <p className={styles.labelContainer}>{venue.name}</p>
            </IonText>

            <IonRow class="ion-justify-content-between">
              <Link style={{ marginTop: "10px" }} to="/">
                <IonImg src={isDark ? lightLogo : darkLogo} />
              </Link>

              {/*  */}
              <IonRow class="ion-justify-content-between ion-align-items-center">
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
                      size="medium"
                      onClick={() => setOpenFav(!openFav)}
                    ></IonIcon>
                    <IonIcon
                      className={styles.cartIcon}
                      icon={search}
                      onClick={() => setShowSearch(true)}
                    ></IonIcon>
                  </div>
                </IonCol>
                <IonCol onClick={() => setIsCartOpen(true)} size="4">
                  {cart.length > 0 && (
                    <IonBadge className={styles.badge}>{cart.length}</IonBadge>
                  )}
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

        {!showSearch && <CategorySlider menuId={currentMenu._id} />}
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderOne;
