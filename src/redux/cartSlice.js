import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      
      // Ensure quantity is a number
      const numQuantity = Number(quantity);
      
      const existingItem = state.cartItems.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        existingItem.quantity += numQuantity;
      } else {
        state.cartItems.push({
          ...product,
          quantity: numQuantity
        });
      }

      state.totalQuantity += numQuantity;
      state.totalPrice += product.price * numQuantity;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      }
    },

    updateQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.cartItems.find((item) => item.id === id);
        if (item && quantity > 0) {
            const diff = quantity - item.quantity;
            item.quantity = quantity;
            state.totalQuantity += diff;
            state.totalPrice += item.price * diff;
        }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
