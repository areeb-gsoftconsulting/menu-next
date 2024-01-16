import {
  IonBadge,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
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
import {
  logoIonic,
  heartOutline,
  cartOutline,
  search,
  add,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import CategorySlider from "../../components/CategorySlider";
import ItemCard from "../../components/ItemCard";
import ItemDetailsCard from "../../components/ItemDetailsCard";
import FavItemsButton from "../../components/FavItemsButton";
import SelectedItemModal from "../../components/SelectedItemModal";
import CartModal from "../../components/CartModal";
import { Link } from "react-router-dom";
import HeaderOne from "../../components/HeaderOne";
import HeaderTwo from "../../components/HeaderTwo";

const Home: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [openFav, setOpenFav] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tempArray, setTempArray] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [isScrolled, setIsScrolled] = useState(false);

  const onEndReach = async (e: any) => {
    console.log("ended", e);
    setTimeout(() => {
      setTempArray([...tempArray, 1, 2, 3, 4, 5, 6]);
      e.target.complete();
    }, 2000);
  };
  const handleScroll = (event: CustomEvent) => {
    const threshold = 180;
    const scrollTop = event.detail.scrollTop;

    if (scrollTop > threshold && !isScrolled) {
      setIsScrolled(true);
    } else if (scrollTop <= threshold && isScrolled) {
      setIsScrolled(false);
    }
  };

  // Example usage
  return (
    <IonPage className={styles.page}>
      {isScrolled ? (
        <HeaderOne setIsCartOpen={setIsCartOpen} />
      ) : (
        <HeaderTwo setIsCartOpen={setIsCartOpen} />
      )}

      <IonContent
        scrollEvents={true}
        onIonScroll={(e: CustomEvent) => handleScroll(e)}
        fullscreen
      >
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
          {tempArray.map(() => (
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

        {true && (
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
        )}
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            onEndReach(ev);
          }}
        >
          <IonInfiniteScrollContent
            loadingText="Please wait..."
            loadingSpinner="bubbles"
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Home;
