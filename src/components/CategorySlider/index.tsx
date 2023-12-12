import { IonImg, IonSegment, IonSegmentButton, IonToolbar } from "@ionic/react";
import React, { useState } from "react";
import styles from "./styles.module.css";
import categoryImg from "../../assets/menuImg.png";

const CategorySlider = () => {
  let x = [
    "food",
    "lunch",
    "dinner",
    "fastfood",
    "burger",
    "beer",
    "wine",
    "milk",
    "tea",
    "coffee",
  ];
  return (
    <IonToolbar className={`${styles.toolbar} ion-no-padding`}>
      <IonSegment mode="md" scroll-y="false" scrollable>
        {x.map((o, i) => (
          <IonSegmentButton color="secondary" value={o}>
            <div>
              <IonImg className={styles.image} src={categoryImg} />
            </div>
            <p className={styles.name}>{o}</p>
          </IonSegmentButton>
        ))}
      </IonSegment>
    </IonToolbar>
  );
};

export default CategorySlider;
