import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import { useState, useEffect } from "react";
import { isPlatform } from "@ionic/react";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { usePhotoGallery } from "../../hooks/usePhotoGallery";

const CameraPage = () => {
  const { takePhoto } = usePhotoGallery();

  //   const takePhoto = async () => {
  //     const image = await Camera.getPhoto({
  //       quality: 90,
  //       allowEditing: true,
  //       resultType: CameraResultType.Uri,
  //     });

  //     // image.webPath will contain a path that can be set as an image src.
  //     // You can access the original file using image.path, which can be
  //     // passed to the Filesystem API to read the raw data of the image,
  //     // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  //     var imageUrl = image.webPath;

  //     // Can be set to the src of an image now
  //     imageElement.src = imageUrl;
  //   };

  const checkPermissionsCamera = async () => {
    try {
      let res = await Camera.checkPermissions();
      if (res.photos == "granted") {
        takePhoto();
      } else {
        requestPermissionCamera();
      }
      console.log("1", { res });
    } catch (error) {}
  };

  const requestPermissionCamera = async () => {
    try {
      let res = await Camera.requestPermissions();
      if (res.photos == "granted") {
        takePhoto();
      } else {
        alert("some");
      }
    } catch (error) {}
  };
  useEffect(() => {
    // checkPermissionsCamera();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonText>hi</IonText>
        <IonButton onClick={takePhoto}>camera</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
