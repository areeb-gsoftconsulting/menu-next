import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonImg,
  IonLabel,
  IonRow,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import styles from "./styles.module.css";
import { IonIcon } from "@ionic/react";
import { ellipsisHorizontal, starSharp, heartOutline } from "ionicons/icons";
import thumbnailImg from "../../assets/menuImg.png";
import ItemDetailsCard from "../ItemDetailsCard";
import { useState } from "react";

const ItemCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IonCard onClick={() => setIsOpen(true)} className={styles.card}>
        <IonRow className="ion-justify-content-between ion-align-items-center">
          <IonRow
            className={`ion-justify-content-between ion-align-items-center ${styles.cardName}`}
          >
            <IonThumbnail className={styles.thumbnail}>
              <img
                alt="Silhouette of mountains"
                src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
              />
            </IonThumbnail>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "5px",
              }}
            >
              <IonLabel className={styles.name}>Falafel</IonLabel>
              <IonLabel className={styles.categoryName}>hoo</IonLabel>
            </div>
          </IonRow>
          <IonIcon
            className={styles.moreIcon}
            icon={ellipsisHorizontal}
          ></IonIcon>
        </IonRow>
        <IonIcon className={styles.likeIcon} icon={heartOutline} />

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
        <br />
        <IonRow className="ion-margin-top ion-align-items-center">
          <IonText
            style={{
              fontFamily: "poppins",
            }}
          >
            30 minutes ago
          </IonText>
        </IonRow>
      </IonCard>
      {isOpen && <ItemDetailsCard isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default ItemCard;
