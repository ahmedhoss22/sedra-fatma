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
import { fetchCustomer } from '../redux/reducers/customer';
import { useTranslation } from 'react-i18next';

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

function AddCutomerModal({handleClose,handleOpen,open,data:temp,update}) {    
  const { t, i18n } = useTranslation();
  const [data,setData]=useState({name:'',nationalId:'',phone:"",phone2:"",address:'',password:"",email:'',confirmPassword:""})
 const [errors,setErrors]=useState({email:"",password:"",confirmPassword:''})
 const dispatch=useDispatch()
 useEffect(()=>{if(temp)setData({...temp,confirmPassword:temp.password})
},[temp])

function handleSubmit(e){
  e.preventDefault();
  if(data.password !== data.confirmPassword) return setErrors({...errors,confirmPassword:"Password must be same"}) 
  let url = update? '/admin/customer/update':'/admin/customer';
  Api.post(url, data)
  .then(() => {
      dispatch(fetchCustomer())
      setData({})
      setErrors({email:"",password:"",confirmPassword:''})
      handleClose()
  })
  .catch((err)=>{
    let emailError=err.response?.data?.email
    if(emailError) return setErrors({...errors,email:emailError})
  })
}
 return (
    <div>
      <Modal style={{direction:i18n.language=='en'?'ltr':'rtl'}} open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={style} className='model'>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
            {t("client.title")} 
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <InputLabel htmlFor="chaletImg">{t("client.name")}</InputLabel>
                    <TextField variant="outlined" fullWidth required type="text"  value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="chaletImg">{t("client.email")}</InputLabel>
                    <TextField error={errors.email} helperText={errors.email} variant="outlined" fullWidth required type="email"  value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="chaletImg">{t("client.password")}</InputLabel>
                    <TextField variant="outlined" fullWidth required type="password"  value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="chaletImg">{t("client.confirmPassword")}</InputLabel>
                    <TextField variant="outlined" error={errors.confirmPassword} helperText={errors.confirmPassword} fullWidth required type="password"  value={data.confirmPassword} onChange={(e)=>setData({...data,confirmPassword:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="chaletImg">{t("client.id")}</InputLabel>
                    <TextField variant="outlined" fullWidth required type="number"  value={data.nationalId} onChange={(e)=>setData({...data,nationalId:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="chaletImg">{t("client.phone")}</InputLabel>
                    <TextField variant="outlined" fullWidth required type="number"value={data.phone} onChange={(e)=>setData({...data,phone:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="chaletImg">{t("client.phone2")}</InputLabel>
                    <TextField variant="outlined" fullWidth type="number" value={data.phone2} onChange={(e)=>setData({...data,phone2:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="chaletImg">{t("client.address")}</InputLabel>
                    <TextField variant="outlined" fullWidth required type="text" value={data.address} onChange={(e)=>setData({...data,address:e.target.value})}/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' type='submit' fullWidth style={{backgroundColor:"#B38D46",height:"50px" ,fontSize:"1rem"}}>{t("client.add")}</Button>
                </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
export default AddCutomerModal;