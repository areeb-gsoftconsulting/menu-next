import { IonCheckbox, IonImg, IonRow, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import DetailedAddedToCart from "../DetailedAddedToCart";
import placeholderDark from "../../assets/menuPlaceholderDark.png";
import placeholderLight from "../../assets/menuPlaceholderLight.png";
import notFound from "../../assets/placeholderLight.png";

type Props = {};

const SelectedItemCard = ({
  selectBulk,
  setSelectBulk,
  data,
  setErrorItems,
  errorItems,
}: any) => {
  const venue = useSelector((data: any) => data.restaurant.venue);
  const prices = data.prices.map((item: any) => item.price);
  const smallestPrice = Math.min(...prices);
  const [openDetailed, setOpenDetailed] = useState(false);
  const isDark = useSelector((data: any) => data.theme.isDark);
  const [loadingImage, setImageLoading] = useState(true);

  const handleCheckboxChange = (event: any) => {
    if (event.detail.checked) {
      setSelectBulk([...selectBulk, data]);
    } else {
      const filteredBulk = selectBulk.filter(
        (item: any) => item._id !== data._id
      );
      console.log({ filteredBulk });
      setSelectBulk(filteredBulk);
    }
  };

  console.log(
    "========>",
    errorItems.some((item: any) => item._id === data._id)
  );

  return (
    <>
      <IonRow
        onClick={() => {
          let temp = errorItems.filter((item: any) => item._id !== data._id);
          setErrorItems(temp);
          setOpenDetailed(true);
        }}
        className={styles.mainRow}
        class="ion-justify-content-between ion-align-items-center ion-nowrap"
      >
        <IonRow class="ion-justify-content-start ion-align-items-center ion-nowrap">
          <IonCheckbox
            checked={
              selectBulk.some((item: any) => item._id === data._id) || false
            }
            onIonChange={(e) => {
              handleCheckboxChange(e);
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            mode="md"
            className={styles.checkBox}
            labelPlacement="end"
          ></IonCheckbox>
          <IonImg
            onIonImgWillLoad={() => setImageLoading(false)}
            onIonImgDidLoad={() => setImageLoading(false)}
            className={styles.img}
            src={
              loadingImage
                ? isDark
                  ? placeholderDark
                  : placeholderLight
                : data.imageUrl || notFound
            }
          />
          <p
            onClick={() => {
              let temp = errorItems.filter(
                (item: any) => item._id !== data._id
              );
              setErrorItems(temp);
              setOpenDetailed(true);
            }}
            className={styles.itemname}
          >
            {data.name}
          </p>
        </IonRow>
        {data.prices.length > 1 ? (
          <IonText class="ion-text-nowrap" className={styles.name}>
            from {venue.defaultCurrency.sign} {smallestPrice}
          </IonText>
        ) : (
          <IonText class="ion-text-nowrap" className={styles.name}>
            {venue.defaultCurrency.sign} {data.prices[0].price}
          </IonText>
        )}
      </IonRow>
      {errorItems.some((item: any) => item._id === data._id) && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p className={styles.err}>item may require customization*</p>
          <p
            className={styles.underlineErr}
            onClick={() => {
              let temp = errorItems.filter(
                (item: any) => item._id !== data._id
              );
              setErrorItems(temp);
              setOpenDetailed(true);
            }}
          >
            {" "}
            click here
          </p>
        </div>
      )}
      <div className={styles.border} />
      {openDetailed && (
        <DetailedAddedToCart
          selectDetailItem={[{ id: data._id }]}
          open={openDetailed}
          setOpen={setOpenDetailed}
        />
      )}
    </>
  );
};

export default SelectedItemCard;
