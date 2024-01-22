/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Menu from "./pages/MenuPage";
import { store } from "./store/store";
import { Provider } from "react-redux";
import WelcomePage from "./pages/WelcomePage";

import { Redirect, Route, Switch, useParams } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/HomePage/Home";

setupIonicReact();
const DynamicRouteComponent: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();

  return (
    <IonRouterOutlet>
      <Route path={`/${userName}/home`} exact>
        <Home />
      </Route>
      <Route path={`/${userName}/menu`} exact>
        <Menu />
      </Route>
      <Redirect to="/welcome" />
      {/* Add other dynamic routes as needed */}
    </IonRouterOutlet>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <Switch>
            <Route path="/welcome" exact>
              <WelcomePage />
            </Route>
            <Route path="/:userName">
              <DynamicRouteComponent />
            </Route>
            <Redirect from="/" to="/welcome" exact />
          </Switch>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
