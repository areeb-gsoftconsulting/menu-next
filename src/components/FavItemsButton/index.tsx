import React from "react";
import styles from "./styles.module.css";
import { IonImg } from "@ionic/react";
import favImg from "../../assets/menuImg.png";
import { useSelector } from "react-redux";
const FavItemsButton = () => {
  const items = useSelector((data: any) => data.like.items);
  console.log({ items });
  return (
    <>
      {items.length == 1 ? (
        <div className={styles.btn}>
          <IonImg className={styles.img} src={favImg} />
        </div>
      ) : items.length == 2 ? (
        <>
          <div className={styles.btnOne}>
            <IonImg className={styles.img} src={favImg} />
          </div>
          <div className={styles.btn}>
            <IonImg className={styles.img} src={favImg} />
          </div>
        </>
      ) : items.length == 3 ? (
        <>
          <div className={styles.btntwo}>
            <IonImg className={styles.img} src={favImg} />
          </div>
          <div className={styles.btnOne}>
            <IonImg className={styles.img} src={favImg} />
          </div>
          <div className={styles.btn}>
            <IonImg className={styles.img} src={favImg} />
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default FavItemsButton;
