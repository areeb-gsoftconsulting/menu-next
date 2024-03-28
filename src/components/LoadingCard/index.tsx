import React from "react";
import { IonCard, IonCardHeader, IonSkeletonText } from "@ionic/react";
import { useSelector } from "react-redux";

const LoadingCard: React.FC = () => {
  const isDark = useSelector((data: any) => data.theme.isDark);

  return [1, 2, 3, 4].map(() => {
    return (
      <IonCard
        style={{
          backgroundColor: isDark ? "rgba(43, 46, 50, 1)" : "white",
        }}
      >
        <IonSkeletonText
          animated
          style={{
            width: "100%",
            height: "150px",
            backgroundColor: "var(--ion-skelton-color)",
          }}
        />
        <IonCardHeader>
          <IonSkeletonText
            animated
            style={{
              width: "50%",
              height: "20px",
              backgroundColor: "var(--ion-skelton-color)",
            }}
          />
          <IonSkeletonText
            animated
            style={{
              width: "80%",
              height: "20px",
              backgroundColor: "var(--ion-skelton-color)",
            }}
          />
        </IonCardHeader>
      </IonCard>
    );
  });
};

export default LoadingCard;
