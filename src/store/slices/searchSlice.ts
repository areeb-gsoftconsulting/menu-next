import { createSlice } from "@reduxjs/toolkit";

export interface searchSlice {
  searchedItemName: string;
  searchLoading: boolean;
}

const initialState: searchSlice = {
  searchedItemName: "",
  searchLoading: false,
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
    setSearchLoading: (state: any, action: any) => {
      return {
        ...state,
        searchLoading: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchedItemName, setSearchLoading } = searchSlice.actions;

export default searchSlice.reducer;
