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
import { useDispatch, useSelector } from "react-redux";
import getItems from "../../services/getItems";
import { setSelectedCategory } from "../../store/slices/categorySlice";
import { useToast } from "../../hooks/useToast";

type Props = {};

const HeaderOne = ({
  setIsCartOpen,
  setOpenFav,
  openFav,
  setItems,
  scrollToTop,
  setItemsEnded,
}: any) => {
  const isDark = useSelector((data: any) => data.theme.isDark);
  const [showSearch, setShowSearch] = useState(false);
  const venue = useSelector((data: any) => data.restaurant.venue);
  const currentMenu = useSelector((data: any) => data.restaurant.currentMenu);
  const cart = useSelector((data: any) => data.cart.items);
  const liked = useSelector((data: any) => data.like.items);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { presentToast } = useToast();
  console.log({ isDark });

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
          // setItems([]);
          dispatch(setSelectedCategory("2"));
          presentToast("No item found");
        } else {
          setItemsEnded(true);
          setItems(res.data.data);
          dispatch(setSelectedCategory("2"));
          scrollToTop();
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

            <IonRow class="ion-justify-content-between ion-align-items-center">
              <Link to="/">
                <IonImg src={isDark ? lightLogo : darkLogo} />
              </Link>

              {/*  */}
              {/* <IonRow class="ion-justify-content-between ion-align-items-center">
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
                      size="medium"
                      onClick={() => setOpenFav(!openFav)}
                    ></IonIcon>
                    <IonIcon
                      className={styles.cartIcon}
                      icon={search}
                      onClick={() => setShowSearch(true)}
                    ></IonIcon>
                    <IonCol onClick={() => setIsCartOpen(true)}>
                      {cart.length > 0 && (
                        <IonBadge className={styles.badge}>
                          {cart.length}
                        </IonBadge>
                      )}
                      <IonIcon
                        className={styles.cartIcon}
                        icon={cartOutline}
                      ></IonIcon>
                    </IonCol>
                  </div>
                </IonCol>
              </IonRow> */}
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
                      onClick={() => setOpenFav(!openFav)}
                    ></IonIcon>
                    <IonIcon
                      className={styles.cartIcon}
                      icon={search}
                      onClick={() => setShowSearch(true)}
                    ></IonIcon>

                    <IonCol onClick={() => setIsCartOpen(true)} size="4">
                      {cart.length > 0 && (
                        <IonBadge className={styles.badge}>
                          {cart.reduce((accumulator: any, currentItem: any) => {
                            return accumulator + parseInt(currentItem.quantity);
                          }, 0)}
                        </IonBadge>
                      )}
                      <IonIcon
                        style={{
                          marginTop: "4px",
                        }}
                        className={styles.cartIcon}
                        icon={cartOutline}
                      ></IonIcon>
                    </IonCol>
                  </div>
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
              onIonInput={(e) => getItem({ itemNameSearch: e.detail.value })}
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
