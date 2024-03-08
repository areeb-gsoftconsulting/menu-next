import { IonPage } from "@ionic/react";
import { useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";

const CameraPage = () => {
  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
  };

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
    checkPermissionsCamera();
  }, []);

  return <IonPage></IonPage>;
};

export default CameraPage;
