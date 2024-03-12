import React, { useEffect, useRef, useState } from "react";
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from "@capacitor-mlkit/barcode-scanning";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  isPlatform,
  useIonRouter,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";

import { useDispatch } from "react-redux";
import {
  setCurrentMenu,
  setRestSlug,
  setVenue,
} from "../../store/slices/restaurantSlice";
import getVenues from "../../services/getVenue";
import { useHistory } from "react-router";
import { useToast } from "../../hooks/useToast";
import styles from "./styles.module.css";
import { App } from "@capacitor/app";

const Scanner = () => {
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [failed, setFailed] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch();
  const router = useHistory();
  const navigation = useIonRouter();
  const { presentToast } = useToast();
  const [opeing, setOpening] = useState(false);

  document.addEventListener("ionBackButton", (ev) => {
    console.log("ev.target.location", ev.target.location);
    ev.detail.register(9999, () => {
      let parts = ev.target.location.pathname.split("/");
      if (parts[parts.length - 1] == "menu") {
        navigation.push("/welcome");
      } else if (parts[parts.length - 1] == "home") {
        navigation.goBack();
      } else if (parts[parts.length - 1] == "scanner") {
        document
          .querySelector("body")
          ?.classList.remove("barcode-scanner-active");
        router.goBack();
        BarcodeScanner.stopScan();
      } else if (parts[parts.length - 1] == "welcome") {
        App.exitApp();
      } else {
        App.exitApp();
      }
    });
  });

  const getVlenue = async (sanitizedUrl: any) => {
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
      setOpening(false);
      setFailed(true);
      presentToast("Please try again later");
    }
  };

  const scanSingleBarcode = async () => {
    try {
      return new Promise(async (resolve, reject) => {
        document.querySelector("body")?.classList.add("barcode-scanner-active");

        const listener = await BarcodeScanner.addListener(
          "barcodeScanned",
          async (result) => {
            try {
              await listener.remove();
              document
                .querySelector("body")
                ?.classList.remove("barcode-scanner-active");
              await BarcodeScanner.stopScan();
              resolve(result.barcode);
            } catch (error) {
              reject(error);
            }
          }
        );

        await BarcodeScanner.startScan();
      });
    } catch (error) {
      console.error("Error occurred during barcode scanning:", error);
      throw error;
    }
  };

  const checkPermissions = async () => {
    try {
      const { camera } = await BarcodeScanner.checkPermissions();
      if (
        camera == "denied" ||
        camera == "prompt" ||
        camera == "prompt-with-rationale" ||
        camera == "limited"
      ) {
        console.log("fdsa");

        requestPermissions();
      }
      console.log("camera", camera);

      if (camera == "granted") {
        console.log("granted");
        let { displayValue } = await scanSingleBarcode();

        const parts = displayValue.split("/");
        const sanitizedUrl = parts[parts.length - 1];
        getVlenue(sanitizedUrl);
      }
    } catch (error) {
      console.log("error check permission", error);
    }
  };

  const requestPermissions = async () => {
    try {
      const { camera } = await BarcodeScanner.requestPermissions();
      console.log(camera);
      if (camera == "denied" || camera == "prompt-with-rationale") {
        setPermissionDenied(true);
      }
      if (camera == "granted") {
        let { displayValue } = await scanSingleBarcode();

        const parts = displayValue.split("/");
        const sanitizedUrl = parts[parts.length - 1];
        getVlenue(sanitizedUrl);
      }
    } catch (error) {
      console.log("error requestPermissions", error);
    }
  };

  const openSettings = async () => {
    try {
      let res = await BarcodeScanner.openSettings();
      setPermissionDenied(false);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <IonPage>
      <IonContent className={styles.content} fullscreen>
        <div
          className={
            isPlatform("ios") ? "scanner-header-ios" : "scanner-header"
          }
        >
          <IonIcon
            onClick={() => {
              document
                .querySelector("body")
                ?.classList.remove("barcode-scanner-active");
              router.goBack();
              BarcodeScanner.stopScan();
            }}
            size="small"
            icon={chevronBack}
          ></IonIcon>
          <h5
            style={{
              fontFamily: "poppins-normal",
            }}
          >
            Scan QR Code
          </h5>
          <p></p>
        </div>
        <div className="scanner-overlay">
          <div className="scanner-overlay-vertical"></div>
          <div className="scanner-box">
            <div className="scanner-box-child"></div>
            <div className="scanner-box-centered-child"></div>
            <div className="scanner-box-child"></div>
          </div>
          <div className="scanner-overlay-vertical"></div>
        </div>
        {permissionDenied && (
          <div className={styles.container}>
            <div className={styles.card}>
              <IonText className={styles.msg}>
                Oops! It seems like camera permission is denied. To use this
                feature, please enable camera access in your device settings.
              </IonText>
              <div className={styles.btnsContainer}>
                <IonButton
                  size="small"
                  className={styles.cancelBtn}
                  mode="ios"
                  color={"dark"}
                  onClick={() => router.replace("/welcome")}
                >
                  Cancel
                </IonButton>
                <IonButton
                  size="small"
                  className={styles.setting}
                  mode="ios"
                  onClick={openSettings}
                >
                  Settings
                </IonButton>
              </div>
            </div>
          </div>
        )}
        {opeing && (
          <div className={styles.container}>
            <IonSpinner name="circles"></IonSpinner>
            <IonText className={styles.msg}>Loading...</IonText>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
