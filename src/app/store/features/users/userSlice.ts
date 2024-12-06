import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { user } from "./types";
import { RootState } from "../../store";

const USERSE_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=>{
  const response = await axios.get(USERSE_URL);
  return response.data
})

const initialState:user[] = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers:{

  },
  extraReducers(builder) {
    builder
    .addCase(fetchUsers.fulfilled, (state, action)=>{
      return action.payload
    })
  },
})

export const AllUsers = (state:RootState) => state.users

export default usersSlice.reducer