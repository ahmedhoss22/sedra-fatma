import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Api from '../../config/config';

export const fetchHalls= createAsyncThunk(
  'hall/fetchHalls',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/admin/hall')
      return response.data;
    } catch (error) {
  return thunkAPI.rejectWithValue(error.message);
    }
}
);

  const hall = createSlice({
    name: "hall",
    initialState: {
      value: { data: []},
    },
    reducers: {
      getHallCard:(state,action)=>{
        let id =action.payload
        state.value.hallCard=state.value.data.filter((ele)=>ele._id==id)
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchHalls.fulfilled, (state, action) => {
        let halls=action.payload
        halls= halls.map((hall)=>{
          if (hall.details && typeof hall.details === 'string' && hall.details.includes('-')) {
             hall.details = hall.details.split('-');
          }
            return hall;
      })
        state.value.data=halls
      });
    },
  });
export const {getHallCard} = hall.actions

export default hall.reducer