import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
} from "@ionic/react";
import getVenues from "../../services/getVenue";
import { useDispatch } from "react-redux";
import { setCurrentMenu, setVenue } from "../../store/slices/restaurantSlice";
import { useIonRouter } from "@ionic/react";
import { useLocation, useParams } from "react-router";
import { useToast } from "../../hooks/useToast";

const WelcomePage: React.FC = () => {
  const router = useIonRouter();
  const location = useLocation();
  const requestedUrl = new URLSearchParams(location.search).get("requestedUrl");
  const sanitizedUrl = requestedUrl
    ? requestedUrl.replace(/^\/+|\/+$/g, "")
    : "";
  console.log("Requested slug:", sanitizedUrl);
  const { presentToast } = useToast();

  const dispatch = useDispatch();
  const getVlenue = async () => {
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
      }
    } catch (error) {
      console.log({ error });
      presentToast("Please try again later");
    }
  };

  useEffect(() => {
    getVlenue();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to Menu Next</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Please enter your menu address</h2>
          <p>eg www.menu-next.com/your-restaurant-name</p>
          <p>or scan your QR code to directly open it</p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
