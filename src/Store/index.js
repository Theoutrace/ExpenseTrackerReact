// step 1: create a store
import { configureStore } from "@reduxjs/toolkit";
// step 3: import auth reducer
import authReducer from "./auth/auth";
import expenseReducer from "./expenseCtx/expense";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
  },
});

export default store;
