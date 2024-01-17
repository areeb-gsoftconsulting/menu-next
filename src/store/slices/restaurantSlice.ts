import { createSlice } from "@reduxjs/toolkit";

export interface restaurantSlice {
  venue: {};
  currentMenu: {};
}

const initialState: restaurantSlice = {
  venue: {},
  currentMenu: {},
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
      console.log("==>", action.payload);
      return {
        ...state,
        currentMenu: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVenue, setCurrentMenu } = restaurantSlice.actions;

export default restaurantSlice.reducer;
