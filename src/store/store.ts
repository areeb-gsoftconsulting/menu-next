import { configureStore } from "@reduxjs/toolkit";
import likeSlice from "./slices/likeSlice";
import restaurantSlice from "./slices/restaurantSlice";
import themeSlice from "./slices/themeSlice";
import cartSlice from "./slices/cartSlice";
/*
 * combines all th existing reducers
 */
import { combineReducers } from "@reduxjs/toolkit";

const reducers = {
  like: likeSlice,
  restaurant: restaurantSlice,
  theme: themeSlice,
  cart: cartSlice,
};

// Exports

const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
