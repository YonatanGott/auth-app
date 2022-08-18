import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiAuth from "_api/auth/auth.api";
import { RootState } from "_store/store";
import { ISignUpModel } from "_types/models/users/ISignUpModel";
import { IUserModel } from "_types/models/users/IUserModel";


interface IInitialState {
  user: IUserModel;
  loggedIn: boolean;
  token: string;
  refreshToken: string;
}
const initialState:IInitialState = {
  user: null,
  loggedIn:false,
  token:null,
  refreshToken: null
};

export const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    logOut:(state) => {
      state.user = null;
      state.loggedIn = false;
      sessionStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
    },
    getTokens:(state) => {
      state.token = sessionStorage.getItem("token")
      state.refreshToken = localStorage.getItem("refreshToken")
    }
  },
  extraReducers:
    (builder) => {
      //User
      builder.addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.loggedIn = true;
        sessionStorage.setItem("token", state.token);
        localStorage.setItem("refreshToken", state.refreshToken);
      });
      builder.addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.loggedIn = true;
        sessionStorage.setItem("token", state.token);
        localStorage.setItem("refreshToken", state.refreshToken);
      });
      // Current User
      builder.addCase(currentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loggedIn = true;
      });
    },
  
})
export const {
  logOut,
  getTokens,
} = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data:ISignUpModel) => {
    const response = await ApiAuth.signUp(data);
    return response.data;
  }
);
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data: {email:string, password: string}) => {
    const response = await ApiAuth.signIn(data);
    return response.data;
  }
);
export const currentUser = createAsyncThunk(
  "auth/currentUser",
  async () => {
    const response = await ApiAuth.currentUser();
    return response.data;
  }
);