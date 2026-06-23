import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  isSearchOpen: false
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
      if (!state.isSearchOpen) {
        state.query = "";
      }
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
      state.query = "";
    }
  }
});

export const {
  setSearchQuery,
  toggleSearch,
  closeSearch
} = searchSlice.actions;

export default searchSlice.reducer;