import {
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import styles from "./Home.module.css";

import { useEffect, useRef, useState } from "react";
import CategorySlider from "../../components/CategorySlider";
import ItemCard from "../../components/ItemCard";
import FavItemsButton from "../../components/FavItemsButton";
import SelectedItemModal from "../../components/SelectedItemModal";
import CartModal from "../../components/CartModal";
import { Link, useLocation } from "react-router-dom";
import HeaderOne from "../../components/HeaderOne";
import HeaderTwo from "../../components/HeaderTwo";
import { useDispatch, useSelector } from "react-redux";
import getItems from "../../services/getItems";
import LoadingCard from "../../components/LoadingCard";
import { useToast } from "../../hooks/useToast";
import getVenues from "../../services/getVenue";
import { setAddedToCart } from "../../store/slices/cartSlice";
import CartAnimationModal from "../../components/CartAnimationModal";
import { setSelectedCategory } from "../../store/slices/restaurantSlice";
import { setSearchedItemName } from "../../store/slices/searchSlice";

const Home: React.FC = () => {
  const route = useLocation();
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
    (data: any) => data.category.selectedCategory
  );
  const totalAmount = useSelector((data: any) => data.cart.totalAmount);
  const searchLoading = useSelector((data: any) => data.search.searchLoading);
  const itemRef = useRef(null);
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
  const addedToCart = useSelector((data: any) => data.cart.addedToCart);
  const dispatch = useDispatch();
  const searchItem = useSelector((data: any) => data.search.searchedItemName);

  useEffect(() => {
    if (addedToCart) setTimeout(() => dispatch(setAddedToCart(false)), 3000);
  }, [addedToCart]);

  const getItem = async (e: any, { page }: any) => {
    console.log("testing all");

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
    console.log("testing getCatItem");
    setLoading(true);

    let tempFilter = {
      categoryIdsToFilter: selectedCategory,
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
    if (selectedCategory && selectedCategory.includes("2")) {
      console.log("testing exception");
      return;
    }
    setCategoryItemLoading(true);
    // if (contentRef.current) {
    //   contentRef.current.scrollToTop(300); // Adjust scroll duration if needed
    // }

    if (!selectedCategory.includes("1")) {
      setItemsEnded(false);
      setSelectedCategoryPageNum(0);
      getCategoryItem(undefined, { page: 0 });
    }
    if (selectedCategory.includes("1")) {
      setPageNumber(0);
      setItemsEnded(false);
      dispatch(setSearchedItemName(""));
      getItem(undefined, { page: 0 });
    }
  }, [selectedCategory, route.pathname]);

  useEffect(() => {
    console.log("this==> 1");
    // dispatch(setSelectedCategory("1"));
  }, []);

  // useEffect(() => {
  //   getItem();
  // }, []);
  console.log("thissssss", items);

  const onEndReach = async (e: any) => {
    if (searchItem.length > 0) {
      e.target.complete();
      return;
    }
    if (selectedCategory.includes("1")) {
      getItem(e, { page: pageNumber });
    } else {
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
  const handleScrollTwo = (id) => {
    let next = parseInt(id) - 1;
    if (next < 0) {
      const scrollTop = contentRef.current.scrollToTop(1000);
    } else {
      const element = document.getElementById(`${next < 0 ? 0 : next}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  const scrollEvent = (e) => {
    const x = e.detail.scrollTop;
    const threshold = 200;
  };
  const scrollToTop = () => {
    // Replace 'ionContentRef' with a ref to your IonContent component
    // You can use useRef hook to create a ref and attach it to IonContent

    contentRef.current.scrollToTop();
  };

  // Example usage
  return (
    <IonPage className={styles.page}>
      {isScrolled ? (
        <HeaderOne
          scrollToTop={scrollToTop}
          setItems={setItems}
          setItemsEnded={setItemsEnded}
          setOpenFav={setOpenFav}
          openFav={openFav}
          setIsCartOpen={setIsCartOpen}
        />
      ) : (
        <HeaderTwo
          scrollToTop={scrollToTop}
          setItems={setItems}
          setItemsEnded={setItemsEnded}
          setOpenFav={setOpenFav}
          openFav={openFav}
          setIsCartOpen={setIsCartOpen}
        />
      )}

      <IonContent
        scrollEvents={scrollEvent}
        onIonScroll={(e: CustomEvent) => {
          console.log("ee", e.detail);
          if (!itemsEnded) {
            handleScroll(e);
          } else {
            if (e.detail.scrollTop > 150) {
              setIsScrolled(true);
            } else {
              setIsScrolled(false);
            }
          }
        }}
        ref={contentRef}
        fullscreen
      >
        <p className={styles.menu}>{currentMenu.name}</p>
        <IonHeader mode="ios" className={`ion-no-border`}>
          <IonToolbar className={`${styles.toolbarScrolled}`}>
            <CategorySlider menuId={currentMenu._id} />
          </IonToolbar>
        </IonHeader>
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
          {!categoryItemloading && items.length == 0 && (
            <div className={styles.msgContainer}>
              <p className={styles.noItem}>No items found</p>
            </div>
          )}
          {categoryItemloading || searchLoading ? (
            <LoadingCard />
          ) : (
            items.map((data: any, ind: any) => (
              <>
                <ItemCard
                  ind={ind}
                  data={data}
                  handleScrollTwo={handleScrollTwo}
                />
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
              <p className={styles.itemCount}>
                {cart.reduce((accumulator: any, currentItem: any) => {
                  return accumulator + parseInt(currentItem.quantity);
                }, 0)}
              </p>
              <p className={styles.cartBtnTxt}>View your cart</p>
              <p className={styles.cartBtnTxt}>
                {venue.defaultCurrency.sign} {totalAmount}
              </p>
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
          {addedToCart && <CartAnimationModal addedToCart={addedToCart} />}
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Home;
