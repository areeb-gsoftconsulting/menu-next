import { createSlice } from "@reduxjs/toolkit";

export interface categorySlice {
  selectedCategory: string;
  categories: [{}];
}

const initialState: categorySlice = {
  selectedCategory: "1",
  categories: [
    {
      _id: "1",
      name: "All",
    },
  ],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state: any, action: any) => {
      console.log("action.payload", action.payload);
      return {
        ...state,
        selectedCategory: action.payload,
      };
    },
    setCategories: (state: any, action: any) => {
      return {
        ...state,
        categories: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedCategory, setCategories } = categorySlice.actions;

export default categorySlice.reducer;
