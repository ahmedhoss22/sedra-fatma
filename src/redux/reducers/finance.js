import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Api from '../../config/config';

export const fetchExpenses= createAsyncThunk(
  'finance/fetchUser',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/admin/expenses')
      return response.data;
    } catch (error) {
      const navigate=useNavigate()
      return thunkAPI.rejectWithValue(error.message);
    }
}
);
export const fetchDraws= createAsyncThunk(
  'finance/fetchDraws',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/admin/draws')
      return response.data;
    } catch (error) {
      const navigate=useNavigate()
      return thunkAPI.rejectWithValue(error.message);
    }
}
);
export const fetchPaypal= createAsyncThunk(
  'finance/fetchPaypal',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/admin/paypal')
      return response.data;
    } catch (error) {
      const navigate=useNavigate()
      return thunkAPI.rejectWithValue(error.message);
    }
}
);
export const fetchOnlinePayments= createAsyncThunk(
  'finance/fetchOnlinePayments',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/admin/onlinepayment')
      return response.data;
    } catch (error) {
      const navigate=useNavigate()
      return thunkAPI.rejectWithValue(error.message);
    }
}
);
export const fetchBanckTransaction= createAsyncThunk(
  'finance/fetchBanckTransaction',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/admin/banktransaction')
      return response.data;
    } catch (error) {
      const navigate=useNavigate()
      return thunkAPI.rejectWithValue(error.message);
    }
}
);
  const finance = createSlice({
    name: "finance",
    initialState: {
      value: { expenses: [],draws:[],paypal:[],onlinePayment:[],banktransaction:[]},
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchExpenses.fulfilled, (state, action) => {
        state.value.expenses=action.payload
      });
      builder.addCase(fetchDraws.fulfilled, (state, action) => {
        state.value.draws=action.payload
      });
      builder.addCase(fetchPaypal.fulfilled, (state, action) => {
        state.value.paypal=action.payload
      });
      builder.addCase(fetchOnlinePayments.fulfilled, (state, action) => {
        state.value.onlinePayment=action.payload
      });
      builder.addCase(fetchBanckTransaction.fulfilled, (state, action) => {
        state.value.banktransaction=action.payload
      });
    },
  });
export const {} = finance.actions

export default finance.reducer