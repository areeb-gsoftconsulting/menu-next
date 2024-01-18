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
} from "@ionic/react";
import thumbnailImg from "../../assets/menuImg.png";
import { starSharp, add, remove, closeCircleSharp } from "ionicons/icons";
import { isPlatform } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../store/slices/cartSlice";
const ItemDetailsCard = ({ data, isOpen, setIsOpen }: any) => {
  const modal = useRef<HTMLIonModalElement>(null);
  let categoryName = data.categories.map((obj: any) => obj.name);
  categoryName = categoryName.join(" ,");
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

  const handleCheckBox = ({ data, maxCount = 0, title }: any) => {
    const temp = { ...selectedValue };
    let currentItemData = temp[title]?.data || [];

    const index = currentItemData.findIndex((e) => e._id === data._id);

    if (index === -1) {
      if (currentItemData.length == maxCount) {
        const updatedSelection = [...currentItemData];
        updatedSelection.pop();
        temp[title] = { data: [...updatedSelection, data] };
        setSelectedValue(temp);
        return;
      }
      temp[title] = { data: [...currentItemData, data] };
      setSelectedValue(temp);
    } else {
      const updatedSelection = [...currentItemData];
      updatedSelection.splice(index, 1);
      temp[title] = { data: [updatedSelection] };

      setSelectedValue(temp);
    }
  };
  console.log("this", selectedCustomization);

  const addToCart = (data: any) => {
    if (data.price.description == "") {
      setRadioErr(true);
      return;
    } else {
      if (data.customization > 0) {
      }
      // now i have to make condition for handling customization
      // dispatch(setCartItems(data));
    }
  };

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

            {radioErr && <p>Please choose one</p>}
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
              {obj.prices.map((e: any, i: any) => {
                useEffect(() => {
                  if (e.preSelected == true) {
                    handleCheckBox({
                      data: e,
                      maxCount: obj.maxSelectedItems,
                      title: obj.name,
                    });
                  }
                }, []);

                return (
                  <IonRow
                    key={i}
                    className={`ion-justify-content-between ion-align-items-center`}
                  >
                    <IonCheckbox
                      // checked={e.preSelected}
                      checked={
                        selectedValue[obj.name]?.data?.some(
                          (item: any) => item._id === e._id
                        ) || false
                      }
                      mode="md"
                      onIonChange={(ev: any) =>
                        handleCheckBox({
                          data: e,
                          maxCount: obj.maxSelectedItems,
                          title: obj.name,
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
          <IonButton
            onClick={() =>
              addToCart({
                id: data._id,
                name: data.name,
                price: data.prices.length > 1 ? selectedPrice : data.prices[0],
                customization: selectedCustomization,
                comments: comments,
              })
            }
            className={styles.addBtn}
          >
            Add to Cart
          </IonButton>
        </IonRow>
      </IonContent>
    </IonModal>
  );
};

export default ItemDetailsCard;
