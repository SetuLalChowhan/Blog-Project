import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

//Register
export const register = createAsyncThunk(
  "auth/register",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formData);
      toast.success("Registration Complete");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//login
export const login = createAsyncThunk(
  "auth/login",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formData);
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//update profile
export const profileUpdate = createAsyncThunk(
  "auth/updateMe",
  async ({ updateProfileData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateMe(updateProfileData);
      toast.success("Updated Profile Successfully");
      navigate("/my profile");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// all users

export const getAllUsers = createAsyncThunk(
  "auth/allUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.allUsers();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//change Role
export const roleChange = createAsyncThunk(
  "auth/changeRole",
  async ({id,roleValue}, { rejectWithValue }) => {
    try {
      const response = await api.changeRole(id,roleValue);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//delete User
export const userDelete = createAsyncThunk(
  "auth/deleteUser",
  async ({id,toast}, { rejectWithValue }) => {
    try {
      const response = await api.deleteUser(id);
      toast.success("User Deleted")
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);





const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    users:[],
    error: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.clear();

      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(profileUpdate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(profileUpdate.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(profileUpdate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.error = "";
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(roleChange.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(roleChange.fulfilled, (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      console.log(id)
      if(id){
        state.users = state.users.map((user)=> user._id === id ? action.payload.user:user) 
      }
      state.error = "";
    });
    builder.addCase(roleChange.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(userDelete .pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userDelete .fulfilled, (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      console.log(id)
      if(id){
        state.users = state.users.filter((user)=> user._id !== id ) 
      }
      state.error = "";
    });
    builder.addCase(userDelete .rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
