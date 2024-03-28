import React, { useRef } from "react";
import {
  createAnimation,
  IonModal,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import styles from "./styles.module.css";
import cartAnimation from "../../assets/animations/cart.json";
import Lottie from "lottie-react";

function CartAnimationModal({ addedToCart }: any) {
  const modal = useRef<HTMLIonModalElement>(null);

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector("ion-backdrop")!)
      .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

    const wrapperAnimation = createAnimation()
      .addElement(root?.querySelector(".modal-wrapper")!)
      .keyframes([
        { offset: 0, opacity: "0", transform: "scale(0)" },
        { offset: 1, opacity: "0.99", transform: "scale(1)" },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing("ease-out")
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction("reverse");
  };

  return (
    <IonModal
      id="example-modal"
      ref={modal}
      isOpen={addedToCart}
      trigger="open-modal"
      enterAnimation={enterAnimation}
      leaveAnimation={leaveAnimation}
      className={styles.main}
    >
      <IonContent className={styles.ionContentClass}>
        <IonGrid
          className="ion-no-padding ion-align-items-center ion-justify-content-center"
          style={{ height: "100%" }}
        >
          <IonRow
            className="ion-align-items-center ion-justify-content-center"
            style={{ height: "100%" }}
          >
            <IonCol size="12" className="ion-text-center">
              <div
                style={{
                  height: "75px",
                  width: "75px",
                  margin: "0 auto",
                }}
              >
                <Lottie animationData={cartAnimation} loop={false} />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
}

export default CartAnimationModal;
