// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "@ionic/storage";
import rootReducers from "./store";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const init = () => {
  const store = new Storage();
  store.create();
  return store;
};
const customStorage = {
  getItem: async (key: any) => {
    console.log("this====>", this);

    let store = init();

    const value = await store.get(key);
    return value;
  },
  setItem: async (key, value) => {
    let store = init();

    await store.set(key, value);
  },
  removeItem: async (key) => {
    let store = init();

    await store.remove({ key });
  },
};

const config = {
  key: "root",
  storage: customStorage,
  blacklist: ["category"],
  debug: true, //to get useful logging
};
const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

// if (__DEV__) {
//  middleware.push(createLogger());
// }

const reducers = persistReducer(config, rootReducers);
const enhancers = [...middleware];
const persistConfig: any = { enhancers };

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store, persistConfig);
