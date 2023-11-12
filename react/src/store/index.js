import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   mode: "light",
   user: null,
   token: null,
   expenses: [],
   categories: []
}

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setMode: (state) => {
         state.mode = state.mode === "light" ? "dark" : "light"
      },
      setLogout: (state) => {
         state.user = null;
         state.token = null;
         localStorage.removeItem('ACCESS_TOKEN')
      },
      setUser: (state, action) => {
         state.user = action.payload.user;
      },
      setToken: (state, action) => {
         state.token = action.payload.token;
         localStorage.setItem('ACCESS_TOKEN', action.payload.token)
      },
      setExpenses: (state, action) => {
         state.expenses = action.payload.expenses;
      },
      setCategories: (state, action) => {
         state.categories = action.payload.categories
      }
   }
})

export const { setMode, setToken, setLogout, setUser, setExpenses, setCategories } = authSlice.actions
export default authSlice.reducer