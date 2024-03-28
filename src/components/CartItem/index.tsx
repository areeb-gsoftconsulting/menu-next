import React, { useEffect, useRef, useState } from "react";
import { IonButton, IonIcon, IonImg, IonRow, isPlatform } from "@ionic/react";
import styles from "./styles.module.css";
import {
  remove,
  add,
  chevronDown,
  trashSharp as trashBinSharp,
  chevronUp,
  chevronForward,
} from "ionicons/icons";

import { useDispatch, useSelector } from "react-redux";
import { setCart, setCartItems } from "../../store/slices/cartSlice";
import DeleteAlert from "../DeleteAlert";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import notFound from "../../assets/placeholderLight.png";
type Props = {};

const CartItem = ({
  setSelectedDetailItem,
  item,
  ind,
  setOpenDetailed,
}: any) => {
  const venue = useSelector((data: any) => data.restaurant.venue);
  const [expand, setExpand] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((data: any) => data.cart.items);
  const [isOpenDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    if (showBtn) {
      setTimeout(() => setShowBtn(false), 2000);
    }
  }, [showBtn]);

  const addToCart = (param: any) => {
    function arraysEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false;
      }
      for (let i = 0; i < arr1.length; i++) {
        if (!objectsEqual(arr1[i], arr2[i])) {
          return false;
        }
      }
      return true;
    }
    // Function to compare objects
    function objectsEqual(obj1, obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
      return true;
    }

    // /////////////
    let tempCart = [...cart];
    let tempItemIndex = tempCart.findIndex(
      (item: any) =>
        item.id == param.id &&
        item.price._id == param.price._id &&
        arraysEqual(item.customization, param.customization)
    );
    if (tempItemIndex == -1 && param.quantity > 0) {
      dispatch(setCartItems(param));
    } else {
      let updatedItem = { ...tempCart[tempItemIndex] };
      updatedItem.quantity = updatedItem.quantity + param.quantity;

      // Check if quantity becomes zero, remove the item from the cart
      if (updatedItem.quantity === 0) {
        tempCart.splice(tempItemIndex, 1); // Remove the item from the array
      } else {
        tempCart[tempItemIndex] = updatedItem;
      }

      dispatch(setCart(tempCart));
    }
  };
  const openDeleteModal = () => {
    setOpenDelete(true);
  };
  const delItem = () => {
    let restCart = cart.filter((data: any, index: any) => ind !== index);
    dispatch(setCart(restCart));
  };

  const customizationNames = item.customization.map((data: any) => data.name);
  const customizationPrices = item.customization.reduce(
    (accumulator: any, current: any) => accumulator + current.price,
    0
  );

  return (
    <>
      <IonRow
        className={styles.mainRow}
        class="ion-justify-content-between ion-align-items-center"
      >
        <IonRow className={styles.leftBox} class="ion-align-items-center">
          <IonRow
            onClick={(e) => {
              e.preventDefault();
              setShowBtn(!showBtn);
            }}
            class="ion-align-items-center ion-justify-content-between"
            className={showBtn ? styles.quantityBoxBig : styles.quantityBox}
          >
            <p className={styles.quantityCards}>{item.quantity}</p>
            <IonIcon
              className={styles.chevIcon}
              icon={showBtn ? chevronForward : chevronDown}
            />
          </IonRow>
          {showBtn && (
            <div className={styles.floatBtn}>
              <IonButton
                size="default"
                className={`${
                  isPlatform("mobile") ? styles.iconBtn : styles.iconBtnWeb
                } ion-no-padding`}
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    customization: item.customization,
                    comments: item.comments,
                    image: item.image,
                    quantity: -1,
                  });
                }}
              >
                <IonIcon
                  className={
                    isPlatform("ios")
                      ? styles.icons
                      : isPlatform("mobileweb")
                      ? styles.iconsAndroid
                      : styles.iconsWeb
                  }
                  slot="icon-only"
                  icon={remove}
                ></IonIcon>
              </IonButton>

              <IonButton
                size="default"
                className={`${
                  isPlatform("mobile") ? styles.iconBtn : styles.iconBtnWeb
                } ion-no-padding`}
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    customization: item.customization,
                    comments: item.comments,
                    image: item.image,
                    quantity: +1,
                  });
                }}
              >
                <IonIcon
                  className={
                    isPlatform("ios")
                      ? styles.icons
                      : isPlatform("mobileweb")
                      ? styles.iconsAndroid
                      : styles.iconsWeb
                  }
                  slot="icon-only"
                  icon={add}
                ></IonIcon>
              </IonButton>
            </div>
          )}

          <IonRow
            onClick={(e) => {
              e.preventDefault();
              setOpenDetailed(true);
              setSelectedDetailItem([item]);
            }}
            class="ion-align-items-center ion-justify-content-left"
            className={styles.nameImgBox}
          >
            <IonImg
              className={styles.img}
              src={item.image ? item.image : notFound}
            />
            <div className={styles.textDiv}>
              <p className={styles.itemName}>{item.name}</p>
              {expand && (
                <>
                  {" "}
                  <p className={styles.otherNamesShow}>
                    {customizationNames.join(",")}
                  </p>
                  <p className={styles.otherNamesShow}>{item.comments}</p>
                </>
              )}
            </div>
          </IonRow>
        </IonRow>
        <IonRow
          className={styles.rightBox}
          class="ion-align-items-center ion-justify-content-between ion-nowrap"
        >
          {item.customization.length > 0 || item.comments.length > 0 ? (
            <IonIcon
              className={styles.toggleIcon}
              icon={expand ? chevronUp : chevronDown}
              onClick={() => setExpand(!expand)}
            />
          ) : (
            <IonIcon
              className={styles.iconHidder}
              icon={expand ? chevronUp : chevronDown}
            />
          )}
          <p className={styles.quantity}>
            {venue.defaultCurrency.sign}{" "}
            {item.price.price + customizationPrices}
          </p>

          <IonIcon
            onClick={() => openDeleteModal()}
            className={styles.trash}
            icon={trashBinSharp}
          />
        </IonRow>
      </IonRow>

      {isOpenDelete && (
        <DeleteAlert
          setOpen={setOpenDelete}
          isOpen={isOpenDelete}
          onDelete={delItem}
        />
      )}
    </>
  );
};

export default CartItem;
