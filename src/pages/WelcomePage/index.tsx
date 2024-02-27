import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonImg,
  IonCol,
  IonButton,
  isPlatform,
  IonSearchbar,
  IonList,
  IonItem,
  IonSpinner,
} from "@ionic/react";
import getVenues from "../../services/getVenue";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentMenu,
  setRestSlug,
  setVenue,
} from "../../store/slices/restaurantSlice";
import { useIonRouter } from "@ionic/react";
import { useLocation, useParams } from "react-router";
import { useToast } from "../../hooks/useToast";
import styles from "./styles.module.css";
import darkImg from "../../assets/welcomeImgDark.png";
import lightImg from "../../assets/welcomeImg.png";
import restNotFound from "../../assets/restNotFound.png";
import lightLogo from "../../assets/restNotFound.png";
import darkLogo from "../../assets/logoDark.png";
import getVenueSlugs from "../../services/getVenueSlugs";

const WelcomePage: React.FC = () => {
  const isDark = useSelector((data: any) => data.theme.isDark);
  const router = useIonRouter();
  const location = useLocation();
  const requestedUrl = new URLSearchParams(location.search).get("requestedUrl");
  // const sanitizedUrl = requestedUrl
  //   ? requestedUrl.replace(/^\/+|\/+$/g, "")
  //   : "";
  // console.log("Requested slug:", sanitizedUrl);
  const [sanitizedUrl, setSanitizedUrl] = useState<any>(
    requestedUrl ? requestedUrl.replace(/^\/+|\/+$/g, "") : ""
  );
  const { presentToast } = useToast();
  const [failed, setFailed] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [restaurants, setRestaurants] = useState<any>([]);
  const [searcNotFound, setSearchNotFound] = useState(false);
  const [opening, setOpening] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const getVlenue = async () => {
    dispatch(setRestSlug(sanitizedUrl));
    setOpening(true);

    try {
      let res = await getVenues(sanitizedUrl);

      if (res.data.statusCode == 200) {
        if (res.data.data.menus.length == 0) {
          setNotFound(true);

          return;
        }

        if (res.data.data.menus.length > 1) {
          router.push(`/${sanitizedUrl}/menu`);
        } else {
          dispatch(setCurrentMenu(res.data.data.menus[0]));

          router.push(`/${sanitizedUrl}/home`);
        }
        dispatch(setVenue(res.data.data));
      } else {
        setFailed(true);
      }
    } catch (error) {
      console.log({ error });
      setFailed(true);
      presentToast("Please try again later");
    }
  };

  const searchVenu = async (venueNameSearch: any) => {
    setSearchNotFound(false);
    setLoading(true);
    try {
      let res = await getVenueSlugs(venueNameSearch);
      console.log(res);
      if (res.data.statusCode == 200) {
        setRestaurants(res.data.data);
        if (res.data.data.length == 0) {
          setSearchNotFound(true);
        }
      }
    } catch (error) {
      console.log("searchVenu", error);
    } finally {
      setLoading(false);
    }
  };
  console.log({ sanitizedUrl });

  useEffect(() => {
    if (sanitizedUrl.length > 0) {
      getVlenue();
    }
  }, [sanitizedUrl]);
  return (
    <IonPage className={styles.page}>
      <IonContent className={styles.container} fullscreen>
        <IonImg className={styles.logo} src={isDark ? lightLogo : darkLogo} />
        {opening ? (
          <>
            <IonImg className={styles.img} src={isDark ? darkImg : lightImg} />
            <p className={styles.text}>Opening your restaurant</p>
          </>
        ) : (
          <>
            <IonImg className={styles.imgnotfound} src={restNotFound} />
            {failed && <h1 className={styles.error}>Error</h1>}
            {notFound && (
              <p className={styles.text}>Location not found please try again</p>
            )}
            <IonButton
              size={isPlatform("mobile") ? "small" : "default"}
              className={styles.checkoutBtn}
              expand="block"
            >
              Scan QR Code
            </IonButton>
            <h1 className={styles.or}>OR</h1>
            <IonSearchbar
              mode="md"
              className={`${styles.custom} ${styles.customSearchbar} ion-no-padding`} // Applying the custom styles
              placeholder="Search restaurant"
              debounce={1000}
              onIonInput={(e) => {
                const value = e.detail.value.trim();
                if (value !== "") {
                  searchVenu(value);
                } else {
                  setRestaurants([]);
                }
              }}
            ></IonSearchbar>
            {searcNotFound && (
              <div className={styles.box}>
                <p className={styles.text}>
                  Location not found please try again
                </p>
              </div>
            )}

            {loading && (
              <div className={styles.box}>
                <div style={{ margin: "0 auto", width: "fit-content" }}>
                  <IonSpinner name="circles"></IonSpinner>
                </div>
                <p className={styles.loading}>Loading...</p>
              </div>
            )}

            {restaurants.length > 0 && (
              <div className={styles.box}>
                <p className={styles.itemHeader}>Search results:</p>
                {restaurants.map((result: any) => (
                  <>
                    <p
                      onClick={() => setSanitizedUrl(result.slug)}
                      className={styles.item}
                    >
                      {result.slug}
                    </p>
                  </>
                ))}
              </div>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
