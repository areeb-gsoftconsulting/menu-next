import { createSlice } from "@reduxjs/toolkit";

export interface categorySlice {
  selectedCategory: string;
}

const initialState: categorySlice = {
  selectedCategory: "1",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state: any, action: any) => {
      return {
        ...state,
        selectedCategory: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
