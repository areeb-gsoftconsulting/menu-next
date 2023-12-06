import {
  IonBadge,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import styles from "./Home.module.css";
import lightLogo from "../../assets/logoLight.png";
import darkLogo from "../../assets/logoDark.png";
import { logoIonic, heartOutline, cartOutline } from "ionicons/icons";
import { useState } from "react";
import CategorySlider from "../../components/CategorySlider";
import ItemCard from "../../components/ItemCard";
import ItemDetailsCard from "../../components/ItemDetailsCard";

const Home: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const toggleDarkModeHandler = () => {
    document.body.classList.toggle("dark");
    return document.body.classList.contains("dark")
      ? setIsDark(true)
      : setIsDark(false);
  };

  // Example usage
  console.log("Current theme:", isDark);

  return (
    <IonPage className={styles.page}>
      <IonHeader mode="ios" className={`ion-no-border`} translucent={true}>
        <IonToolbar className={`${styles.toolbar}`}>
          <IonText>
            <p className={styles.labelContainer}>Amsterdam</p>
          </IonText>

          <IonRow class="ion-justify-content-between">
            <IonImg src={isDark ? lightLogo : darkLogo} />
            {/*  */}
            <IonRow class="ion-justify-content-between ion-align-items-center">
              <IonCol size="6">
                <IonIcon
                  className={styles.heartIcon}
                  icon={heartOutline}
                ></IonIcon>
              </IonCol>
              <IonCol size="6">
                <IonBadge className={styles.badge}>11</IonBadge>
                <IonIcon
                  className={styles.cartIcon}
                  icon={cartOutline}
                ></IonIcon>
              </IonCol>
            </IonRow>
          </IonRow>

          <IonSearchbar
            mode="md"
            className={`${styles.custom} ${styles.customSearchbar} ion-no-padding`} // Applying the custom styles
            placeholder="Search"
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonTitle className={styles.menu}>Vegetarian</IonTitle>
        <CategorySlider />
        <IonList>
          <IonItem lines="none">
            <IonIcon slot="start" />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle
              slot="end"
              name="darkMode"
              onIonChange={toggleDarkModeHandler}
            />
          </IonItem>
        </IonList>

        {[1, 2, 3, 4, 5].map(() => (
          <ItemCard />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
