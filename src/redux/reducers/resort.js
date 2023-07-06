import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Api from '../../config/config';

export const fetchResort= createAsyncThunk(
  'resort/fetchResort',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/admin/resort')
      return response.data;
    } catch (error) {
  return thunkAPI.rejectWithValue(error.message);
    }
}
);
  const resort = createSlice({
    name: "resort",
    initialState: {
      value: { data: [],resortCard:{} },
    },
    reducers: {
      getResortCard:(state,action)=>{
        let id =action.payload
        state.value.resortCard=state.value.data.filter((ele)=>ele._id==id)
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchResort.fulfilled, (state, action) => {
        let resorts=action.payload
        resorts= resorts.map((resort)=>{
          if (resort.details && typeof resort.details === 'string' && resort.details.includes('-')) {
             resort.details = resort.details.split('-');
          }
            return resort;
      })
        state.value.data=resorts
      });
    },
  });
export const {getResortCard} = resort.actions

export default resort.reducer