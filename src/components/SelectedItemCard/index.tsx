import { IonCheckbox, IonImg, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import DetailedAddedToCart from "../DetailedAddedToCart";
import placeholderDark from "../../assets/menuPlaceholderDark.png";
import placeholderLight from "../../assets/menuPlaceholderLight.png";
type Props = {};

const SelectedItemCard = ({ selectBulk, setSelectBulk, data }: any) => {
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

  return (
    <>
      <IonRow
        className={styles.mainRow}
        class="ion-justify-content-between ion-align-items-center"
      >
        <IonRow class="ion-justify-content-start ion-align-items-center">
          <IonCheckbox
            checked={
              selectBulk.some((item: any) => item._id === data._id) || false
            }
            onIonChange={handleCheckboxChange}
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
                : data.imageUrl
            }
          />
          <p onClick={() => setOpenDetailed(true)} className={styles.itemname}>
            {data.name}
          </p>
        </IonRow>
        {data.prices.length > 1 ? (
          <p className={styles.name}>
            from {venue.defaultCurrency.sign} {smallestPrice}
          </p>
        ) : (
          <p className={styles.name}>
            {venue.defaultCurrency.sign} {data.prices[0].price}
          </p>
        )}
      </IonRow>
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
