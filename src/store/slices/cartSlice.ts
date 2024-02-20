import { createSlice } from "@reduxjs/toolkit";

export interface cartState {
  items: [];
  addedToCart: boolean;
  totalAmount: Number;
}

const initialState: cartState = {
  items: [],
  addedToCart: false,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItems: (state: any, action: any) => {
      let tempCart = JSON.parse(JSON.stringify(state));
      tempCart = [...tempCart.items, action.payload];
      let totalAmount;
      function calculateTotalBill(cart: any) {
        let totalBill = 0;

        cart.forEach((item: any) => {
          let itemPrice = item.price.price;

          // Add customization prices
          item.customization.forEach((customization: any) => {
            itemPrice += customization.price;
          });

          totalBill += itemPrice * item.quantity;
        });
        totalAmount = totalBill.toFixed(2);
        return totalBill;
      }
      calculateTotalBill(tempCart);
      return {
        ...state,
        items: [...state.items, action.payload],
        totalAmount: totalAmount,
      };
    },
    setCart: (state: any, action: any) => {
      let tempCart = action.payload;
      let totalAmount;
      function calculateTotalBill(cart: any) {
        let totalBill = 0;

        cart.forEach((item: any) => {
          let itemPrice = item.price.price;

          // Add customization prices
          item.customization.forEach((customization: any) => {
            itemPrice += customization.price;
          });

          totalBill += itemPrice * item.quantity;
        });
        totalAmount = totalBill.toFixed(2);
        return totalBill;
      }
      calculateTotalBill(tempCart);

      return {
        ...state,
        items: action.payload,
        totalAmount: totalAmount,
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
