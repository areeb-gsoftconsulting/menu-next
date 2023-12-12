import React from "react";
import styles from "./styles.module.css";
import { IonImg } from "@ionic/react";
import favImg from "../../assets/menuImg.png";
import { useSelector } from "react-redux";
const FavItemsButton = ({ setOpenFav }: any) => {
  const items = useSelector((data: any) => data.like.items);
  console.log({ items });
  return (
    <>
      {items.length == 0 ? null : items.length == 1 ? (
        <div onClick={() => setOpenFav(true)} className={styles.btn}>
          <IonImg className={styles.img} src={favImg} />
        </div>
      ) : items.length == 2 ? (
        <div onClick={() => setOpenFav(true)}>
          <div className={styles.btnOne}>
            <IonImg className={styles.img} src={favImg} />
          </div>
          <div className={styles.btn}>
            <IonImg className={styles.img} src={favImg} />
          </div>
        </div>
      ) : items.length == 3 ? (
        <div onClick={() => setOpenFav(true)}>
          <div className={styles.btntwo}>
            <IonImg className={styles.img} src={favImg} />
          </div>
          <div className={styles.btnOne}>
            <IonImg className={styles.img} src={favImg} />
          </div>
          <div className={styles.btn}>
            <IonImg className={styles.img} src={favImg} />
          </div>
        </div>
      ) : (
        <div onClick={() => setOpenFav(true)}>
          <div className={styles.btnthree}>
            <IonImg className={styles.img} src={favImg} />
          </div>
          <div className={styles.btntwo}>
            <IonImg className={styles.img} src={favImg} />
          </div>
          <div className={styles.btnOne}>
            <IonImg className={styles.img} src={favImg} />
          </div>
          <div className={styles.txtBtn}>
            <p>{items.length - 3}+</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FavItemsButton;
