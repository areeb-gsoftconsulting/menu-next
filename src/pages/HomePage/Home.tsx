import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import styles from "./Home.module.css";

import { useEffect, useRef, useState } from "react";
import CategorySlider from "../../components/CategorySlider";
import ItemCard from "../../components/ItemCard";
import FavItemsButton from "../../components/FavItemsButton";
import SelectedItemModal from "../../components/SelectedItemModal";
import CartModal from "../../components/CartModal";
import { Link } from "react-router-dom";
import HeaderOne from "../../components/HeaderOne";
import HeaderTwo from "../../components/HeaderTwo";
import { useSelector } from "react-redux";
import getItems from "../../services/getItems";
import LoadingCard from "../../components/LoadingCard";
import { useToast } from "../../hooks/useToast";
import getVenues from "../../services/getVenue";

const Home: React.FC = () => {
  const currentMenu = useSelector((data: any) => data.restaurant.currentMenu);
  const venue = useSelector((data: any) => data.restaurant.venue);
  const [openFav, setOpenFav] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [tempArray, setTempArray] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategoryPageNum, setSelectedCategoryPageNum] = useState(0);
  const selectedCategory = useSelector(
    (data: any) => data.restaurant.selectedCategory
  );
  const [items, setItems] = useState<any>([]);
  const [itemsEnded, setItemsEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryItemloading, setCategoryItemLoading] = useState(false);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const cart = useSelector((data: any) => data.cart.items);
  const { presentToast } = useToast();
  const router = useIonRouter();
  const requestedUrl = new URLSearchParams(location.search).get("requestedUrl");
  const sanitizedUrl = requestedUrl
    ? requestedUrl.replace(/^\/+|\/+$/g, "")
    : "";

  const getItem = async (e: any, { page }: any) => {
    console.log("get all");
    setLoading(true);

    try {
      let res = await getItems({
        menuId: currentMenu._id,
        params: { page: page + 1, pageSize: pageSize },
      });
      if (res.data.statusCode == 200) {
        console.log(res.data.data.items);
        if (res.data.data.items.length == 0) {
          setItemsEnded(true);
        }
        if (page + 1 === 1) {
          setItems([...res.data.data.items]);
        } else {
          setItems([...items, ...res.data.data.items]);
        }
        setPageNumber(page + 1);
      } else {
      }
    } catch (error) {
      console.log({ error });
      presentToast("Please try again later");
    } finally {
      setLoading(false);

      if (e) {
        e.target.complete();
      }
      setCategoryItemLoading(false);
    }
  };

  const getCategoryItem = async (e: any, { page }: any) => {
    setLoading(true);

    let tempFilter = {
      categoryIdsToFilter: [selectedCategory],
    };
    const frilters = JSON.stringify(tempFilter);

    try {
      let res = await getItems({
        menuId: currentMenu._id,
        params: {
          page: page + 1,
          pageSize: pageSize,
          filters: frilters,
        },
      });
      if (res.data.statusCode == 200) {
        if (res.data.data.items.length == 0) {
          setItemsEnded(true);
        }
        console.log(res.data.data.items);
        if (page + 1 === 1) {
          setItems([...res.data.data.items]);
        } else {
          setItems([...items, ...res.data.data.items]);
        }
        setSelectedCategoryPageNum(page + 1);

        // setItems([...items, ...res.data.data.items]);
      }
    } catch (error) {
      console.log({ error });
      presentToast("Please try again later");
    } finally {
      setLoading(false);
      if (e) {
        e.target.complete();
      }

      setCategoryItemLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory && selectedCategory == "2") {
      return;
    }
    setCategoryItemLoading(true);
    // if (contentRef.current) {
    //   contentRef.current.scrollToTop(300); // Adjust scroll duration if needed
    // }

    if (
      selectedCategory &&
      selectedCategory !== "1" &&
      selectedCategory !== ""
    ) {
      setItemsEnded(false);
      setSelectedCategoryPageNum(0);
      getCategoryItem(undefined, { page: 0 });
    }
    if (selectedCategory == "1") {
      setPageNumber(0);
      setItemsEnded(false);
      getItem(undefined, { page: 0 });
    }
  }, [selectedCategory]);

  // useEffect(() => {
  //   getItem();
  // }, []);
  console.log("thissssss", items);

  const onEndReach = async (e: any) => {
    console.log("test 1", loading, items.length);

    console.log("test 2");

    if (selectedCategory == "1") {
      console.log("test 3");
      getItem(e, { page: pageNumber });
    } else {
      console.log("test 4");

      await getCategoryItem(e, { page: selectedCategoryPageNum });
    }
  };

  console.log("test", { itemsEnded });

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
        <HeaderOne
          setItems={setItems}
          setItemsEnded={setItemsEnded}
          setOpenFav={setOpenFav}
          openFav={openFav}
          setIsCartOpen={setIsCartOpen}
        />
      ) : (
        <HeaderTwo
          setItems={setItems}
          setItemsEnded={setItemsEnded}
          setOpenFav={setOpenFav}
          openFav={openFav}
          setIsCartOpen={setIsCartOpen}
        />
      )}

      <IonContent
        scrollEvents={true}
        onIonScroll={(e: CustomEvent) => handleScroll(e)}
        ref={contentRef}
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
          {categoryItemloading ? (
            <LoadingCard />
          ) : (
            items.map((data: any, ind: any) => (
              <>
                <ItemCard data={data} />
              </>
            ))
          )}
        </div>
        {/* <FavItemsButton setOpenFav={setOpenFav} /> */}
        {openFav && (
          <SelectedItemModal openFav={openFav} setOpenFav={setOpenFav} />
        )}
        {isCartOpen && (
          <CartModal isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        )}

        {cart.length > 0 && (
          <div className={`${styles.cartBottomButton}`}>
            <div
              onClick={() => setIsCartOpen(true)}
              className={styles.innerBottomBtn}
            >
              <p className={styles.itemCount}>{cart.length}</p>
              <p className={styles.cartBtnTxt}>View your cart</p>
              <p className={styles.cartBtnTxt}>$ 18.50</p>
            </div>
          </div>
        )}
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            if (!itemsEnded) {
              onEndReach(ev);
            }
          }}
        >
          {!itemsEnded && (
            <IonInfiniteScrollContent
              loadingText="Please wait..."
              loadingSpinner="bubbles"
            ></IonInfiniteScrollContent>
          )}
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Home;
