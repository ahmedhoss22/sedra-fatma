import React ,{useEffect , useState ,useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../scss/addChalets.scss"
import { Grid, InputLabel } from '@mui/material';
import { TextField } from '@mui/material';
import Api from './../config/config';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { fetchReservations } from '../redux/reducers/reservation';
import { useParams } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

function AddPayment({handleClose,handleOpen,open,data:temp,update}) {    
  let {id}=useParams()
  const { t, i18n } = useTranslation();
  const [data,setData]=useState({type:'نقدي'})
  const [snackOpen,setSnackOpen]=useState(false)
 const dispatch=useDispatch()
 useEffect(()=>{if(temp)setData({...temp,confirmPassword:temp.password})
},[temp])
console.log(data);
async function handleSubmit(e){
  e.preventDefault();
  if(!data.insurance&& !data.paid) return setSnackOpen(true)
  await setData({...data,insurance:data.insurance==''?0:data.insurance,paid:data.paid==''?0:data.paid})
  let url = update? `/admin/payment/${data._id}`:'/admin/payment';
  await Api.post(url, {...data,id})
  .then(() => {
      dispatch(fetchReservations())
      setData({type:''})
      handleClose()
  })
  .catch((err)=>{
    console.log(err?.respone?.message);
})
}
 return (
    <div>
      <Modal style={{direction:i18n.language=='en'?'ltr':'rtl'}} open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={style} className='model'>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
            اضافة دفعة
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <InputLabel htmlFor="chaletImg">نوع الدفع</InputLabel>
                    <Select labelId="demo-simple-select-label" required onChange={(e)=>setData({...data,type:e.target.value})} fullWidth id="demo-simple-select" value={data.type} label="نوع الدفع">
                          <MenuItem value="نقدي">نقدي</MenuItem>
                          <MenuItem value="تحويل بنكي">تحويل بنكي</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel htmlFor="chaletImg">المبلغ</InputLabel>
                    <TextField  variant="outlined" fullWidth  type="number"  value={data.paid} onChange={(e)=>setData({...data,paid:e.target.value})}/>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel htmlFor="chaletImg">مبلغ التأمين</InputLabel>
                    <TextField variant="outlined" fullWidth  type="number"  value={data.insurance} onChange={(e)=>setData({...data,insurance:e.target.value})}/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' type='submit' fullWidth style={{backgroundColor:"#B38D46",height:"50px" ,fontSize:"1rem"}}>{t("client.add")}</Button>
                </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={()=>setSnackOpen(false)}>
          <Alert onClose={()=>setSnackOpen(false)} severity="warning" sx={{ width: '100%' }}>
           يجب اضافة مبلغ  !!
          </Alert>
        </Snackbar>
    </div>
  );
}
export default AddPayment;
