import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { serverUrl } from "../../utils/serverUrl";

export const loginUser = createAsyncThunk(
  "loginUser",
  async (credentials: any) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/users/login`,
      credentials
    );
    const data = await response.data;
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data.data));
    return data;
  }
);

export const logoutUser = createAsyncThunk("logoutUser", async () => {
  const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/logout`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.user).accessToken}`,
    },
  });
  console.log(data);
  localStorage.removeItem("user");
  return data;
});

const getInitialState = () => {
  if (localStorage.getItem("user")) {
    return {
      loading: false,
      user: JSON.parse(localStorage.getItem("user") as string),
      error: "",
    };
  }
  return {
    loading: false,
    user: null,
    error: "",
  };
};
const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setState:(state,action)=>{
      state.user=action.payload.user
      state.loading=action.payload.loading
      state.error=action.payload.error
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      if (action.error.message === "Request failed with status code 403") {
        state.error = "User Not Found";
      } else if (
        action.error.message === "Request failed with status code 401"
      ) {
        state.error = "Invalid Credentials";
      } else state.error = action.error.message || "something went wrong";
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "something went wrong";
    });
  },
});
export const {setState}=authSlice.actions
export default authSlice.reducer;
