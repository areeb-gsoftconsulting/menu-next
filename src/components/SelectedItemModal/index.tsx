import React, { useRef, useState } from "react";
import {
  IonModal,
  IonContent,
  IonIcon,
  IonFooter,
  IonRow,
  IonButton,
  isPlatform,
  IonCheckbox,
} from "@ionic/react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeCircleSharp, heartSharp, addCircleSharp } from "ionicons/icons";
import SelectedItemCard from "../SelectedItemCard";
import { setLiked } from "../../store/slices/likeSlice";
import {
  setCart,
  setAddedToCart as setAddedToCart,
} from "../../store/slices/cartSlice";

function SelectedItemModal({ openFav, setOpenFav }: any) {
  const modal = useRef<HTMLIonModalElement>(null);
  const liked = useSelector((data: any) => data.like.items);
  const [selectBulk, setSelectBulk] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((data: any) => data.cart.items);
  const [errorItems, setErrorItems] = useState([]);

  const setingLiked = () => {
    const updatedLiked = liked.filter(
      (item: any) =>
        !selectBulk.some((itemToRemove: any) => itemToRemove._id === item._id)
    );
    setSelectBulk([]);

    dispatch(setLiked(updatedLiked));
  };

  const setAddToCart = () => {
    const filterItems = selectBulk.filter(
      (item: any) =>
        item.prices.length === 1 &&
        item.customization.length === 0 &&
        item.inStock
    );
    const tempErrItems = selectBulk.filter(
      (item: any) =>
        item.prices.length > 1 ||
        item.customization.length > 0 ||
        item.inStock == false
    );

    setErrorItems(tempErrItems);

    const updatedCart = [...cart];

    filterItems.forEach((item: any) => {
      const existingCartItemIndex = updatedCart.findIndex(
        (cartItem: any) => cartItem.name === item.name
      );

      if (existingCartItemIndex !== -1) {
        updatedCart[existingCartItemIndex] = {
          ...updatedCart[existingCartItemIndex],
          quantity: updatedCart[existingCartItemIndex].quantity + 1,
        };
      } else {
        updatedCart.push({
          comments: "",
          customization: [],
          image: item.imageUrl,
          name: item.name,
          price: item.prices[0],
          quantity: 1,
          id: item._id,
        });
      }
    });
    dispatch(setCart(updatedCart));
    if (filterItems.length > 0) {
      dispatch(setAddedToCart(true));
    }
    setSelectBulk(tempErrItems);
    // setOpenFav(false);
  };

  return (
    <IonModal
      ref={modal}
      trigger="open-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      isOpen={openFav}
      onDidDismiss={() => setOpenFav(false)}
    >
      <IonContent>
        <div
          style={{
            padding: "0px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <h1 className={styles.title}>Wishlist items</h1>
            <IonIcon
              onClick={() => setOpenFav(false)}
              className={styles.cancelIcon}
              icon={closeCircleSharp}
            ></IonIcon>
          </div>

          {liked.length == 0 && (
            <div className={styles.msgContainer}>
              <p className={styles.noItem}>No wishlist items found</p>
            </div>
          )}

          {selectBulk.length > 0 && (
            <IonRow class="ion-justify-content-start ion-align-items-center">
              <IonCheckbox
                checked={selectBulk.length == liked.length}
                onIonChange={(e) => {
                  if (liked.length > 0 && selectBulk.length !== liked.length) {
                    setSelectBulk([...liked]);
                  } else {
                    setSelectBulk([]);
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                mode="md"
                className={styles.checkBox}
                labelPlacement="end"
              ></IonCheckbox>
              <p className={styles.selectAll}>All</p>
            </IonRow>
          )}
          {liked.map((data: any) => (
            <SelectedItemCard
              selectBulk={selectBulk}
              setSelectBulk={setSelectBulk}
              data={data}
              setErrorItems={setErrorItems}
              errorItems={errorItems}
            />
          ))}
        </div>
      </IonContent>
      {selectBulk.length > 0 && (
        <IonFooter className={styles.elementToFadeInAndOut}>
          <IonRow
            className={styles.footer}
            class="ion-justify-content-between ion-align-items-center"
          >
            <IonIcon
              onClick={() => setingLiked()}
              className={styles.icons}
              icon={heartSharp}
            ></IonIcon>
            <IonButton
              expand="block"
              size={isPlatform("mobile") ? "small" : "default"}
              className={styles.addBtn}
              onClick={() => setAddToCart()}
            >
              Add to Cart
            </IonButton>
          </IonRow>
        </IonFooter>
      )}
    </IonModal>
  );
}

export default SelectedItemModal;
