import {
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import categoryImg from "../../assets/menuImg.png";
import getCategory from "../../services/getCategory";

const CategorySlider = ({ menuId }: any) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [categories, setCategories] = useState<any>([]);

  const getCategories = async () => {
    try {
      let res = await getCategory({
        menuId,
        // params: { page: pageNumber, pageSize: pageSize },
      });
      console.log({ res });
      if (res.data.statusCode == 200) {
        setCategories(res.data.data);
      }
      // dispatch(setVenue(res.data.data));
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  let x = [
    "food",
    "lunch",
    "dinner",
    "fastfood",
    "burger",
    "beer",
    "wine",
    "milk",
    "tea",
    "coffee",
  ];
  return (
    <IonToolbar className={`${styles.toolbar} ion-no-padding`}>
      <IonSegment mode="md" scroll-y="false" scrollable>
        {categories.map((obj: any, ind: any) => (
          <IonSegmentButton key={ind} color="secondary" value={obj.name}>
            <div>
              <IonImg className={styles.image} src={categoryImg} />
            </div>
            <p className={styles.name}>{obj.name}</p>
          </IonSegmentButton>
        ))}
      </IonSegment>
    </IonToolbar>
  );
};

export default CategorySlider;
