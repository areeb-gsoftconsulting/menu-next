import { createSlice } from "@reduxjs/toolkit";

export interface cartState {
  items: [];
}

const initialState: cartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItems: (state: any, action: any) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    setCart: (state: any, action: any) => {
      return {
        ...state,
        items: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCartItems, setCart } = cartSlice.actions;

export default cartSlice.reducer;
