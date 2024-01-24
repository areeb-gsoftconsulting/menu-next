import { createSlice } from "@reduxjs/toolkit";

export interface cartState {
  items: [];
  addedToCart: boolean;
}

const initialState: cartState = {
  items: [],
  addedToCart: false,
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
    setAddedToCart: (state: any, action: any) => {
      return {
        ...state,
        addedToCart: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCartItems, setCart, setAddedToCart } = cartSlice.actions;

export default cartSlice.reducer;
