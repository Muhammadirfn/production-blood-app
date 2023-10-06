import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userRegister, userlogin } from "./AuthAction";
import { message } from "antd";

const token = localStorage.getItem('token' ? localStorage.getItem('token'):null)
const initialState = {
  loading: false,
  user: null,
  token:token,
  error:null
}
const authSlice =createSlice({
  name: "auth",
  initialState:initialState,
  reducers:{},
  extraReducers:(builder)=>{
    // this is for the login user
    builder.addCase(userlogin.pending, (state) => {
      state.loading = true;
      state.error = null; // Reset the error when login is in the pending state
    }),
    builder.addCase(userlogin.fulfilled, (state, {payload})=>{
     
      state.loading = false,
      state.user = payload.user || null,
      state.token = payload.token
     
    }),
    builder.addCase(userlogin.rejected, (state, {payload})=>{
      state.loading = false,
      state.error = payload
    
    })
    // REGISTER user
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
    
      state.user = payload.user;
     
      
    });
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
      // for getting current user
      builder.addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
     
        builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.user = payload.user;
        });
      // });
      builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  }
})

export default authSlice