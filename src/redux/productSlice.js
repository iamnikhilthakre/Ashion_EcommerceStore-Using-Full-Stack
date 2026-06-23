import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },

    filterByCategory: (state, action) => {
      if (action.payload === "All") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (item) => item.category === action.payload
        );
      }
    },

    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    }
  }
});

export const {
  setProducts,
  filterByCategory,
  selectProduct
} = productSlice.actions;

export default productSlice.reducer;