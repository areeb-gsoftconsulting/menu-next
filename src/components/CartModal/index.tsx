import React, { useState, useRef, useEffect } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonImg,
  IonIcon,
  IonRow,
  IonFooter,
  IonText,
  IonCol,
} from "@ionic/react";
import styles from "./styles.module.css";
import { chevronBack, star } from "ionicons/icons";
import CartCard from "../CartCard";
import { useSelector } from "react-redux";
import cartImg from "../../assets/emptyCart.png";
import CartItem from "../CartItem";
import DetailedAddedToCart from "../DetailedAddedToCart";

function CartModal({ isCartOpen, setIsCartOpen }: any) {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const cart = useSelector((data: any) => data.cart.items);
  console.log({ cart });
  const venue = useSelector((data: any) => data.restaurant.venue);
  const totalAmount = useSelector((data: any) => data.cart.totalAmount);
  const [openDetailed, setOpenDetailed] = useState(false);
  const [selectDetailItem, setSelectedDetailItem] = useState([]);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  return (
    <IonModal
      ref={modal}
      className={styles.main}
      trigger="open-modal"
      presentingElement={presentingElement!}
      isOpen={isCartOpen}
      onDidDismiss={() => setIsCartOpen(false)}
    >
      <IonHeader className={styles.header}>
        <IonToolbar className={styles.toolbar}>
          <IonButtons onClick={() => dismiss()} slot="start">
            <IonIcon className={styles.backIcon} icon={chevronBack} />
            <IonButton className={styles.backBtn}>Cart</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {cart.map((item: any, ind: any) => {
          return (
            <CartItem
              setSelectedDetailItem={setSelectedDetailItem}
              setOpenDetailed={setOpenDetailed}
              item={item}
              ind={ind}
            />
          );
        })}
        {cart.length > 0 && (
          <div className={styles.priceCard}>
            <IonRow class="ion-justify-content-between ion-align-items-center">
              <p className={styles.cardTxt}>Subtotal</p>
              <p className={styles.cardTxt}>
                {venue.defaultCurrency.sign} {totalAmount}
              </p>
            </IonRow>
            <IonRow class="ion-justify-content-between ion-align-items-center">
              <p className={styles.cardTxt}>GST</p>
              <p className={styles.cardTxt}>{venue.defaultCurrency.sign} 0</p>
            </IonRow>
            <IonRow class="ion-justify-content-between ion-align-items-center">
              <p className={styles.cardTxt}>Platform fee</p>
              <p className={styles.cardTxt}>{venue.defaultCurrency.sign} 0</p>
            </IonRow>
          </div>
        )}
        {cart.length < 1 && (
          <IonCol>
            <IonImg className={styles.img} src={cartImg} />
            <p className={styles.cartText}>Your cart is empty</p>
          </IonCol>
        )}
      </IonContent>
      {cart.length > 0 && (
        <IonFooter className={styles.footer}>
          <IonRow class="ion-justify-content-between ion-align-items-center">
            <p className={styles.footerTxt}>Total</p>
            <p className={styles.footerTxt}>
              {venue.defaultCurrency.sign} {totalAmount}
            </p>
          </IonRow>
          <IonButton className={styles.checkoutBtn} expand="block">
            Place Order
          </IonButton>
        </IonFooter>
      )}
      {openDetailed && (
        <DetailedAddedToCart
          selectDetailItem={selectDetailItem}
          open={openDetailed}
          setOpen={setOpenDetailed}
        />
      )}
    </IonModal>
  );
}

export default CartModal;
