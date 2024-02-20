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
  isPlatform,
} from "@ionic/react";
import styles from "./styles.module.css";
import { starSharp, add, remove, closeCircleSharp } from "ionicons/icons";

function DeleteAlert({ isOpen, setOpen, onDelete }: any) {
  return (
    <IonModal
      onDidDismiss={() => setOpen(false)}
      className={
        isPlatform("mobileweb") || isPlatform("mobile")
          ? styles.mainMobile
          : styles.main
      }
      isOpen={isOpen}
    >
      <IonContent className={`ion-padding ${styles.mainContent}`}>
        <IonRow class="ion-justify-content-between">
          <p className={styles.title}></p>
          <IonIcon
            onClick={() => setOpen(false)}
            className={styles.cancelIcon}
            icon={closeCircleSharp}
          ></IonIcon>
        </IonRow>
        <h3
          style={{
            fontFamily: "poppins-normal",
            fontSize:
              isPlatform("mobileweb") || isPlatform("mobile") ? "15px" : "17px",
            marginTop:
              isPlatform("mobileweb") || isPlatform("mobile") ? "0px" : "10px",
          }}
        >
          Delete Item
        </h3>
        <p
          style={{
            fontFamily: "poppins",
            fontSize:
              isPlatform("mobileweb") || isPlatform("mobile") ? "15px" : "17px",
          }}
        >
          Do you want to delete the item?
        </p>
        <IonRow class="ion-justify-content-center">
          <IonButton
            size="small"
            onClick={() => setOpen(false)}
            className={styles.cancelBtn}
            mode="ios"
            color={"dark"}
          >
            Cancel
          </IonButton>
          <IonButton
            size="small"
            className={styles.delBtn}
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            mode="ios"
          >
            Delete
          </IonButton>
        </IonRow>
      </IonContent>
    </IonModal>
  );
}
export default DeleteAlert;
