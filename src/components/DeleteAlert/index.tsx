import React from "react";
import { IonAlert, IonButton } from "@ionic/react";
import styles from "./styles.module.css";

function DeleteAlert({ isOpen, setOpen, onDelete }: any) {
  return (
    <IonAlert
      className={styles.alert}
      subHeader="Are you sure!"
      message="You want to delete this item from the cart?"
      isOpen={isOpen}
      onWillDismiss={() => setOpen(false)}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Alert canceled");
          },
          cssClass: styles.btn,
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            onDelete();
          },
          cssClass: styles.btn,
        },
      ]}
      onDidDismiss={({ detail }) => {
        setOpen(false);
        console.log(`Dismissed with role: ${detail.role}`);
      }}
    ></IonAlert>
  );
}
export default DeleteAlert;
