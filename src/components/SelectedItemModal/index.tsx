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

function SelectedItemModal({ openFav, setOpenFav }: any) {
  const modal = useRef<HTMLIonModalElement>(null);

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

          {[1, 2].map(() => (
            <ItemCard />
          ))}
        </div>
      </IonContent>
    </IonModal>
  );
}

export default SelectedItemModal;
