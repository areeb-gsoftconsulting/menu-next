import React from "react";
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styles from "./styles.module.css";
import { starSharp, add, remove, closeCircleSharp } from "ionicons/icons";

function DeleteAlert({ isOpen, setOpen, onDelete }: any) {
  return (
    <IonModal
      onDidDismiss={() => setOpen(false)}
      className={styles.main}
      isOpen={isOpen}
    >
      <IonContent className={`ion-padding ${styles.mainContent}`}>
        <IonRow class="ion-justify-content-between">
          <IonTitle className={styles.title}></IonTitle>
          <IonIcon
            onClick={() => setOpen(false)}
            className={styles.cancelIcon}
            icon={closeCircleSharp}
          ></IonIcon>
        </IonRow>
        <h3>Delete Item</h3>
        <p>You want to delete this item from the cart?</p>
        <IonRow class="ion-justify-content-center">
          <IonButton
            onClick={() => setOpen(false)}
            className={styles.cancelBtn}
            mode="ios"
            color={"dark"}
          >
            Cancel
          </IonButton>
          <IonButton className={styles.delBtn} onClick={onDelete} mode="ios">
            Delete
          </IonButton>
        </IonRow>
      </IonContent>
    </IonModal>
  );
}
export default DeleteAlert;
