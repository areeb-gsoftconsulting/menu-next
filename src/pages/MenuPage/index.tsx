import React, { useEffect, useState } from "react";
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
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import styles from "./styles.module.css";
import bannerImage from "../../assets/bannerImage.png";
import menuImg from "../../assets/menuImg.png";
import { Link } from "react-router-dom";
import getVenues from "../../services/getVenue";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMenu } from "../../store/slices/restaurantSlice";
import { setSelectedCategory } from "../../store/slices/categorySlice";
import placeholderDark from "../../assets/menuPlaceholderDark.png";
import placeholderLight from "../../assets/menuPlaceholderLight.png";
import lightLogo from "../../assets/logoLight.png";
import darkLogo from "../../assets/logoDark.png";

const Menu = () => {
  const dispatch = useDispatch();
  // const toggleDarkModeHandler = () => document.body.classList.toggle("dark");
  const isDark = useSelector((data: any) => data.theme.isDark);
  const [loadingImage, setImageLoading] = useState(true);
  const venue = useSelector((data: any) => data.restaurant.venue);
  console.log({ venue });
  const routeName = useSelector((data: any) => data.restaurant.restSlug);
  const selectedCategory = useSelector(
    (data: any) => data.category.selectedCategory
  );
  console.log("selectedCategory", selectedCategory);

  return (
    <IonPage className={styles.page}>
      <IonHeader
        className={`${styles.header} ion-no-border`}
        translucent={true}
      >
        <IonToolbar className={styles.menupagetoolbar}>
          <IonImg
            className={styles.bannerImage}
            src={isDark ? lightLogo : darkLogo}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.container} fullscreen>
        <p className={styles.restName}>{venue?.name}</p>
        <p className={styles.selectMenu}>Select Menu</p>

        {venue.menus.map((obj: any, ind: any) => {
          return (
            <Link to={`/${routeName}/home`}>
              <IonCol
                onClick={() => {
                  dispatch(setSelectedCategory(["1"]));
                  dispatch(setCurrentMenu(obj));
                  console.log("qwertyui");
                }}
                key={ind}
              >
                <IonSkeletonText
                  animated
                  style={{
                    display: !loadingImage ? "none" : "block",
                    paddingTop: loadingImage ? "calc(200 / 351 * 100%)" : "0px",
                  }}
                  className={styles.loadingCard}
                />

                <IonImg
                  onIonImgDidLoad={() => setImageLoading(false)}
                  className={styles.menuImg}
                  style={{
                    height: loadingImage ? "0px" : "auto",
                    // position: loadingImage ? "absolute" : "relative",
                    opacity: loadingImage ? 0 : 1,
                  }}
                  src={obj.imageUrl}
                />
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
