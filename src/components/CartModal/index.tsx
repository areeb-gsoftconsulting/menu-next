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
} from "@ionic/react";
import styles from "./styles.module.css";
import { chevronBack, star } from "ionicons/icons";
import CartCard from "../CartCard";

function CartModal({ isCartOpen, setIsCartOpen }: any) {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

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
        <CartCard />
        <CartCard />
        <div className={styles.priceCard}>
          <IonRow class="ion-justify-content-between ion-align-items-center">
            <p className={styles.cardTxt}>Subtotal</p>
            <p className={styles.cardTxt}>$45.5</p>
          </IonRow>
          <IonRow class="ion-justify-content-between ion-align-items-center">
            <p className={styles.cardTxt}>GST</p>
            <p className={styles.cardTxt}>$1.5</p>
          </IonRow>
          <IonRow class="ion-justify-content-between ion-align-items-center">
            <p className={styles.cardTxt}>Platform fee</p>
            <p className={styles.cardTxt}>$0.5</p>
          </IonRow>
        </div>
      </IonContent>
      <IonFooter className={styles.footer}>
        <IonRow class="ion-justify-content-between ion-align-items-center">
          <p className={styles.footerTxt}>Total</p>
          <p className={styles.footerTxt}>$55.5</p>
        </IonRow>
        <IonButton className={styles.checkoutBtn} expand="block">
          Place Order
        </IonButton>
      </IonFooter>
    </IonModal>
  );
}

export default CartModal;
