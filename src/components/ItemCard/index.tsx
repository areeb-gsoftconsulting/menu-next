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
import { setCartItems } from "../../store/slices/cartSlice";

const ItemCard = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const venue = useSelector((data: any) => data.restaurant.venue);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  let categoryName = data.categories.map((obj: any) => obj.name);
  categoryName = categoryName.join(" ,");
  let desc = JSON.parse(data.description);
  desc = desc[0]?.children[0]?.text;
  const [selectedPrice, setSelectedPrice] = useState({
    _id: "",
    description: "",
    price: "",
  });
  const [radioErr, setRadioErr] = useState(false);
  const cart = useSelector((data: any) => data.cart.items);
  console.log({ cart });

  const addToCart = (data: any) => {
    if (data.price.description == "") {
      setRadioErr(true);
      return;
    } else {
      dispatch(setCartItems(data));
    }
    console.log("==>", data);
  };

  console.log("selectedPrice", selectedPrice, "data==", data?.prices);

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
        {expanded && data.prices.length > 1 ? (
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

            <IonRadioGroup
              allowEmptySelection={false}
              onClick={(e) => e.stopPropagation()}
              value={selectedPrice._id} // Use a unique identifier as the value
              onIonChange={(e: any) => {
                const selectedObj = data.prices.find(
                  (obj: any) => obj._id === e.detail.value
                );
                setRadioErr(false);
                setSelectedPrice({
                  _id: selectedObj._id,
                  description: selectedObj.description,
                  price: selectedObj.price,
                });
                console.log("eeeeeee", selectedObj);
              }}
            >
              {data.prices.map((obj: any, ind: any) => (
                <IonRow
                  key={ind}
                  className={`ion-justify-content-between ion-align-items-center`}
                >
                  <IonRadio
                    value={obj._id} // Use a unique identifier as the value
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

            {radioErr && <p>Please choose one</p>}

            {/* <IonRadioGroup
              allowEmptySelection={false}
              onClick={(e) => e.stopPropagation()}
              value={selectedPrice}
              onIonChange={(e: any) => {
                setSelectedPrice({
                  _id: e.target.value._id,
                  description: e.target.value.description, // Fix the typo here
                  price: e.target.value.price,
                });
                console.log("eeeeeee", e.target.value);
              }}
            >
              {data.prices.map((obj: any, ind: any) => (
                <IonRow
                  key={ind}
                  className={`ion-justify-content-between ion-align-items-center`}
                >
                  <IonRadio
                    value={obj}
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
            </IonRadioGroup> */}
          </div>
        ) : (
          expanded && (
            <IonRow
              className={`ion-justify-content-between ion-align-items-center`}
            >
              <p className={`${styles.priceLabel}`}>
                {data.prices[0].description}
              </p>
              <p className={`${styles.priceLabel}`}>{data.prices[0].price}</p>
            </IonRow>
          )
        )}
        {expanded && (
          <IonRow
            onClick={(e) => e.stopPropagation()}
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
            <IonButton
              onClick={() =>
                addToCart({
                  id: data._id,
                  name: data.name,
                  price:
                    data.prices.length > 1 ? selectedPrice : data.prices[0],
                  customization: [],
                  comments: "",
                })
              }
              className={styles.addBtn}
            >
              Add to Cart
            </IonButton>
          </IonRow>
        )}
        {expanded && <p className={styles.more}>less</p>}
      </IonCard>
      {isOpen && (
        <ItemDetailsCard data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default ItemCard;
