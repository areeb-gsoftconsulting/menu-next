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
import getItems from "../../services/getItems";
import { setSelectedCategory } from "../../store/slices/categorySlice";
import { useToast } from "../../hooks/useToast";

type Props = {};

const HeaderTwo = ({
  setIsCartOpen,
  setOpenFav,
  openFav,
  setItems,
  scrollToTop,
  setItemsEnded,
}: any) => {
  const isDark = useSelector((data: any) => data.theme.isDark);
  const routeName = useSelector((data: any) => data.restaurant.restSlug);
  const venue = useSelector((data: any) => data.restaurant.venue);
  const cart = useSelector((data: any) => data.cart.items);
  const liked = useSelector((data: any) => data.like.items);
  const [loading, setLoading] = useState(false);
  const currentMenu = useSelector((data: any) => data.restaurant.currentMenu);
  const { presentToast } = useToast();

  const dispatch = useDispatch();
  const getItem = async ({ itemNameSearch }: any) => {
    console.log({ itemNameSearch });
    setLoading(true);

    try {
      let res = await getItems({
        menuId: currentMenu._id,
        params: {
          itemNameSearch,
        },
      });
      if (res.data.statusCode == 200) {
        console.log("=======>", res.data.data);
        if (res.data.data.length == 0) {
          setItemsEnded(true);
          dispatch(setSelectedCategory("2"));
          setItems([]);
          presentToast("No item found");
        } else {
          setItemsEnded(true);
          setItems(res.data.data);
          scrollToTop();
          dispatch(setSelectedCategory("2"));
        }
      }
    } catch (error) {
      console.log({ error });
      presentToast("Please try again later");
    } finally {
      setLoading(false);

      // setCategoryItemLoading(false);
    }
  };

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

        <IonRow class="ion-justify-content-between ion-align-items-center">
          <Link to={`/${routeName}/menu`}>
            <IonImg src={isDark ? lightLogo : darkLogo} />
          </Link>

          {/*  */}
          <IonRow class="ion-justify-content-between ion-align-items-center ion-align-items-center">
            <IonCol>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
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
                  checked={isDark}
                  onIonChange={toggleDarkModeHandler}
                  name="darkMode"
                />
                <IonCol onClick={() => setIsCartOpen(true)} size="4">
                  {cart.length > 0 && (
                    <IonBadge className={styles.badge}>
                      {cart.reduce((accumulator: any, currentItem: any) => {
                        return accumulator + parseInt(currentItem.quantity);
                      }, 0)}
                    </IonBadge>
                  )}
                  <IonIcon
                    className={styles.cartIcon}
                    icon={cartOutline}
                  ></IonIcon>
                </IonCol>
              </div>
            </IonCol>
          </IonRow>
        </IonRow>

        <IonSearchbar
          mode="md"
          className={`${styles.custom} ${styles.customSearchbar} ion-no-padding`} // Applying the custom styles
          placeholder="Search"
          debounce={1000}
          onIonInput={(e) => getItem({ itemNameSearch: e.detail.value })}
        ></IonSearchbar>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderTwo;
