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
import { setLikedItems } from "../../store/slices/likeSlice";
import { useDispatch, useSelector } from "react-redux";

const ItemCard = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const venue = useSelector((data: any) => data.restaurant.venue);

  const dispatch = useDispatch();
  console.log({ venue });
  let categoryName = data.categories.map((obj: any) => obj.name);
  categoryName = categoryName.join(" ,");
  console.log({ categoryName });
  let desc = JSON.parse(data.description);
  desc = desc[0]?.children[0]?.text;

  return (
    <>
      <IonCard onClick={() => setIsOpen(true)} className={`${styles.card}`}>
        <IonRow className="ion-justify-content-between ion-align-items-center">
          <IonRow
            className={`ion-justify-content-between ion-align-items-center ${styles.cardName}`}
          >
            <div className={styles.outerDiv}>
              <IonThumbnail className={styles.thumbnail}>
                <img alt="Logo" src={venue?.logo} />
              </IonThumbnail>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "5px",
              }}
            >
              <IonLabel className={styles.name}>{data.name}</IonLabel>
              <IonLabel className={styles.categoryName}>
                {categoryName}
              </IonLabel>
            </div>
          </IonRow>
          {/* <IonIcon
            className={styles.moreIcon}
            icon={ellipsisHorizontal}
          ></IonIcon> */}
        </IonRow>
        <IonIcon
          onClick={(e: any) => {
            dispatch(setLikedItems({ name: "areeb" }));
            e.stopPropagation();
          }}
          className={styles.likeIcon}
          icon={heartOutline}
        />
        <IonImg className={styles.cardImg} src={data.imageUrl} />
        <div className={styles.badge}>
          <p className={styles.badgeTxt}>2</p>
        </div>

        {/* <IonRow className="ion-margin-top ion-align-items-center">
          <IonIcon className={styles.rateIcon} icon={starSharp} />
          <div
            style={{
              flexDirection: "row",
            }}
          >
            <IonText
              style={{
                fontFamily: "poppins-normal",
                color: "var(--ion-text-color)",
                marginLeft: "4px",
                fontSize: "16px",
                marginTop: "4px",
              }}
            >
              4.8
            </IonText>
            <IonText
              style={{
                fontFamily: "poppins",
                color: "var(--ion-text-color)",
                marginLeft: "4px",
                fontSize: "14px",
                marginTop: "4px",
                fontWeight: "600",
              }}
            >
              (100+)
            </IonText>
          </div>
        </IonRow> */}

        <IonText className={styles.description}>{desc}</IonText>
        <p className={styles.more}>more</p>
        {/* <IonRow className="ion-align-items-center">
          <p className={styles.time}>30 minutes ago</p>
        </IonRow> */}
      </IonCard>
      {isOpen && <ItemDetailsCard isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default ItemCard;
