import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registrationSuccess: false,
  verificationSent: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.registrationSuccess = false;
    },
    registerSuccess: (state) => {
      state.isLoading = false;
      state.registrationSuccess = true;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.registrationSuccess = false;
      state.error = action.payload;
    },
    sendVerificationSuccess: (state) => {
      state.verificationSent = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.registrationSuccess = false;
      state.verificationSent = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    verifyEmailSuccess: (state, action) => {
      if (state.user) {
        state.user.isVerified = true;
        state.user.email = action.payload.email;
      }
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  sendVerificationSuccess,
  logout,
  clearError,
  verifyEmailSuccess
} = authSlice.actions;

export default authSlice.reducer;