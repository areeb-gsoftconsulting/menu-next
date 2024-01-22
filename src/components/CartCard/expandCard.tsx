import {
  IonButton,
  IonCol,
  IonIcon,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import itemImg from "../../assets/menuImg.png";
import styles from "./styles.module.css";
import {
  remove,
  add,
  heartOutline,
  chevronForwardSharp,
  chevronDown,
} from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setCartItems } from "../../store/slices/cartSlice";

const CartCardExpand = ({ item, expand, setExpand }: any) => {
  console.log({ itemitemitem: item });
  const venue = useSelector((data: any) => data.restaurant.venue);
  const cart = useSelector((data: any) => data.cart.items);
  const dispatch = useDispatch();

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

    // let cartData: any = {
    //   id: param.id,
    //   name: param.name,
    //   price: param.price,
    //   customization: selectedCustomization,
    //   comments: param.comments,
    //   image: param.image,
    // };
    // dispatch(setCartItems(cartData));
  };

  return (
    <>
      <IonRow
        style={{
          width: "100%",
        }}
        class="ion-justify-content-between ion-align-items-center"
      >
        <div
          style={{
            display: "flex",

            alignItems: "center",
            minWidth: "190px",
            width: "100%",
          }}
        >
          <IonIcon
            onClick={() => setExpand(!expand)}
            style={{
              fontSize: "20px",
              color: "red",
              width: "20px",
            }}
            icon={chevronDown}
          />
          <IonRow class="ion-justify-content-start ion-align-items-center ion-nowrap">
            <IonImg className={styles.img} src={item.image} />
            <p
              style={{
                paddingLeft: "12px",
              }}
              className={styles.text}
            >
              {item.name}
            </p>
          </IonRow>
        </div>
        <IonCol>
          <IonRow class="ion-justify-content-between ion-align-items-center">
            <IonText>{item.price.description}</IonText>
            <IonText>
              {" "}
              {venue.defaultCurrency.sign}
              {item.price.price}
            </IonText>
          </IonRow>
          {item.customization.length > 0 && (
            <IonText className={styles.heading}>Customization</IonText>
          )}
          {item.customization.length > 0 &&
            item.customization.map((data: any, ind: any) => {
              return (
                <IonRow class="ion-justify-content-between ion-align-items-center">
                  <IonText>{data.name}</IonText>
                  <IonText>
                    {" "}
                    {venue.defaultCurrency.sign}
                    {data.price}
                  </IonText>
                </IonRow>
              );
            })}
          {item.comments.length > 0 && (
            <>
              <IonText className={styles.heading}>Comments</IonText>
              <IonText>{item.comments}</IonText>
            </>
          )}
        </IonCol>
      </IonRow>

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
        <h3 className={styles.itemCount}>{item?.quantity}</h3>
        {/* <IonButton className={styles.actionBtn}>+</IonButton> */}
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
              quantity: 1,
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
    </>
  );
};

export default CartCardExpand;
