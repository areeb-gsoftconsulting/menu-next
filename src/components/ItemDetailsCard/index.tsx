import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import {
  IonModal,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonTitle,
  IonIcon,
  IonRow,
  IonText,
  IonCol,
  IonRadioGroup,
  IonRadio,
  IonCheckbox,
  IonTextarea,
  IonButton,
  IonHeader,
  IonChip,
  IonToolbar,
} from "@ionic/react";
import thumbnailImg from "../../assets/menuImg.png";
import { starSharp, add, remove, closeCircleSharp } from "ionicons/icons";
import { isPlatform } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddedToCart,
  setCart,
  setCartItems,
} from "../../store/slices/cartSlice";
import ItemDescriptionContainer from "../ItemDescriptionContainer";
import DetailItemModalCard from "../DetailedItemModalCard";
const ItemDetailsCard = ({ data, isOpen, setIsOpen }: any) => {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      ref={modal}
      isOpen={isOpen}
      trigger="open-modal"
      initialBreakpoint={isPlatform("desktop") ? 1 : 0.75}
      breakpoints={[0, 0.5, 0.75, 1]}
      onDidDismiss={() => setIsOpen(false)}
    >
      <IonContent className="ion-padding">
        <IonHeader className="ion-no-border">
          <IonRow
            style={{ width: "100%" }}
            ion-align-items-center
            class="ion-justify-content-between"
          >
            <h1 className={styles.title}>Customise</h1>
            <IonIcon
              onClick={() => setIsOpen(false)}
              className={styles.cancelIcon}
              icon={closeCircleSharp}
            ></IonIcon>
          </IonRow>
        </IonHeader>
        <DetailItemModalCard
          data={data}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </IonContent>
    </IonModal>
  );
};

export default ItemDetailsCard;
