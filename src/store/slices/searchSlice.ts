import { createSlice } from "@reduxjs/toolkit";

export interface searchSlice {
  searchedItemName: string;
}

const initialState: searchSlice = {
  searchedItemName: "",
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setSearchedItemName: (state: any, action: any) => {
      return {
        ...state,
        searchedItemName: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchedItemName } = searchSlice.actions;

export default searchSlice.reducer;
