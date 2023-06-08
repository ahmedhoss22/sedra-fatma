import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Api from '../../config/config';

export const fetchEmploees= createAsyncThunk(
  'employee/fetchEmploees',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/employee/data')
      return response.data;
    } catch (error) {
      const navigate=useNavigate()
      navigate("/signin")
      return thunkAPI.rejectWithValue(error.message);
    }
}
);
export const fetchUserData= createAsyncThunk(
  'employee/fetchUserData',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/employee/user/data')
      return response.data;
    } catch (error) {
      const navigate=useNavigate()
      navigate("/signin")
      return thunkAPI.rejectWithValue(error.message);
    }
}
);

  const employee = createSlice({
    name: "employee",
    initialState: {
      value: { data: [] ,logedin:false,user:{}},
    },
    reducers: {
      setLog:(state,action)=>{
        state.value.logedin=true
      },
      setLogout:(state,action)=>{
        state.value.logedin=false
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchEmploees.fulfilled, (state, action) => {
        state.value.data=action.payload
      });
      builder.addCase(fetchUserData.fulfilled, (state, action) => {
        state.value.logedin=true
        state.value.user=action.payload
      });
    },
  });
export const {setLog,setLogout} = employee.actions

export default employee.reducer