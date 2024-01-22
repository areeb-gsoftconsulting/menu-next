import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  items: [];
}

const initialState: CounterState = {
  items: [],
};

export const likeSlice = createSlice({
  name: "likeSlice",
  initialState,
  reducers: {
    setLikedItems: (state: any, action: any) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    setLiked: (state: any, action: any) => {
      return {
        ...state,
        items: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLikedItems, setLiked } = likeSlice.actions;

export default likeSlice.reducer;
