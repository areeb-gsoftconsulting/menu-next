import { createSlice } from "@reduxjs/toolkit";

export interface restaurantSlice {
  venue: {};
  currentMenu: {};
  selectedCategory: string;
  restSlug: string;
}

const initialState: restaurantSlice = {
  venue: {},
  currentMenu: {},
  selectedCategory: "1",
  restSlug: "",
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setVenue: (state: any, action: any) => {
      return {
        ...state,
        venue: action.payload,
      };
    },
    setCurrentMenu: (state: any, action: any) => {
      return {
        ...state,
        currentMenu: action.payload,
      };
    },
    setSelectedCategory: (state: any, action: any) => {
      return {
        ...state,
        selectedCategory: action.payload,
      };
    },
    setRestSlug: (state: any, action: any) => {
      return {
        ...state,
        restSlug: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVenue, setCurrentMenu, setSelectedCategory, setRestSlug } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;
