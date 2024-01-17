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

const WelcomePage: React.FC = () => {
  const router = useIonRouter();
  const dispatch = useDispatch();
  const getVlenue = async () => {
    try {
      let res = await getVenues();

      if (res.data.statusCode == 200) {
        if (res.data.data.menus.length > 1) {
          router.push("/factor-girl-berlin/menu");
        } else {
          dispatch(setCurrentMenu(res.data.data.menus[0]));
          router.push("/factor-girl-berlin/home");
          //   router.push("/factor-girl-berlin/menu");
        }
        dispatch(setVenue(res.data.data));
      }
    } catch (error) {
      console.log({ error });
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
