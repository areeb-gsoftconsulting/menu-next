import React, { useRef, useState } from "react";
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
import { starSharp, add, remove, closeCircleSharp } from "ionicons/icons";
import { isPlatform } from "@ionic/react";
import { useSelector } from "react-redux";
const ItemDetailsCard = ({ data, isOpen, setIsOpen }: any) => {
  const modal = useRef<HTMLIonModalElement>(null);
  let categoryName = data.categories.map((obj: any) => obj.name);
  categoryName = categoryName.join(" ,");
  const venue = useSelector((data: any) => data.restaurant.venue);
  const [comments, setComments] = useState("");
  console.log({ comments });

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
          <IonRow class="ion-justify-content-between">
            <IonTitle className={styles.title}>Customise</IonTitle>
            <IonIcon
              onClick={() => setIsOpen(false)}
              className={styles.cancelIcon}
              icon={closeCircleSharp}
            ></IonIcon>
          </IonRow>
        </IonHeader>

        <IonImg
          className={isPlatform("ios") ? styles.cardImg : styles.cardImgAndroid}
          src={thumbnailImg}
        />
        {/* <IonRow className="ion-margin-top ion-align-items-center">
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
        </IonRow> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IonRow className="ion-justify-content-between ion-align-items-center">
            <IonLabel className={styles.name}>{data.name}</IonLabel>
            {/* <IonLabel className={styles.price}>$4.5</IonLabel> */}
          </IonRow>
          <IonLabel className={styles.categoryName}>{categoryName}</IonLabel>
        </div>

        <IonText className={styles.description}>{data.description}</IonText>

        {data.prices.length > 1 ? (
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

            <IonRadioGroup onClick={(e) => e.stopPropagation()} value="end">
              {data.prices.map((obj: any, ind: any) => (
                <IonRow
                  key={ind}
                  className={`ion-justify-content-between ion-align-items-center`}
                >
                  <IonRadio
                    mode="md"
                    className={`${styles.radioBtn} label-text-wrapper`}
                    labelPlacement="end"
                  >
                    <p className={`${styles.priceLabel}`}>{obj.description}</p>
                  </IonRadio>
                  <p className={`${styles.priceLabel}`}>
                    {obj.price} {venue.defaultCurrency.sign}
                  </p>
                </IonRow>
              ))}
            </IonRadioGroup>
          </div>
        ) : (
          <IonRow
            className={`ion-justify-content-between ion-align-items-center`}
          >
            <p className={`${styles.priceLabel}`}>
              {data.prices[0].description}
            </p>
            <p className={`${styles.priceLabel}`}>
              {data.prices[0].price} {venue.defaultCurrency.sign}
            </p>
          </IonRow>
        )}

        {data.customization.map((obj: any, ind: any) => {
          console.log({ obj: obj });

          return (
            <div key={ind} className={styles.optionalCard}>
              <IonRow
                className={`ion-justify-content-between ion-align-items-center`}
              >
                <h4 className={`${styles.caption} ion-no-padding`}>
                  {obj.name}
                </h4>
                <h4 className={`${styles.optional}`}>
                  {obj.isRequired ? "Required" : "Optional"}
                </h4>
              </IonRow>
              <p className={styles.msg}>Select upto {obj.maxSelectedItems}</p>
              {obj.prices.map((e: any, i: any) => (
                <IonRow
                  key={i}
                  className={`ion-justify-content-between ion-align-items-center`}
                >
                  <IonCheckbox
                    checked={e.preSelected}
                    mode="md"
                    className={styles.checkBox}
                    labelPlacement="end"
                  >
                    <p className={`${styles.priceLabel}`}>{e.name}</p>
                  </IonCheckbox>
                  <p className={`${styles.priceLabel}`}>
                    {e.price} {venue.defaultCurrency.sign}
                  </p>
                </IonRow>
              ))}
            </div>
          );
        })}

        <div className={styles.optionalCard}>
          <h4 className={`${styles.caption} ion-no-padding`}>
            Special Instructions
          </h4>
          <p className={styles.note}>
            (Please let us know if you are allergic to anything or if we need to
            avoid anything)
          </p>
          <IonTextarea
            value={comments}
            onIonInput={(e: any) => console.log("==?", e.target.value)}
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
