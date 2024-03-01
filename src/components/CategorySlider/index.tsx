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
import {
  setCategories,
  setSelectedCategory,
} from "../../store/slices/categorySlice";
import { useToast } from "../../hooks/useToast";
import placeholderDark from "../../assets/placeholderDark.png";
import placeholderLight from "../../assets/placeholderLight.png";
import { setSearchedItemName } from "../../store/slices/searchSlice";

const CategorySlider = ({ menuId }: any) => {
  const isDark = useSelector((data: any) => data.theme.isDark);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [loadingImage, setImageLoading] = useState(true);
  const { presentToast } = useToast();
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (data: any) => data.category.selectedCategory
  );

  console.log("====>loadingImage", { loadingImage });
  // const [categories, setCategories] = useState<any>([
  //   {
  //     _id: "1",
  //     name: "All",
  //   },
  // ]);
  const categories = useSelector((data: any) => data.category.categories);

  const getCategories = async () => {
    try {
      let res = await getCategory({
        menuId,
        // params: { page: pageNumber, pageSize: pageSize },
      });

      if (res.data.statusCode == 200) {
        dispatch(setCategories([...categories, ...res.data.data]));
      }
      // dispatch(setVenue(res.data.data));
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

  // const onSelect = (id: any) => {
  //   if (selectedChannel.includes(id)) {
  //     let tempSeleted = selectedChannel.filter((data: any) => data !== id);
  //     dispatch(
  //       selectedChannelAction.getSelectedChannels({
  //         channel: tempSeleted,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       selectedChannelAction.getSelectedChannels({
  //         channel: [id, ...selectedChannel],
  //       })
  //     );
  //   }
  // };

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
  console.log("testing baahiir", selectedCategory);

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
                  selectedCategory.includes(obj._id)
                    ? styles.checkedCat
                    : styles.uncheckedCat
                }
              >
                <IonImg
                  onIonImgWillLoad={() => setImageLoading(false)}
                  onIonImgDidLoad={() => setImageLoading(false)}
                  className={styles.image}
                  // src={obj.name == "All" ? categoryImg : obj.imageUrl}
                  src={
                    loadingImage
                      ? isDark
                        ? placeholderDark
                        : placeholderLight
                      : obj.name == "All"
                      ? categoryImg
                      : obj.imageUrl
                  }
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
