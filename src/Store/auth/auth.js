// step 2(a): create reducer slice for auth
import { createSlice } from "@reduxjs/toolkit";
console.log("auth Reducer ran");

const initialToken = localStorage.getItem("token");

const initiaAuthState = {
  isAuthenticated: initialToken ? true : false,
  email: null,
  userName: null,
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initiaAuthState,
  reducers: {
    login(state, load) {
      const data = load.payload;
      state.isAuthenticated = true;
      state.email = data.email;
      state.userName = data.userName;
      localStorage.setItem("token", data.token);
    },

    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },

    getEmail(state, load){
      state.email = load.payload
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

