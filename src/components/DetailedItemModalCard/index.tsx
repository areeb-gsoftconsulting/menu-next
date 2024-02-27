import React, { useEffect, useRef, useState } from "react";
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
  IonChip,
  IonToolbar,
} from "@ionic/react";
import thumbnailImg from "../../assets/menuImg.png";
import { starSharp, add, remove, closeCircleSharp } from "ionicons/icons";
import { isPlatform } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddedToCart,
  setCart,
  setCartItems,
} from "../../store/slices/cartSlice";
import ItemDescriptionContainer from "../ItemDescriptionContainer";
import placeholderDark from "../../assets/placeholderDark.png";
import placeholderLight from "../../assets/placeholderLight.png";

type Props = {};

const DetailItemModalCard = ({ data, isOpen, setIsOpen }: any) => {
  let categoryName = data.categories.map((obj: any) => obj.name);
  categoryName = categoryName.join(" ,");
  const isDark = useSelector((data: any) => data.theme.isDark);
  const venue = useSelector((data: any) => data.restaurant.venue);
  const [comments, setComments] = useState("");
  const [selectedPrice, setSelectedPrice] = useState({
    _id: "",
    description: "",
    price: "",
  });
  const [radioErr, setRadioErr] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((data: any) => data.cart.items);
  const [customizationErr, setcustomizationErr] = useState([]);
  const [selectedCustomization, setSelectedCustomization] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState<any>({});
  console.log("selectedCustomization", selectedCustomization);
  const [requiredCustoms, setRequiredCustome] = useState([]);
  const [count, setCount] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [loadingImage, setImageLoading] = useState(true);
  console.log({ data: data.tags });
  const handle1 = (data: any) => {
    console.log("selectedCustomization === ", data);
    // let tempArr = selectedCustomization;
    // tempArr.push(data);
    // setSelectedCustomization(tempArr);
  };

  useEffect(() => {
    const tempPreSelected: any = [];
    if (Array.isArray(data.customization)) {
      data.customization.forEach((c: any) => {
        const prices = c.prices;
        if (Array.isArray(c.prices)) {
          c.prices.forEach((price: any) => {
            if (price.preSelected) {
              tempPreSelected.push(price);
            }
          });
        }
      });
    }

    setSelectedCustomization(tempPreSelected);
  }, [data]);

  const handleCheckBox = ({ data, parent }: any) => {
    //that object
    // its parent
    //yhn sy rule nikalo
    //phly us object ko array me rkhwao
    //ab doora object aya
    //phly check kro parent
    //agr same hy to rule check kro
    //agr add ho skta hy to id check kr k add ya remove krwao
    //agr add ni ho skta according to rule
    //to parent ki array sy check kr k existing remove krwa do or new add krdo
    //agr parent diffrent hy to simly add kra do

    const maxCount = parent.maxSelectedItems;
    const index = selectedCustomization.findIndex((e) => e._id === data._id);
    let commonItems = selectedCustomization.filter((customizationItem) =>
      parent.prices.some((priceItem) => priceItem._id === customizationItem._id)
    );

    if (index === -1) {
      if (maxCount > commonItems.length) {
        //yhn check krna hy k rule kitna hy
        //phir parent ki prices ki array k sath check krna hy k iski koi item phly added to nhi?
        //agr added hy to usko remove krwa k new add krwani hy

        console.log("selectedCustomization === ", selectedCustomization);
        let tempArr = selectedCustomization;
        tempArr.push(data);
        setSelectedCustomization(tempArr);
        return;
      } else {
        let item = commonItems.shift();
        let filtered = selectedCustomization.filter(
          (data) => data._id !== item._id
        );
        setSelectedCustomization([...filtered, data]);
        return;
      }
    } else {
      let remaining = selectedCustomization.filter(
        (item: any) => item._id !== data._id
      );
      setSelectedCustomization(remaining);
    }
  };

  // const handleCheckBox = ({ data, maxCount = 0, title }: any) => {
  //   const temp = { ...selectedValue };
  //   let currentItemData = temp[title]?.data || [];

  //   const index = currentItemData.findIndex((e) => e._id === data._id);

  //   if (index === -1) {
  //     if (currentItemData.length == maxCount) {
  //       const updatedSelection = [...currentItemData];
  //       updatedSelection.pop();
  //       temp[title] = { data: [...updatedSelection, data] };
  //       setSelectedValue(temp);
  //       return;
  //     }
  //     temp[title] = { data: [...currentItemData, data] };
  //     setSelectedValue(temp);
  //   } else {
  //     const updatedSelection = [...currentItemData];
  //     updatedSelection.splice(index, 1);
  //     temp[title] = { data: [updatedSelection] };

  //     setSelectedValue(temp);
  //   }
  // };

  const addToCart = (param: any) => {
    let refArray = data.customization;
    let requiredCustoms = refArray.filter((obj: any) => obj.isRequired == true);

    let unselectedCustoms = requiredCustoms.filter((custom) => {
      return !custom.prices.some((price) => {
        return selectedCustomization.some(
          (selected) => selected._id === price._id
        );
      });
    });

    setRequiredCustome(unselectedCustoms);

    console.log({ unselectedCustoms });

    if (param.price.description == "") {
      setRadioErr(true);
      return;
    }
    if (unselectedCustoms.length > 0) {
      return;
    }

    function arraysEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false;
      }

      for (let i = 0; i < arr1.length; i++) {
        if (!objectsEqual(arr1[i], arr2[i])) {
          return false;
        }
      }

      return true;
    }

    // Function to compare objects
    function objectsEqual(obj1, obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }

      return true;
    }

    // /////////////
    let tempCart = [...cart];
    let tempItemIndex = tempCart.findIndex(
      (item: any) =>
        item.id == param.id &&
        item.price._id == param.price._id &&
        arraysEqual(item.customization, param.customization)
    );
    if (tempItemIndex == -1 && param.quantity > 0) {
      dispatch(setCartItems(param));
      setCount(1);
      setIsOpen(false);
      dispatch(setAddedToCart(true));
    } else {
      let updatedItem = { ...tempCart[tempItemIndex] };
      updatedItem.quantity = updatedItem.quantity + param.quantity;

      // Check if quantity becomes zero, remove the item from the cart
      if (updatedItem.quantity === 0) {
        tempCart.splice(tempItemIndex, 1); // Remove the item from the array
      } else {
        tempCart[tempItemIndex] = updatedItem;
      }

      dispatch(setCart(tempCart));
      setCount(1);
      setIsOpen(false);
      dispatch(setAddedToCart(true));
    }
  };
  console.log("this==>", data.description.length);
  let description =
    data.description.length > 190
      ? JSON.parse(data.description)
      : data.description;

  const prices = data.prices.map((item: any) => item.price);
  const smallestPrice = Math.min(...prices);

  return (
    <div>
      {!data.inStock && (
        <div className={styles.notAvailable}>
          <p>Not Available</p>
        </div>
      )}
      <IonImg
        onIonImgWillLoad={() => setImageLoading(false)}
        onIonImgDidLoad={() => setImageLoading(false)}
        className={isPlatform("ios") ? styles.cardImg : styles.cardImgAndroid}
        src={
          loadingImage
            ? isDark
              ? placeholderDark
              : placeholderLight
            : data.imageUrl
        }
      />
      {/* <div className={styles.priceBadge}>
        {data.prices.length > 1 ? (
          <p>
            {venue.defaultCurrency.sign} {data.prices[0]?.price}
          </p>
        ) : (
          <p>
            {venue.defaultCurrency.sign} {data.prices[0].price}
          </p>
        )}
      </div> */}
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
        <IonRow className="ion-justify-content-between ion-no-wrap ion-align-items-baseline">
          <IonLabel className={styles.name}>{data.name}</IonLabel>
          {/* <IonLabel className={styles.price}>$4.5</IonLabel> */}
          {data.prices.length > 1 ? (
            <IonLabel class="ion-text-nowrap" className={styles.price}>
              from {venue.defaultCurrency.sign} {smallestPrice}
            </IonLabel>
          ) : (
            <IonLabel className={styles.price}>
              {venue.defaultCurrency.sign} {data.prices[0].price}
            </IonLabel>
          )}
        </IonRow>
        <IonLabel className={styles.categoryName}>{categoryName}</IonLabel>
      </div>

      {/* <IonText className={styles.description}>{data.description}</IonText> */}
      {!loadMore && data.description.length > 190 ? (
        <div style={{ paddingTop: "4px", paddingBottom: "4px" }}>
          <ItemDescriptionContainer data={[description[0]]} />
        </div>
      ) : loadMore && data.description.length > 190 ? (
        <div style={{ paddingTop: "4px", paddingBottom: "4px" }}>
          <ItemDescriptionContainer data={JSON.parse(data.description)} />
        </div>
      ) : (
        <div style={{ paddingTop: "4px", paddingBottom: "4px" }}>
          <ItemDescriptionContainer data={JSON.parse(data.description)} />
        </div>
      )}
      {/* <ItemDescriptionContainer data={data.description} /> */}
      {data.description.length > 190 && (
        <p
          style={{
            color: "red",

            fontFamily: "poppins",
          }}
          onClick={() => setLoadMore(!loadMore)}
        >
          {loadMore ? "see less" : "see more"}
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center" }}>
        {data.tags.map((obj: any, ind: any) => (
          <IonChip
            style={{ backgroundColor: obj.colorCode ? obj.colorCode : "red" }}
            className={`${styles.tags}`}
            key={ind}
          >
            {obj.name}
          </IonChip>
        ))}
      </div>

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

          {radioErr && <p className={styles.err}>Please choose one</p>}
        </div>
      ) : (
        <IonRow
          className={`ion-justify-content-between ion-align-items-center`}
        >
          <p className={`${styles.priceLabel}`}>{data.prices[0].description}</p>
          <p className={`${styles.priceLabel}`}>
            {data.prices[0].price} {venue.defaultCurrency.sign}
          </p>
        </IonRow>
      )}

      {data.customization.map((obj: any, ind: any) => {
        console.log({ obj: obj });

        let err = requiredCustoms.filter((item: any) =>
          item._id == obj._id ? true : false
        );
        console.log({ err }, ind);
        return (
          <div key={ind} className={styles.optionalCard}>
            <IonRow
              className={`ion-justify-content-between ion-align-items-center`}
            >
              <h4 className={`${styles.caption} ion-no-padding`}>{obj.name}</h4>
              <h4 className={`${styles.optional}`}>
                {obj.isRequired ? "Required" : "Optional"}
              </h4>
            </IonRow>
            <p className={styles.msg}>Select upto {obj.maxSelectedItems}</p>

            {obj.prices.map((e: any, i: any) => {
              handle1(e);
              // useEffect(() => {
              //   if (e.preSelected == true) {
              //     handleCheckBox({
              //       data: e,
              //       parent: obj,
              //     });
              //   }
              // }, []);

              //poori

              return (
                <IonRow
                  key={i}
                  className={`ion-justify-content-between ion-align-items-center`}
                >
                  <IonCheckbox
                    // checked={e.preSelected}
                    checked={
                      selectedCustomization.some(
                        (item: any) => item._id === e._id
                      ) || false
                    }
                    mode="md"
                    onIonChange={(ev: any) =>
                      handleCheckBox({
                        data: e,
                        parent: obj,
                      })
                    }
                    className={styles.checkBox}
                    labelPlacement="end"
                  >
                    <p className={`${styles.priceLabel}`}>{e.name}</p>
                  </IonCheckbox>
                  <p className={`${styles.priceLabel}`}>
                    {e.price} {venue.defaultCurrency.sign}
                  </p>
                </IonRow>
              );
            })}
            {err.length > 0 ? (
              <p className={styles.err}>This is a required customization</p>
            ) : null}
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
          onIonInput={(e: any) => setComments(e.target.value)}
          mode="md"
          className={styles.textarea}
          placeholder="eg. no mayo"
          autoGrow={true}
          rows={4}
          fill="outline"
        ></IonTextarea>
      </div>
      <IonRow
        className={`ion-justify-content-between ion-align-items-center ion-padding-vertical
        ion-nowrap
        `}
      >
        <div className={styles.btnRow}>
          <IonButton
            disabled={count < 2}
            onClick={() => {
              if (count > 1) setCount(count - 1);
            }}
            className={`${
              isPlatform("mobile") ? styles.iconBtn : styles.iconBtnWeb
            } ion-no-padding`}
            size={isPlatform("mobile") ? "small" : "default"}
          >
            <IonIcon
              className={
                isPlatform("ios")
                  ? styles.icons
                  : isPlatform("mobileweb")
                  ? styles.iconsAndroid
                  : styles.iconsWeb
              }
              slot="icon-only"
              icon={remove}
            ></IonIcon>
          </IonButton>
          <h3 className={styles.itemNum}>{count}</h3>
          <IonButton
            size={isPlatform("mobile") ? "small" : "default"}
            onClick={() => {
              setCount(count + 1);
            }}
            className={`${
              isPlatform("mobile") ? styles.iconBtn : styles.iconBtnWeb
            } ion-no-padding`}
          >
            <IonIcon
              className={
                isPlatform("ios")
                  ? styles.icons
                  : isPlatform("mobileweb")
                  ? styles.iconsAndroid
                  : styles.iconsWeb
              }
              slot="icon-only"
              icon={add}
            ></IonIcon>
          </IonButton>
        </div>

        <div className={styles.addBtnDiv}>
          <IonButton
            size={isPlatform("mobile") ? "small" : "default"}
            disabled={
              (data.prices.length > 1 && selectedPrice._id == "") ||
              !data.inStock
            }
            onClick={() =>
              addToCart({
                id: data._id,
                name: data.name,
                price: data.prices.length > 1 ? selectedPrice : data.prices[0],
                customization: selectedCustomization,
                comments: comments,
                image: data.imageUrl,
                quantity: count,
              })
            }
            className={styles.addBtn}
          >
            Add to Cart
          </IonButton>
        </div>
      </IonRow>
    </div>
  );
};

export default DetailItemModalCard;
