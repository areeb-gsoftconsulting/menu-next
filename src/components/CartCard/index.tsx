import { IonButton, IonIcon, IonImg, IonRow, IonText } from "@ionic/react";
import React from "react";
import itemImg from "../../assets/menuImg.png";
import styles from "./styles.module.css";
import { remove, add } from "ionicons/icons";
import { useSelector } from "react-redux";

const CartCard = ({ item }: any) => {
  console.log({ item });
  const venue = useSelector((data: any) => data.restaurant.venue);

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
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: "190px",
            width: "70%",
          }}
        >
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
          <p className={styles.text}>
            {" "}
            {venue.defaultCurrency.sign} {item.price.price}
          </p>
        </div>

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
          >
            <IonIcon
              className={styles.icons}
              slot="icon-only"
              icon={add}
            ></IonIcon>
          </IonButton>
        </div>
      </IonRow>
      <div
        style={{
          border: "0.01px solid var(--ion-search-border)",
          marginTop: "16px",
        }}
      ></div>
    </>
  );
};

export default CartCard;
