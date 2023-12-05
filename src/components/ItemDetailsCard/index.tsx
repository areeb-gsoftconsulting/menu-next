import React, { useRef } from "react";
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
} from "@ionic/react";
import thumbnailImg from "../../assets/menuImg.png";
import { starSharp } from "ionicons/icons";

const ItemDetailsCard = ({ isOpen, setIsOpen }: any) => {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      ref={modal}
      isOpen={isOpen}
      trigger="open-modal"
      initialBreakpoint={0.75}
      breakpoints={[0, 0.5, 0.75, 1]}
      onDidDismiss={() => setIsOpen(false)}
    >
      <IonContent className="ion-padding">
        <IonTitle className={styles.title}>Customise</IonTitle>
        <IonImg className={styles.cardImg} src={thumbnailImg} />
        <IonRow className="ion-margin-top ion-align-items-center">
          <IonIcon className={styles.rateIcon} icon={starSharp} />
          <IonText
            style={{
              fontFamily: "poppins",
            }}
          >
            4.8
          </IonText>
        </IonRow>
        <IonRow className="ion-justify-content-between ion-align-items-center">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "5px",
            }}
          >
            <IonTitle className={styles.name}>Meat</IonTitle>
            <IonLabel className={styles.categoryName}>hoo</IonLabel>
          </div>

          <IonTitle className={styles.price}>$4.5</IonTitle>
        </IonRow>
        <IonText
          style={{
            color: "var(--ion-text-color)",
            fontFamily: "poppins",
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla soluta
          deserunt sapiente corrupti? Ipsa optio quam illum atque animi impedit,
          adipisci quos voluptate sequi vitae praesentium ullam minus inventore
          quis.
        </IonText>
        <div className={styles.flavCard}>
          <IonRow
            className={`ion-justify-content-between ion-align-items-center`}
          >
            <h4 className={`${styles.caption} ion-no-padding`}>
              Choose Flavor
            </h4>
            <h4 className={`${styles.required}`}>required</h4>
          </IonRow>
          <p className={styles.msg}>Select any 1</p>

          <IonRadioGroup value="end">
            <IonRow
              className={`ion-justify-content-between ion-align-items-center`}
            >
              <IonRadio className={`${styles.radioBtn}`} labelPlacement="end">
                <p className={`${styles.priceLabel}`}>Medium</p>
              </IonRadio>
              <p className={`${styles.priceLabel}`}>$ 4.5</p>
            </IonRow>
            <IonRow
              className={`ion-justify-content-between ion-align-items-center`}
            >
              <IonRadio className={styles.radioBtn} labelPlacement="end">
                <p className={`${styles.priceLabel}`}>Large</p>
              </IonRadio>
              <p className={`${styles.priceLabel}`}>$ 4.5</p>
            </IonRow>
          </IonRadioGroup>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ItemDetailsCard;
