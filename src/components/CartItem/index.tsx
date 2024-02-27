import React, { useEffect, useRef, useState } from "react";
import { IonButton, IonIcon, IonImg, IonRow } from "@ionic/react";
import styles from "./styles.module.css";
import {
  remove,
  add,
  heartOutline,
  chevronForwardSharp,
  chevronDown,
  trashSharp as trashBinSharp,
  chevronUp,
  chevronForward,
} from "ionicons/icons";
import itemImg from "../../assets/menuImg.png";
import ExpandedCartItem from "./expandedCartItem";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setCartItems } from "../../store/slices/cartSlice";
import DeleteAlert from "../DeleteAlert";
import useWindowDimensions from "../../hooks/useWindowDimensions";

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
  console.log({ ind });
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const { height, width } = useWindowDimensions();
  // const otherNamesRef = useRef(null);
  console.log({ isOverflowing });

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
  console.log("oneeee", customizationNames.join(",").length);
  // useEffect(() => {
  //   if (
  //     width < 770 &&
  //     width > 425 &&
  //     customizationNames.join(",").length > 56
  //   ) {
  //     setIsOverflowing(true);
  //   } else if (
  //     width > 320 &&
  //     width < 426 &&
  //     customizationNames.join(",").length > 31
  //   ) {
  //     setIsOverflowing(true);
  //   } else if (width < 375 && customizationNames.join(",").length > 17) {
  //     setIsOverflowing(true);
  //   } else {
  //     setIsOverflowing(false);
  //   }
  // }, [width]);

  // useEffect(() => {
  //   if (otherNamesRef.current) {
  //     setIsOverflowing(
  //       otherNamesRef.current.offsetWidth < otherNamesRef.current.scrollWidth
  //     );
  //   }
  // }, [customizationNames]);

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
            class="ion-align-items-center"
            className={styles.quantityBox}
          >
            <p className={styles.quantity}>{item.quantity}</p>
            <IonIcon icon={showBtn ? chevronForward : chevronDown} />
          </IonRow>
          {showBtn && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0px",
                width: "80px",
                position: "absolute",
                left: "70px",
                backgroundColor: "white",
                padding: "0px 10px",
                border: "1px solid var(--ion-search-border)",
                borderRadius: "4px",
              }}
            >
              <IonButton
                size="small"
                className={`${styles.iconBtn} ion-no-padding`}
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
                  className={styles.icons}
                  slot="icon-only"
                  icon={remove}
                ></IonIcon>
              </IonButton>
              <h3 className={styles.itemCount}>{item.quantity}</h3>
              <IonButton
                size="small"
                className={`${styles.iconBtn} ion-no-padding`}
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
                  className={styles.icons}
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
            <IonImg className={styles.img} src={item.image} />
            <div className={styles.textDiv}>
              <p className={styles.itemName}>{item.name}</p>
              {expand && (
                <p className={styles.otherNamesShow}>
                  {customizationNames.join(",")}
                </p>
              )}
            </div>
          </IonRow>
        </IonRow>
        <IonRow
          className={styles.rightBox}
          class="ion-align-items-center ion-justify-content-between ion-nowrap"
        >
          {item.customization.length > 0 ? (
            <IonIcon
              style={{ cursor: "pointer" }}
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

      {/* {expand && <ExpandedCartItem item={item} />} */}
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
