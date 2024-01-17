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
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../store/slices/restaurantSlice";

const CategorySlider = ({ menuId }: any) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (data: any) => data.restaurant.selectedCategory
  );
  const [categories, setCategories] = useState<any>([
    {
      _id: "1",
      name: "All",
    },
  ]);

  const getCategories = async () => {
    try {
      let res = await getCategory({
        menuId,
        // params: { page: pageNumber, pageSize: pageSize },
      });

      if (res.data.statusCode == 200) {
        setCategories([...categories, ...res.data.data]);
      }
      // dispatch(setVenue(res.data.data));
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const selectCategory = (e: any) => {
    if (e._id == "1") {
      dispatch(setSelectedCategory(e._id));
    } else {
      dispatch(setSelectedCategory(e._id));
    }
  };

  return (
    <IonToolbar className={`${styles.toolbar} ion-no-padding`}>
      <IonSegment
        value={selectedCategory}
        mode="md"
        scroll-y="false"
        scrollable
      >
        {categories.map((obj: any, ind: any) => (
          <IonSegmentButton
            onClick={() => selectCategory(obj)}
            key={ind}
            color="secondary"
            value={obj._id}
          >
            <div>
              <IonImg
                className={styles.image}
                src={obj.name == "All" ? categoryImg : obj.imageUrl}
              />
            </div>
            <p className={styles.name}>{obj.name}</p>
          </IonSegmentButton>
        ))}
      </IonSegment>
    </IonToolbar>
  );
};

export default CategorySlider;
