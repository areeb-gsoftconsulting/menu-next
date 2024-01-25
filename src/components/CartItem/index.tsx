import React, { useState } from "react";
import { IonIcon, IonImg, IonRow } from "@ionic/react";
import styles from "./styles.module.css";
import {
  remove,
  add,
  heartOutline,
  chevronForwardSharp,
  chevronDown,
  trashBinSharp,
  chevronUp,
} from "ionicons/icons";
import itemImg from "../../assets/menuImg.png";
import ExpandedCartItem from "./expandedCartItem";
import { useSelector } from "react-redux";

type Props = {};

const CartItem = ({ item }: any) => {
  const venue = useSelector((data: any) => data.restaurant.venue);
  const [expand, setExpand] = useState(false);

  return (
    <>
      <IonRow
        style={{}}
        class="ion-justify-content-between ion-align-items-center"
      >
        <IonRow className={styles.leftBox} class="ion-align-items-center">
          <IonRow class="ion-align-items-center" className={styles.quantityBox}>
            <p className={styles.quantity}>{item.quantity}</p>
            <IonIcon icon={chevronDown} />
          </IonRow>

          <IonRow
            class="ion-align-items-center ion-justify-content-left"
            className={styles.nameImgBox}
          >
            <IonImg className={styles.img} src={itemImg} />
            <p className={styles.quantity}>{item.name}</p>
          </IonRow>
        </IonRow>
        <IonRow
          className={styles.rightBox}
          class="ion-align-items-center ion-justify-content-between"
        >
          <p className={styles.quantity}>
            {venue.defaultCurrency.sign} {item.price.price}
          </p>
          <IonIcon
            style={{ cursor: "pointer" }}
            icon={expand ? chevronUp : chevronDown}
            onClick={() => setExpand(!expand)}
          />
          <IonIcon className={styles.trash} icon={trashBinSharp} />
        </IonRow>
      </IonRow>
      {expand && <ExpandedCartItem item={item} />}
    </>
  );
};

export default CartItem;
