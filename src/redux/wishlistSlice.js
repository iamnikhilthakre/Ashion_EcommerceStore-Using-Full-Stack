import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
  totalWishlistItems: 0
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const existingItem = state.wishlistItems.find(
        (item) => String(item.id) === String(product.id)
      );

      if (!existingItem) {
        state.wishlistItems.push({
          ...product,
          addedAt: new Date().toISOString()
        });
        state.totalWishlistItems = state.wishlistItems.length;
      }
    },

    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.wishlistItems = state.wishlistItems.filter((item) => String(item.id) !== String(id));
      state.totalWishlistItems = state.wishlistItems.length;
    },

    clearWishlist: (state) => {
      state.wishlistItems = [];
      state.totalWishlistItems = 0;
    }
  }
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;