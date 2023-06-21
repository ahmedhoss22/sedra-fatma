import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Api from '../../config/config';

export const fetchPackages= createAsyncThunk(
  'customer/fetchPackages',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/admin/package')
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
}
);
export const fetchServices= createAsyncThunk(
    'customer/fetchServices',
    async (_, thunkAPI) => {
      try {  
        const response = await Api.get('/admin/services')
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
  }
  );
  const customer = createSlice({
    name: "services",
    initialState: {
      value: { packages: [],servies:[] },
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchPackages.fulfilled, (state, action) => {
        state.value.packages=action.payload
      });
      builder.addCase(fetchServices.fulfilled, (state, action) => {
        state.value.servies=action.payload
      });
    },
  });
export const {} = customer.actions

export default customer.reducer