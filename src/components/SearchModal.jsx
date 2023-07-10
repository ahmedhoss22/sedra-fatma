import React ,{useEffect , useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, InputLabel } from '@mui/material';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setSearch } from '../redux/reducers/chalet';
import "../scss/home.scss"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const SearchModal = ({handleClose,open}) => {
 const dispatch=useDispatch()
 const { t, i18n } = useTranslation();
const [data,setData]=useState({minPrice:"",maxPrice:'',area:'',rooms:'',capacity:'',pools:'',kitchen:'',bedrooms:'',bathrooms:'',lounges:''})
function handleSubmit(e){
    e.preventDefault();
    dispatch(setSearch(data)) 
    handleClose()
}

  return (
    <div>
    <Modal style={{direction:i18n.language=='en'?'ltr':"rtl"}} open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
      <Box style={{borderRadius:"20px"}} sx={style} className='model model-box'>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
        {t("main.search")}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                  <TextField variant="outlined" inputProps={{ min: 0 }} value={data.minPrice} fullWidth  type="number" placeholder={t("search.minPrice")} onChange={(e)=>setData({...data,minPrice:e.target.value})}/>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <TextField variant="outlined" inputProps={{ min: data.minPrice?data.minPrice:0 }} value={data.maxPrice}  fullWidth  type="number" placeholder={t("search.maxPrice")} onChange={(e)=>setData({...data,maxPrice:e.target.value})}/>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <TextField variant="outlined" inputProps={{ min: 0 }} value={data.area}  fullWidth  type="number" placeholder={t("search.area")} onChange={(e)=>setData({...data,area:e.target.value})}/>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <TextField variant="outlined" inputProps={{ min: 0 }} value={data.rooms}  fullWidth  type="number" placeholder={t("search.rooms")} onChange={(e)=>setData({...data,rooms:e.target.value})}/>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <TextField variant="outlined" inputProps={{ min: 0 }} value={data.capacity}  fullWidth  type="number" placeholder={t("search.capacity")} onChange={(e)=>setData({...data,capacity:e.target.value})}/>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <TextField variant="outlined" inputProps={{ min: 0 }} value={data.pools}  fullWidth  type="number" placeholder={t("search.pools")} onChange={(e)=>setData({...data,pools:e.target.value})}/>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <TextField variant="outlined" inputProps={{ min: 0 }} value={data.kitchen}  fullWidth  type="number" placeholder={t("search.kitchen")} onChange={(e)=>setData({...data,kitchen:e.target.value})}/>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <TextField variant="outlined" inputProps={{ min: 0 }} value={data.bedrooms}  fullWidth  type="number" placeholder={t("search.bedrooms")} onChange={(e)=>setData({...data,bedrooms:e.target.value})}/>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <TextField variant="outlined" inputProps={{ min: 0 }} value={data.bathrooms}  fullWidth  type="number" placeholder={t("search.bathrooms")} onChange={(e)=>setData({...data,bathrooms:e.target.value})}/>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <TextField variant="outlined" inputProps={{ min: 0 }} value={data.lounges}  fullWidth  type="number" placeholder={t("search.lounges")} onChange={(e)=>setData({...data,lounges:e.target.value})}/>
              </Grid>
              <Grid item xs={12}>
                  <button className='search-modal-btn' variant='contained' type='submit'>{t("search.search")}</button>
              </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  </div>
  ) 
}

export default SearchModal
