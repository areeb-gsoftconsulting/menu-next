import React, { useEffect, useRef, useState } from "react";
import { IonModal, IonContent, IonTitle, IonIcon } from "@ionic/react";
import ItemCard from "../ItemCard";
import styles from "./styles.module.css";
import { closeCircleSharp } from "ionicons/icons";
import getSingleItems from "../../services/getSingleItems";
import LoadingCard from "../../components/LoadingCard";
import DetailItemModalCard from "../DetailedItemModalCard";

function DetailedAddedToCart({ selectDetailItem, open, setOpen }: any) {
  const modal = useRef<HTMLIonModalElement>(null);
  const [item, setItem] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  console.log({ selectDetailItem });
  useEffect(() => {
    getItemDetail();
  }, [selectDetailItem]);
  const getItemDetail = async () => {
    setLoading(true);
    try {
      let res = await getSingleItems({
        params: {
          id: selectDetailItem[0].id,
        },
      });
      if (res?.data.statusCode == 200) {
        setItem([res?.data.data]);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonModal
      ref={modal}
      trigger="open-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      isOpen={open}
      onDidDismiss={() => setOpen(false)}
    >
      <IonContent>
        <div
          style={{
            padding: "0px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className={styles.title}>Customise</p>
            <IonIcon
              onClick={() => setOpen(false)}
              className={styles.cancelIcon}
              icon={closeCircleSharp}
            ></IonIcon>
          </div>

          {!loading && item.length == 0 && (
            <div className={styles.msgContainer}>
              <p className={styles.noItem}>No item selectd</p>
            </div>
          )}
          {loading && <LoadingCard />}

          {/* {item.map((data: any) => {
            data.customization.length < 1 ? (
              <ItemCard data={data} expandByDefault={true} />
            ) : (
              <DetailItemModalCard data={data} setIsOpen={setOpen} />
            );
          })} */}
          {item.map((data: any) => {
            return data.customization.length < 1 ? (
              <ItemCard
                key={data.id}
                data={data}
                expandByDefault={true}
                setCustomiseModal={setOpen}
              />
            ) : (
              <DetailItemModalCard
                setCustomiseModal={setOpen}
                key={data.id}
                data={data}
                setIsOpen={setOpen}
              />
            );
          })}
          {/* {item.map((data: any) => {
            data.customization.length < 1
              ? console.log("111111")
              : console.log("2222");
          })} */}
        </div>
      </IonContent>
    </IonModal>
  );
}

export default DetailedAddedToCart;
