import React, { useRef } from "react";
import {
  IonButton,
  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonImg,
  IonSearchbar,
  IonTitle,
} from "@ionic/react";
import ItemCard from "../ItemCard";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";

function SelectedItemModal({ openFav, setOpenFav }: any) {
  const modal = useRef<HTMLIonModalElement>(null);
  const liked = useSelector((data: any) => data.like.items);
  console.log({ liked });

  return (
    <IonModal
      ref={modal}
      trigger="open-modal"
      initialBreakpoint={0.5}
      breakpoints={[0, 0.5, 0.75, 1]}
      isOpen={openFav}
      onDidDismiss={() => setOpenFav(false)}
    >
      <IonContent>
        <div
          style={{
            padding: "0px 20px",
          }}
        >
          <IonTitle className={styles.title}>Selected items</IonTitle>

          {liked.map((data: any) => (
            <ItemCard data={data} />
          ))}
        </div>
      </IonContent>
    </IonModal>
  );
}

export default SelectedItemModal;
