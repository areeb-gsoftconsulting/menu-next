import { createSlice } from "@reduxjs/toolkit";

export interface themeSlice {
  isDark: boolean;
}

const initialState: themeSlice = {
  isDark: false,
};

export const likeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setIsDark: (state: any, action: any) => {
      return {
        ...state,
        isDark: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsDark } = likeSlice.actions;

export default likeSlice.reducer;
