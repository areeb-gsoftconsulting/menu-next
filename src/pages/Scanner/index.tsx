import React, { useEffect, useState } from "react";
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from "@capacitor-mlkit/barcode-scanning";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useDispatch } from "react-redux";
import {
  setCurrentMenu,
  setRestSlug,
  setVenue,
} from "../../store/slices/restaurantSlice";
import getVenues from "../../services/getVenue";
import { useHistory } from "react-router";
import { useToast } from "../../hooks/useToast";

const Scanner = () => {
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [failed, setFailed] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch();
  const router = useHistory();
  const { presentToast } = useToast();

  const getVlenue = async (sanitizedUrl: any) => {
    dispatch(setRestSlug(sanitizedUrl));

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
      setFailed(true);
      presentToast("Please try again later");
    }
  };

  const scanSingleBarcode = async () => {
    return new Promise(async (resolve) => {
      document.querySelector("body")?.classList.add("barcode-scanner-active");

      const listener = await BarcodeScanner.addListener(
        "barcodeScanned",
        async (result) => {
          await listener.remove();
          document
            .querySelector("body")
            ?.classList.remove("barcode-scanner-active");
          await BarcodeScanner.stopScan();
          resolve(result.barcode);
        }
      );

      await BarcodeScanner.startScan();
    });
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
        requestPermissions();
      }
      if (camera == "granted") {
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
      <IonContent fullscreen>
        {permissionDenied && (
          <div>
            <h4>
              Please open settings and allow MenuNext camera permissions or
              search your restaurant by search
            </h4>
            <IonButton onClick={openSettings}>Settings</IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Scanner;
