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

const WelcomePage: React.FC = () => {
  const isDark = useSelector((data: any) => data.theme.isDark);
  const router = useIonRouter();
  const location = useLocation();
  const requestedUrl = new URLSearchParams(location.search).get("requestedUrl");
  const sanitizedUrl = requestedUrl
    ? requestedUrl.replace(/^\/+|\/+$/g, "")
    : "";
  console.log("Requested slug:", sanitizedUrl);
  const { presentToast } = useToast();
  const [failed, setFailed] = useState(false);

  const dispatch = useDispatch();
  const getVlenue = async () => {
    dispatch(setRestSlug(sanitizedUrl));

    try {
      let res = await getVenues(sanitizedUrl);

      if (res.data.statusCode == 200) {
        if (res.data.data.menus.length > 1) {
          router.push(`/${sanitizedUrl}/menu`);
        } else {
          dispatch(setCurrentMenu(res.data.data.menus[0]));
          // router.push("/factory-girl-berlin/home");
          // router.push("/factor-girl-berlin/menu");
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

  useEffect(() => {
    getVlenue();
  }, []);
  return (
    <IonPage className={styles.page}>
      <IonContent className={styles.container} fullscreen>
        <IonImg className={styles.img} src={isDark ? darkImg : lightImg} />
        {!failed ? (
          <IonText className={styles.text}>
            Opening your restaurant menu
          </IonText>
        ) : (
          <IonCol>
            <IonText className={styles.text}>
              Oops...!!!
              <br />
              No restaurant was found on menunext.com/{sanitizedUrl}. It's
              possible that there might be a spelling error. Please double-check
              the URL and try again. If you're still having trouble, ensure that
              the restaurant is listed on our platform. Thank you for using
              MenuNext!
            </IonText>
            <IonButton href="/factory-girl-berlin/home">Dummy</IonButton>
          </IonCol>
        )}
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
