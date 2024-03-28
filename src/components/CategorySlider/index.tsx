import {
  IonImg,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import getCategory from "../../services/getCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setSelectedCategory,
} from "../../store/slices/categorySlice";
import { useToast } from "../../hooks/useToast";
import { setSearchedItemName } from "../../store/slices/searchSlice";

const CategorySlider = ({ menuId }: any) => {
  const [loadingImage, setImageLoading] = useState(true);
  const { presentToast } = useToast();
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (data: any) => data.category.selectedCategory
  );
  const currentMenu = useSelector((data: any) => data.restaurant.currentMenu);
  const categories = useSelector((data: any) => data.category.categories);

  const getCategories = async () => {
    try {
      let res = await getCategory({
        menuId,
      });

      if (res.data.statusCode == 200) {
        dispatch(setCategories([...categories, ...res.data.data]));
      }
    } catch (error) {
      console.log({ error });
      presentToast("Please try again later");
    }
  };

  useEffect(() => {
    if (categories.length <= 1) {
      getCategories();
    }
  }, []);

  const selectCategory = (e: any) => {
    dispatch(setSearchedItemName(""));
    if (e._id == "1") {
      dispatch(setSelectedCategory([e._id]));
      return;
    }
    if (selectedCategory.includes(e._id)) {
      let tempSeleted = selectedCategory.filter((data: any) => data !== e._id);
      let updatedCategories = tempSeleted.filter((data) => data !== "1");
      if (updatedCategories.length == 0) {
        dispatch(setSelectedCategory(["1"]));
      } else dispatch(setSelectedCategory(updatedCategories));
    } else {
      let updatedCategories = selectedCategory.filter((data) => data !== "1");
      dispatch(setSelectedCategory([e._id, ...updatedCategories]));
    }
  };

  return (
    <IonToolbar className={`${styles.toolbar} ion-no-padding`}>
      <IonSegment
        swipeGesture={true}
        value={selectedCategory}
        mode="md"
        scroll-y="false"
        scrollable
      >
        {categories.map((obj: any, ind: any) => (
          <>
            <IonSegmentButton
              onClick={() => selectCategory(obj)}
              key={ind}
              color="secondary"
              value={obj._id}
            >
              <div
                className={
                  loadingImage
                    ? styles.uncheckedCat
                    : selectedCategory.includes(obj._id)
                    ? styles.checkedCat
                    : styles.uncheckedCat
                }
              >
                <IonSkeletonText
                  animated
                  style={{
                    display: !loadingImage ? "none" : "block",
                    paddingTop: loadingImage ? "100%" : "0px",
                  }}
                  className={styles.loadingCard}
                />
                <IonImg
                  onIonImgDidLoad={() => setImageLoading(false)}
                  className={styles.image}
                  style={{
                    height: loadingImage ? "0px" : "63px",
                    opacity: loadingImage ? 0 : 1,
                  }}
                  src={obj.name == "All" ? currentMenu.imageUrl : obj.imageUrl}
                />
              </div>
            </IonSegmentButton>
            <p className={styles.name}>{obj.name}</p>
          </>
        ))}
      </IonSegment>
    </IonToolbar>
  );
};

export default CategorySlider;
