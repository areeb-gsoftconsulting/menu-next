import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
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

const Home: React.FC = () => {
  const currentMenu = useSelector((data: any) => data.restaurant.currentMenu);
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
  const contentRef = useRef<HTMLIonContentElement>(null);

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
      }
    } catch (error) {
      console.log({ error });
    } finally {
      if (e) {
        e.target.complete();
      }
      setLoading(false);
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
    } finally {
      if (e) {
        e.target.complete();
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollToTop(300); // Adjust scroll duration if needed
    }

    if (
      selectedCategory &&
      selectedCategory !== "1" &&
      selectedCategory !== ""
    ) {
      setItemsEnded(false);
      console.log("test 1");
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

  const onEndReach = async (e: any) => {
    if (!loading && items.length > 1) {
      if (selectedCategory == "1") {
        getItem(e, { page: pageNumber });
      } else {
        await getCategoryItem(e, { page: selectedCategoryPageNum });
      }
    }
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
          {loading ? (
            <LoadingCard />
          ) : (
            items.map((data: any, ind: any) => (
              <>
                <ItemCard data={data} />
              </>
            ))
          )}
        </div>
        <FavItemsButton setOpenFav={setOpenFav} />
        {openFav && (
          <SelectedItemModal openFav={openFav} setOpenFav={setOpenFav} />
        )}
        {isCartOpen && (
          <CartModal isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        )}

        {false && (
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
