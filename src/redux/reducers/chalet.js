import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Api from '../../config/config';

export const fetchChalets= createAsyncThunk(
  'chalet/fetchChalets',
  async (_, thunkAPI) => {
    try {  
      const response = await Api.get('/admin/chalet')
      return response.data;
    } catch (error) {
  return thunkAPI.rejectWithValue(error.message);
    }
}
);
  const chalet = createSlice({
    name: "chalet",
    initialState: {
      value: { data: [] ,chaletCard:{},search:{minPrice:"",maxPrice:'',area:'',rooms:'',capacity:'',pools:'',kitchen:'',bedrooms:'',bathrooms:'',lounges:''}},
    },
    reducers: {
      getChaletCard:(state,action)=>{
        let id =action.payload
        state.value.chaletCard=state.value.data.filter((ele)=>ele._id==id)
      },
      setSearch:(state,action)=>{
        state.value.search=action.payload
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchChalets.fulfilled, (state, action) => {
        let chalets=action.payload
        chalets= chalets.map((chalet)=>{
          if (chalet.details && typeof chalet.details === 'string' && chalet.details.includes('-')) {
             chalet.details = chalet.details.split('-');
          }
            return chalet;
      })
        state.value.data=chalets
      });
    },
  });
export const {getChaletCard,setSearch} = chalet.actions

export default chalet.reducer