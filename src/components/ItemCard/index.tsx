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
      <IonCard onClick={() => setIsOpen(true)} className={`${styles.card}`}>
        <IonRow className="ion-justify-content-between ion-align-items-center">
          <IonRow
            className={`ion-justify-content-between ion-align-items-center ${styles.cardName}`}
          >
            <div className={styles.outerDiv}>
              <IonThumbnail className={styles.thumbnail}>
                <img
                  alt="Silhouette of mountains"
                  src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                />
              </IonThumbnail>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "5px",
              }}
            >
              <IonLabel className={styles.name}>Falafel</IonLabel>
              <IonLabel className={styles.categoryName}>Food</IonLabel>
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
              fontFamily: "poppins-normal",
              color: "var(--ion-text-color)",
              marginLeft: "4px",
            }}
          >
            4.8
          </IonText>
        </IonRow>

        <IonText className={styles.description}>
          Lorem ipsum dolor quis sit, amet consectetur adipisicing elit. Nulla
          soluta deserunt sapiente corrupti? Ipsa optio quam illum atque animi
          impedit, adipisci quos voluptate sequi vitae praesentium ullam minus
          inventore quis.
        </IonText>
        <p className={styles.more}>more</p>
        <IonRow className="ion-align-items-center">
          <p className={styles.time}>30 minutes ago</p>
        </IonRow>
      </IonCard>
      {isOpen && <ItemDetailsCard isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default ItemCard;
