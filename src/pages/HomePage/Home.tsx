import {
  IonBadge,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import styles from "./Home.module.css";
import lightLogo from "../../assets/logoLight.png";
import darkLogo from "../../assets/logoDark.png";
import { logoIonic, heartOutline, cartOutline, add } from "ionicons/icons";
import { useState } from "react";
import CategorySlider from "../../components/CategorySlider";
import ItemCard from "../../components/ItemCard";
import ItemDetailsCard from "../../components/ItemDetailsCard";
import FavItemsButton from "../../components/FavItemsButton";
import SelectedItemModal from "../../components/SelectedItemModal";
import CartModal from "../../components/CartModal";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [openFav, setOpenFav] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleDarkModeHandler = () => {
    document.body.classList.toggle("dark");
    return document.body.classList.contains("dark")
      ? setIsDark(true)
      : setIsDark(false);
  };

  // Example usage
  return (
    <IonPage className={styles.page}>
      <IonHeader mode="ios" className={`ion-no-border`} translucent={true}>
        <IonToolbar className={`${styles.toolbar}`}>
          <IonText>
            <p className={styles.labelContainer}>Amsterdam</p>
          </IonText>

          <IonRow class="ion-justify-content-between">
            <IonImg src={isDark ? lightLogo : darkLogo} />

            {/*  */}
            <IonRow class="ion-justify-content-between ion-align-items-center">
              <IonCol size="8">
                {/* <IonIcon
                  className={styles.heartIcon}
                  icon={heartOutline}
                ></IonIcon> */}
                <IonToggle
                  onIonChange={toggleDarkModeHandler}
                  name="darkMode"
                />
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

          <IonSearchbar
            mode="md"
            className={`${styles.custom} ${styles.customSearchbar} ion-no-padding`} // Applying the custom styles
            placeholder="Search"
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <p className={styles.menu}>Vegetarian</p>
        <CategorySlider />
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
        <div
          style={{
            padding: "0px 20px",
          }}
        >
          {[1, 2, 3, 4, 5].map(() => (
            <ItemCard />
          ))}
        </div>
        <FavItemsButton setOpenFav={setOpenFav} />
        {openFav && (
          <SelectedItemModal openFav={openFav} setOpenFav={setOpenFav} />
        )}
        {isCartOpen && (
          <CartModal isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        )}

        <div className={`${styles.cartBottomButton}`}>
          <div
            onClick={() => setIsCartOpen(true)}
            className={styles.innerBottomBtn}
          >
            <p className={styles.itemCount}>2</p>
            <p className={styles.cartBtnTxt}>View your cart</p>
            <p className={styles.cartBtnTxt}>$ 18.50</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
