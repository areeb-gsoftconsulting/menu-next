import { IonButton, IonCol, IonIcon, IonRow } from "@ionic/react";
import React from "react";
import styles from "./styles.module.css";
import { remove, add } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setCartItems } from "../../store/slices/cartSlice";
type Props = {};

const ExpandedCartItem = ({ item }: any) => {
  const venue = useSelector((data: any) => data.restaurant.venue);
  const dispatch = useDispatch();
  const cart = useSelector((data: any) => data.cart.items);

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

  return (
    <div className={styles.expandCard}>
      <p className={styles.name}>{item.name}</p>
      <IonRow class="ion-align-items-between ion-justify-content-between">
        <p className={styles.text}>{item.price.description}</p>
        <p className={styles.text}>
          {venue.defaultCurrency.sign} {item.price.price}
        </p>
      </IonRow>
      {item.customization.length > 0 && (
        <p className={styles.heading}>Customization</p>
      )}
      {item.customization.map((customization: any, index: any) => {
        return (
          <IonRow class="ion-align-items-between ion-justify-content-between">
            <p className={styles.text}>{customization.name}</p>
            <p className={styles.text}>
              {venue.defaultCurrency.sign} {customization.price}
            </p>
          </IonRow>
        );
      })}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0px",
            width: "80px",
          }}
        >
          <IonButton
            size="small"
            className={`${styles.iconBtn} ion-no-padding`}
            onClick={() =>
              addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                customization: item.customization,
                comments: item.comments,
                image: item.image,
                quantity: -1,
              })
            }
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
            onClick={() =>
              addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                customization: item.customization,
                comments: item.comments,
                image: item.image,
                quantity: +1,
              })
            }
          >
            <IonIcon
              className={styles.icons}
              slot="icon-only"
              icon={add}
            ></IonIcon>
          </IonButton>
        </div>
      </div>
      {item.comments.length > 0 && (
        <p className={styles.comments}>{item.comments}</p>
      )}
    </div>
  );
};

export default ExpandedCartItem;
