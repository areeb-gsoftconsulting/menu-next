import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonImg,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  IonThumbnail,
  isPlatform,
} from "@ionic/react";
import styles from "./styles.module.css";
import { IonIcon } from "@ionic/react";
import {
  ellipsisHorizontal,
  starSharp,
  heartOutline,
  add,
  remove,
} from "ionicons/icons";
import thumbnailImg from "../../assets/menuImg.png";
import ItemDetailsCard from "../ItemDetailsCard";
import { useState } from "react";
import { setLikedItems } from "../../store/slices/likeSlice";
import { useDispatch, useSelector } from "react-redux";

const ItemCard = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const venue = useSelector((data: any) => data.restaurant.venue);
  const [expanded, setExpanded] = useState(false);

  const dispatch = useDispatch();
  console.log({ data });
  let categoryName = data.categories.map((obj: any) => obj.name);
  categoryName = categoryName.join(" ,");
  console.log({ categoryName });
  let desc = JSON.parse(data.description);
  desc = desc[0]?.children[0]?.text;

  return (
    <>
      <IonCard
        onClick={() => {
          if (data.customization.length < 1) {
            setExpanded(!expanded);
          } else setIsOpen(true);
        }}
        className={`${styles.card}`}
      >
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

        {!expanded ? (
          <IonText className={styles.description}>{desc}</IonText>
        ) : (
          <IonText className={styles.descriptionExp}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
            incidunt enim soluta adipisci ad deleniti eaque, facilis quis quidem
            voluptates harum ab? Vel modi aliquam libero? Sed accusamus dolorum
            enim.
          </IonText>
        )}
        {!expanded && <p className={styles.more}>more</p>}
        {expanded && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className={styles.tagLabel}>Tags: </p>
            {data.tags.map((obj: any, ind: any) => (
              <IonChip className={styles.tags} key={ind}>
                {obj.name}
              </IonChip>
            ))}
          </div>
        )}
        {expanded && (
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
        )}
        {expanded && (
          <IonRow
            className={`ion-justify-content-evenly ion-align-items-center ion-padding-vertical`}
          >
            <IonButton className={`${styles.iconBtn} ion-no-padding`}>
              <IonIcon
                className={
                  isPlatform("ios") ? styles.icons : styles.iconsAndroid
                }
                slot="icon-only"
                icon={remove}
              ></IonIcon>
            </IonButton>
            <h3 className={styles.itemNum}>10</h3>
            {/* <IonButton className={styles.actionBtn}>+</IonButton> */}
            <IonButton className={`${styles.iconBtn} ion-no-padding`}>
              <IonIcon
                className={
                  isPlatform("ios") ? styles.icons : styles.iconsAndroid
                }
                slot="icon-only"
                icon={add}
              ></IonIcon>
            </IonButton>
            <IonButton className={styles.addBtn}>Add to Cart</IonButton>
          </IonRow>
        )}
      </IonCard>
      {isOpen && <ItemDetailsCard isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default ItemCard;
