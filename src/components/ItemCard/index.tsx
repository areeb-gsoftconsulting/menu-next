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
  heartSharp,
} from "ionicons/icons";
import placeholderDark from "../../assets/placeholderDark.png";
import placeholderLight from "../../assets/placeholderLight.png";
import ItemDetailsCard from "../ItemDetailsCard";
import { useEffect, useState } from "react";
import { setLiked, setLikedItems } from "../../store/slices/likeSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddedToCart,
  setCart,
  setCartItems,
} from "../../store/slices/cartSlice";
import ItemDescriptionContainer from "../ItemDescriptionContainer";

const ItemCard = ({ data, expandByDefault }: any) => {
  console.log({ data });
  const [isOpen, setIsOpen] = useState(false);
  const venue = useSelector((data: any) => data.restaurant.venue);
  const [expanded, setExpanded] = useState(
    !expandByDefault ? false : expandByDefault
  );
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
  console.log({ data });
  const cart = useSelector((data: any) => data.cart.items);
  const liked = useSelector((data: any) => data.like.items);
  const numberInCart = cart.filter((item: any) => item.id == data._id);
  const [count, setCount] = useState(1);
  const [loadingImage, setImageLoading] = useState(true);
  const isDark = useSelector((data: any) => data.theme.isDark);
  const currentMenu = useSelector((data: any) => data.restaurant.currentMenu);

  useEffect(() => {
    if (!expanded) {
      setRadioErr(false);
      setSelectedPrice({
        _id: "",
        description: "",
        price: "",
      });
      setCount(1);
      setRadioErr(false);
    }
  }, [expanded]);

  const addToCart = (data: any) => {
    if (data.price.description == "") {
      setRadioErr(true);
      return;
    } else {
      let tempCart = [...cart];
      let tempItemIndex = tempCart.findIndex(
        (item: any) => item.id == data.id && item.price._id == data.price._id
      );
      if (tempItemIndex == -1 && data.quantity > 0) {
        dispatch(setCartItems(data));
        setCount(1);
        setExpanded(false);
        dispatch(setAddedToCart(true));
      } else {
        let updatedItem = { ...tempCart[tempItemIndex] };
        updatedItem.quantity = updatedItem.quantity + data.quantity;

        // Check if quantity becomes zero, remove the item from the cart
        if (updatedItem.quantity === 0) {
          tempCart.splice(tempItemIndex, 1); // Remove the item from the array
        } else {
          tempCart[tempItemIndex] = updatedItem;
        }
        dispatch(setCart(tempCart));
        setCount(1);
        setExpanded(false);
        dispatch(setAddedToCart(true));
      }
    }
  };
  const isLiked = liked.findIndex((item: any) => item._id == data._id);
  const setingLiked = () => {
    const index = liked.findIndex((item: any) => item._id == data._id);

    if (index == -1) {
      dispatch(setLikedItems(data));
    } else {
      const updatedLiked = liked.filter((item: any) => item._id !== data._id);
      console.log({ updatedLiked });
      // Update Redux state with the modified array
      dispatch(setLiked(updatedLiked));
    }
  };

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
            {/* <div className={styles.outerDiv}>
              <IonThumbnail className={styles.thumbnail}>
                <img alt="Logo" src={currentMenu?.imageUrl} />
              </IonThumbnail>
            </div> */}

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
            setingLiked();
            e.stopPropagation();
          }}
          className={styles.likeIcon}
          icon={isLiked == -1 ? heartOutline : heartSharp}
        />

        {!data.inStock && (
          <div className={styles.notAvailable}>
            <p>Not Available</p>
          </div>
        )}

        <IonImg
          onIonImgWillLoad={() => setImageLoading(false)}
          onIonImgDidLoad={() => setImageLoading(false)}
          className={styles.cardImg}
          src={
            loadingImage
              ? isDark
                ? placeholderDark
                : placeholderLight
              : data.imageUrl
          }
        />

        <div className={styles.priceBadge}>
          {data.prices.length > 1 ? (
            <p>
              {venue.defaultCurrency.sign} {data.prices[0]?.price}
            </p>
          ) : (
            <p>
              {venue.defaultCurrency.sign} {data.prices[0].price}
            </p>
          )}
        </div>

        {numberInCart.length > 0 && (
          <div className={styles.badge}>
            <p className={styles.badgeTxt}>{numberInCart[0].quantity}</p>
          </div>
        )}

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
          <div style={{ paddingTop: "20px" }}>
            <ItemDescriptionContainer data={JSON.parse(data.description)} />
          </div>
        )}
        {!expanded && <p className={styles.more}>see more</p>}
        {expanded && (
          <div style={{ display: "flex", alignItems: "center" }}>
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

            {radioErr && <p className={styles.errMsg}>Please choose one</p>}

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
              <p className={`${styles.priceLabel}`}>
                {venue.defaultCurrency.sign} {data.prices[0].price}
              </p>
            </IonRow>
          )
        )}
        {expanded && (
          <IonRow
            onClick={(e) => e.stopPropagation()}
            className={`ion-justify-content-between ion-align-items-center ion-padding-vertical
            ion-nowrap
            `}
          >
            <div className={styles.btnRow}>
              <IonButton
                disabled={count < 2}
                onClick={() => {
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}
                size={isPlatform("mobile") ? "small" : "default"}
                className={`${styles.iconBtn} ion-no-padding`}
              >
                <IonIcon
                  className={
                    isPlatform("ios") ? styles.icons : styles.iconsAndroid
                  }
                  slot="icon-only"
                  icon={remove}
                ></IonIcon>
              </IonButton>
              <h3 className={styles.itemNum}>{count}</h3>
              <IonButton
                onClick={() => {
                  setCount(count + 1);
                }}
                slot="icon-only"
                size={isPlatform("mobile") ? "small" : "default"}
                className={`${styles.iconBtn} ion-no-padding`}
              >
                <IonIcon
                  className={
                    isPlatform("ios") ? styles.icons : styles.iconsAndroid
                  }
                  slot="icon-only"
                  icon={add}
                ></IonIcon>
              </IonButton>
            </div>

            <div className={styles.addBtnDiv}>
              <IonButton
                disabled={!data.inStock}
                onClick={() =>
                  addToCart({
                    id: data._id,
                    name: data.name,
                    price:
                      data.prices.length > 1 ? selectedPrice : data.prices[0],
                    customization: [],
                    comments: "",
                    image: data.imageUrl,
                    quantity: count,
                  })
                }
                size={isPlatform("mobile") ? "small" : "default"}
                className={styles.addBtn}
              >
                Add to Cart
              </IonButton>
            </div>
          </IonRow>
        )}
        {expanded && <p className={styles.more}>see less</p>}
      </IonCard>
      {isOpen && (
        <ItemDetailsCard data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default ItemCard;
