import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const toggleDarkModeHandler = () => document.body.classList.toggle("dark");

  return (
    <IonPage className={styles.page}>
      <IonHeader className={`ion-no-border ${styles.header}`}>
        <IonToolbar className={`${styles.toolbar}`}>
          <IonText>
            <p className={styles.labelContainer}>Amsterdam</p>
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank Application</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
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
      </IonContent>
    </IonPage>
  );
};

export default Home;
