import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Api from './../../config/config';

export const fetchReservations= createAsyncThunk(
  'reservation/fetchReservations',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/admin/reservations/all')
      return response.data;
    } catch (error) {
  return thunkAPI.rejectWithValue(error.message);
    }
}
);
export const fetchInsurance= createAsyncThunk(
  'reservation/fetchInsurance',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/admin/insurance')
      return response.data;
    } catch (error) {
  return thunkAPI.rejectWithValue(error.message);
    }
}
);
  const reservations = createSlice({
    name: "reservation",
    initialState: {
      value: { confirmed:[],unConfirmed:[] ,insurance:[],deferred:[],canceled:[],cancelRequest:[],reservationRevenue:[]},
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchReservations.fulfilled, (state, action) => {
        let all=action.payload
        state.value.unConfirmed=all.filter((ele)=>ele.status=='unConfirmed')
        state.value.confirmed=all.filter((ele)=>ele.status=='confirmed')
        state.value.canceled=all.filter((ele)=>ele.status=='canceled')
        state.value.reservationRevenue=all.filter((ele)=>(ele.status=='confirmed'||ele.completed))
        state.value.deferred=all.filter((ele)=>ele.deferred==true)
        state.value.cancelRequest=all.filter((ele)=>ele.cancelRequest==true)
      });
      builder.addCase(fetchInsurance.fulfilled, (state, action) => {
        state.value.insurance=action.payload
      });
    },
  });
export const {} = reservations.actions

export default reservations.reducer