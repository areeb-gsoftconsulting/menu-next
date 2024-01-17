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
import { useSelector } from "react-redux";
import getItems from "../../services/getItems";

const Home: React.FC = () => {
  const currentMenu = useSelector((data: any) => data.restaurant.currentMenu);
  const [openFav, setOpenFav] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tempArray, setTempArray] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [items, setItems] = useState<any>([]);
  console.log({ items });

  const getItem = async () => {
    try {
      let res = await getItems({
        menuId: currentMenu._id,
        params: { page: pageNumber, pageSize: pageSize },
      });
      if (res.data.statusCode == 200) {
        console.log(res.data.data.items);
        setItems([...items, ...res.data.data.items]);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  const onEndReach = async (e: any) => {
    setPageNumber(pageNumber + 1);
    await getItem();
    e.target.complete();
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
        <p className={styles.menu}>{currentMenu.name}</p>
        <CategorySlider menuId={currentMenu._id} />
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
          {items.map((data: any, ind: any) => (
            <>
              <ItemCard data={data} />
            </>
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
