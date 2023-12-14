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
  IonCheckbox,
  IonTextarea,
  IonButton,
  IonHeader,
} from "@ionic/react";
import thumbnailImg from "../../assets/menuImg.png";
import { starSharp, add, remove } from "ionicons/icons";
import { isPlatform } from "@ionic/react";
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
        <IonHeader className="ion-no-border">
          <IonTitle className={styles.title}>Customise</IonTitle>
        </IonHeader>

        <IonImg
          className={isPlatform("ios") ? styles.cardImg : styles.cardImgAndroid}
          src={thumbnailImg}
        />
        <IonRow className="ion-margin-top ion-align-items-center">
          <IonIcon className={styles.rateIcon} icon={starSharp} />
          <IonText
            style={{
              fontFamily: "poppins-normal",
              color: "var(--ion-text-color)",
              marginLeft: "4px",
            }}
          >
            4.8
          </IonText>
        </IonRow>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IonRow className="ion-justify-content-between ion-align-items-center">
            <IonLabel className={styles.name}>Meat</IonLabel>
            <IonLabel className={styles.price}>$4.5</IonLabel>
          </IonRow>
          <IonLabel className={styles.categoryName}>Food</IonLabel>
        </div>
        <IonText className={styles.description}>
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
            <h4 className={`${styles.required}`}>Required</h4>
          </IonRow>
          <p className={styles.msg}>Select any 1</p>

          <IonRadioGroup value="end">
            <IonRow
              className={`ion-justify-content-between ion-align-items-center`}
            >
              <IonRadio
                mode="md"
                className={`${styles.radioBtn} label-text-wrapper`}
                labelPlacement="end"
              >
                <p className={`${styles.priceLabel}`}>Medium</p>
              </IonRadio>
              <p className={`${styles.priceLabel}`}>$ 4.5</p>
            </IonRow>
            <IonRow
              className={`ion-justify-content-between ion-align-items-center`}
            >
              <IonRadio
                mode="md"
                className={styles.radioBtn}
                labelPlacement="end"
              >
                <p className={`${styles.priceLabel}`}>Large</p>
              </IonRadio>
              <p className={`${styles.priceLabel}`}>$ 4.5</p>
            </IonRow>
          </IonRadioGroup>
        </div>

        <div className={styles.optionalCard}>
          <IonRow
            className={`ion-justify-content-between ion-align-items-center`}
          >
            <h4 className={`${styles.caption} ion-no-padding`}>
              Choice of Toppings
            </h4>
            <h4 className={`${styles.optional}`}>Optional</h4>
          </IonRow>
          <p className={styles.msg}>Select upto 2</p>
          <IonRow
            className={`ion-justify-content-between ion-align-items-center`}
          >
            <IonCheckbox
              mode="md"
              className={styles.checkBox}
              labelPlacement="end"
            >
              <p className={`${styles.priceLabel}`}>Less Toppings</p>
            </IonCheckbox>
            <p className={`${styles.priceLabel}`}>free</p>
          </IonRow>
          <IonRow
            className={`ion-justify-content-between ion-align-items-center`}
          >
            <IonCheckbox
              mode="md"
              className={styles.checkBox}
              labelPlacement="end"
            >
              <p className={`${styles.priceLabel}`}>Chrysanthemum</p>
            </IonCheckbox>
            <p className={`${styles.priceLabel}`}>$ 4</p>
          </IonRow>
          <IonRow
            className={`ion-justify-content-between ion-align-items-center`}
          >
            <IonCheckbox
              mode="md"
              className={styles.checkBox}
              labelPlacement="end"
            >
              <p className={`${styles.priceLabel}`}>Pink Cactus Pearls</p>
            </IonCheckbox>
            <p className={`${styles.priceLabel}`}>$ 4</p>
          </IonRow>
        </div>
        <div className={styles.optionalCard}>
          <h4 className={`${styles.caption} ion-no-padding`}>
            Special Instructions
          </h4>
          <p className={styles.note}>
            (Please let us know if you are allergic to anything or if we need to
            avoid anything)
          </p>
          <IonTextarea
            mode="md"
            className={styles.textarea}
            placeholder="eg. no mayo"
            autoGrow={true}
            rows={4}
            fill="outline"
          ></IonTextarea>
        </div>
        <IonRow
          className={`ion-justify-content-evenly ion-align-items-center ion-padding-vertical`}
        >
          <IonButton className={`${styles.iconBtn} ion-no-padding`}>
            <IonIcon
              className={isPlatform("ios") ? styles.icons : styles.iconsAndroid}
              slot="icon-only"
              icon={remove}
            ></IonIcon>
          </IonButton>
          <h3>10</h3>
          {/* <IonButton className={styles.actionBtn}>+</IonButton> */}
          <IonButton className={`${styles.iconBtn} ion-no-padding`}>
            <IonIcon
              className={isPlatform("ios") ? styles.icons : styles.iconsAndroid}
              slot="icon-only"
              icon={add}
            ></IonIcon>
          </IonButton>
          <IonButton className={styles.addBtn}>Add to Cart</IonButton>
        </IonRow>
      </IonContent>
    </IonModal>
  );
};

export default ItemDetailsCard;
