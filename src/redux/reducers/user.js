import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Api from '../../config/config';

export const fetchUserData= createAsyncThunk(
  'user/fetchUserData',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/users/data')
      return response.data;
    } catch (error) {
  return thunkAPI.rejectWithValue(error.message);
    }
}
);
export const fetchUserReservations= createAsyncThunk(
  'user/fetchUserReservations',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    try {  
      const response = await Api.get('/users/reservation')
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
}
);
  const user = createSlice({
    name: "user",
    initialState: {
      value: { data: {} ,logedin:false,reservations:[]},
    },
    reducers: {
      login:(state,action)=>{
        state.value.logedin=true
      },
      logout:(state,action)=>{
        state.value.logedin=false
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUserData.fulfilled, (state, action) => {
        state.value.logedin=true
        state.value.data=action.payload
      });
      builder.addCase(fetchUserReservations.fulfilled, (state, action) => {
        state.value.reservations=action.payload
      });
    },
  });
export const {login,logout} = user.actions

export default user.reducer