import { createSlice } from "@reduxjs/toolkit";

export interface restaurantSlice {
  venue: {};
}

const initialState: restaurantSlice = {
  venue: {},
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
  },
});

// Action creators are generated for each case reducer function
export const { setVenue } = restaurantSlice.actions;

export default restaurantSlice.reducer;
