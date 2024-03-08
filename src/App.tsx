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
import { store, persistor } from "./store/index";
import { Provider, useDispatch, useSelector } from "react-redux";
import WelcomePage from "./pages/WelcomePage";
import { PersistGate } from "redux-persist/es/integration/react";

import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useParams,
} from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/HomePage/Home";
import { useEffect } from "react";
import { setIsDark } from "./store/slices/themeSlice";
import Scanner from "./pages/Scanner";

setupIonicReact();
const DynamicRouteComponent: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const location = useLocation();
  const dispatch = useDispatch();
  const isDark = useSelector((data: any) => data.theme.isDark);

  useEffect(() => {
    toggleDarkModeHandler("light");
    dispatch(setIsDark(false));
  }, []);

  const toggleDarkModeHandler = (mode: any) => {
    document.body.classList.toggle(mode);
    return document.body.classList.contains(mode)
      ? dispatch(setIsDark(true))
      : dispatch(setIsDark(false));
  };

  return (
    <IonRouterOutlet>
      <Route path={`/${userName}/home`} exact>
        <Home />
      </Route>
      <Route path={`/${userName}/menu`} exact>
        <Menu />
      </Route>
      <Route path={`/scanner`} exact>
        <Scanner />
      </Route>
      <Redirect
        to={`/welcome?requestedUrl=${encodeURIComponent(location.pathname)}`}
      />
      {/* Add other dynamic routes as needed */}
    </IonRouterOutlet>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
};

export default App;
