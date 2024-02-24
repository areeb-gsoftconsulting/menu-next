import { configureStore } from "@reduxjs/toolkit";
import likeSlice from "./slices/likeSlice";
import restaurantSlice from "./slices/restaurantSlice";
import themeSlice from "./slices/themeSlice";
import cartSlice from "./slices/cartSlice";
/*
 * combines all th existing reducers
 */
import { combineReducers } from "@reduxjs/toolkit";
import categorySlice from "./slices/categorySlice";
import searchSlice from "./slices/searchSlice";

const reducers = {
  like: likeSlice,
  restaurant: restaurantSlice,
  theme: themeSlice,
  cart: cartSlice,
  category: categorySlice,
  search: searchSlice,
};

// Exports

const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
