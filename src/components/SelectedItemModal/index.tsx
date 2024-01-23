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
  IonIcon,
} from "@ionic/react";
import ItemCard from "../ItemCard";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { closeCircleSharp } from "ionicons/icons";

function SelectedItemModal({ openFav, setOpenFav }: any) {
  const modal = useRef<HTMLIonModalElement>(null);
  const liked = useSelector((data: any) => data.like.items);
  console.log({ liked });

  return (
    <IonModal
      ref={modal}
      trigger="open-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      isOpen={openFav}
      onDidDismiss={() => setOpenFav(false)}
    >
      <IonContent>
        <div
          style={{
            padding: "0px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IonTitle className={styles.title}>Wishlist items</IonTitle>
            <IonIcon
              onClick={() => setOpenFav(false)}
              className={styles.cancelIcon}
              icon={closeCircleSharp}
            ></IonIcon>
          </div>

          {liked.length == 0 && (
            <div className={styles.msgContainer}>
              <p className={styles.noItem}>No wishlist items found</p>
            </div>
          )}

          {liked.map((data: any) => (
            <ItemCard data={data} />
          ))}
        </div>
      </IonContent>
    </IonModal>
  );
}

export default SelectedItemModal;
