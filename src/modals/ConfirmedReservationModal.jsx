import React ,{useEffect , useState ,useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../scss/addChalets.scss"
import { Grid, InputLabel } from '@mui/material';
import { TextField } from '@mui/material';
import Api from '../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmploees } from '../redux/reducers/employee';
import { Select, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { fetchReservations } from '../redux/reducers/reservation';
import { fetchHall } from './../redux/reducers/hall';
import { fetchResort } from './../redux/reducers/resort';
import { fetchChalets } from './../redux/reducers/chalet';
import { useTranslation } from 'react-i18next';
import { Divider } from '@material-ui/core';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const useStyles = makeStyles((theme) => ({
    select: {
      borderColor: '#000000',
      marginLeft: '20px',
      minWidth: '100px',
      borderWidth: '2px',
      borderRadius: '8px',
      '&:focus': {
        borderColor: 'red', // change the border color to custom variable when focused
      },
    },
  }));
const ConfirmedReservationModal = ({handleClose,handleOpen,open,data:temp,update}) => {
  const { t, i18n } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(1);
const classes = useStyles();
const handleOptionChange = (event) => setSelectedOption(event.target.value);
const dispatch=useDispatch()
const halls=useSelector((state)=>state.hall.value.data)
const resorts=useSelector((state)=>state.resort.value.data)
const chalets=useSelector((state)=>state.chalet.value.data)
const [snackOpen,setSnackOpen]=useState(false)
const [timeError,setTimeError]=useState('')
const today = new Date();
const dateString = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
const [type,setType]=useState('all')
useEffect(()=>{
  dispatch(fetchChalets())
  dispatch(fetchHall())
  dispatch(fetchResort())

},[])
useEffect(()=>{
  if(update){
    setData({temp})
    if(halls.filter((ele)=>ele._id==data.entityId).length)setType('hall')
    else if(resorts.filter((ele)=>ele._id==data.entityId).length)setType('resort')
    else if(chalets.filter((ele)=>ele._id==data.entityId).length)setType('chalet')
    else setType('all')
  }
},[temp])
const [data,setData]=useState({contractNumber:"",phone:'',startDate:"",endDate:'',dayPeriod:'',insurance:'',clientName:"",clientPhone:"",cost:'',paid:'',tax:'',clientId:''})
 useEffect(()=>{if(temp)setData(temp)},[temp])

 console.log(data);
function handleSubmit(e){
  e.preventDefault();
  if(new Date (data.startDate).getTime() > new Date(data.endDate).getTime())return setTimeError("يجب ان يكون تاريخ الوصول قبل تاريخ الانتهاء")
 // if(new Date ().getTime() > new Date(data.startDate).getTime())return setTimeError("لا يمكن بداية الحجز من يوم مضى")
  let url = update? '/admin/reservation/confirmed/update':'/admin/reservation/confirmed';
  Api.post(url, data)
  .then(() => {
      dispatch(fetchReservations())
      setData({contractNumber:"",insurance:'',clientName:"",place:"",period:'',date:"",cost:'',paid:'',tax:'',phone:'',clientPhone:""})
      handleClose()
      console.log("SAdasd");
      setTimeError('')
  })
  .catch((err)=>{
    setTimeError('')
    console.log(err.response.data.error);
    setSnackOpen(true)
  })
}
function handleSubmit2(e){
  e.preventDefault();
  let url = '/admin/reservation/confirmed/deferred';
  if(new Date (data.startDate).getTime() > new Date(data.endDate).getTime())return setTimeError("يجب ان يكون تاريخ الوصول قبل تاريخ الانتهاء")
  Api.post(url, {...data,period:{startDate:data.startDate,endDate:data.endDate,type:data?.period?.type}})
  .then(() => {
      dispatch(fetchReservations())
      setData({startDate:'',endDate:'',dayPeriod:""})
      handleClose()
  })
  .catch((err)=>{
    console.log(err.response.data.error);
    setSnackOpen(true)
  })
}
   return (
    <div>
    <Modal style={{direction:i18n.language=='en'?'ltr':"rtl"}} open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
      <Box sx={style} className='model'>
        { update? <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
          {i18n.language=='en'?"Edit Reservation":"تعديل حجز"} 
        </Typography> : <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
        {i18n.language=='en'?"Add Reservation":"اضافة حجز"} 
        </Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
              <Grid item xs={4}>
                  <InputLabel>{t("reservation.contractNumber")}</InputLabel>
                  <TextField variant="outlined" fullWidth  type="number"  value={data.contractNumber} onChange={(e)=>setData({...data,contractNumber:e.target.value})}/>
              </Grid>
              <Grid item xs={4}>
                  <InputLabel>{t("reservation.client")}</InputLabel>
                  <TextField variant="outlined" fullWidth required type="text" value={data.clientName} onChange={(e)=>setData({...data,clientName:e.target.value})}/>
              </Grid>
              <Grid item xs={4}>
                  <InputLabel>{t("reservation.phone")}</InputLabel>
                  <TextField variant="outlined" fullWidth required type="text" value={data.clientPhone} onChange={(e)=>setData({...data,clientPhone:e.target.value})}/>
              </Grid>
             {!update&&<Grid item xs={4}>
                   <InputLabel>{t("reservation.entity")}</InputLabel>
                   <Select className={classes.select} required value={data.entity?.name} fullWidth>
                      {chalets.map((ele) => (
                        <MenuItem key={ele._id} value={ele.name} onClick={() => setData({ ...data, entityId: ele._id, entityName: ele.name })}>
                          {ele.name}
                        </MenuItem>
                      ))}
                      {resorts.map((ele) => (
                        <MenuItem key={ele._id} value={ele.name} onClick={() => setData({ ...data, entityId: ele._id, entityName: ele.name })}>
                          {ele.name}
                        </MenuItem>
                      ))}
                      {halls.map((ele) => (
                        <MenuItem key={ele._id} value={ele.name} onClick={() => setData({ ...data, entityId: ele._id, entityName: ele.name })}>
                          {ele.name}
                        </MenuItem>
                      ))}
                  </Select>
              </Grid>}
              <Grid item xs={4}>
                  <InputLabel>{t("reservation.amount")}</InputLabel>
                  <TextField variant="outlined" fullWidth required type="number"  value={data.cost} onChange={(e)=>setData({...data,cost:e.target.value})}/>
              </Grid>
              {/* <Grid item xs={4}>
                  <InputLabel>{t("reservation.paid")}</InputLabel>
                  <TextField variant="outlined" fullWidth  type="number" value={data.paid} onChange={(e)=>setData({...data,paid:e.target.value})}/>
              </Grid> */}
              {/* <Grid item xs={4}>
                  <InputLabel>{t("reservation.insurance")}</InputLabel>
                  <TextField variant="outlined" fullWidth  type="number" value={data.insurance?.amount} onChange={(e)=>setData({...data,insurance:{amount: e.target.value}})}/>
              </Grid> */}
               {!update&& <Grid item xs={4}>
                    <InputLabel>{t("reservation.period")}</InputLabel>
                    <Select value={data.dayPeriod} defaultValue={data.dayPeriod} required={type=='hall'} onChange={(e)=>setData({...data,dayPeriod:e.target.value})} fullWidth>
                        <MenuItem value={'صباحية'}>{t("reservation.morning")}</MenuItem>
                        <MenuItem value={'مسائية'}>{t("reservation.night")}</MenuItem>
                        <MenuItem value={'كامل اليوم'}>{t("reservation.day")}</MenuItem>
                    </Select>
              </Grid>}
              {!update&&
              <Grid item xs={4}>
                   <InputLabel>{t("reservation.arrive")}</InputLabel>
                   <TextField variant="outlined" fullWidth required InputProps={{inputProps: {min: dateString}}} type="date" error={timeError} helperText={timeError} value={data.startDate} onChange={(e)=>setData({...data,startDate:e.target.value})}/>
              </Grid>}
              {!update&&<Grid item xs={4}>
                   <InputLabel>{t("reservation.leave")}</InputLabel>
                   <TextField variant="outlined" fullWidth required InputProps={{inputProps: {min: data.startDate}}} type="date" value={data.endDate} onChange={(e)=>setData({...data,endDate:e.target.value})}/>
              </Grid>}
              <Grid item xs={12}>
                  {update? <Button variant='contained' type='submit' fullWidth style={{backgroundColor:"#B38D46",height:"50px" ,fontSize:"1rem"}}>{t("reservation.edit")}</Button>:<Button variant='contained' type='submit' fullWidth style={{backgroundColor:"#B38D46",height:"50px" ,fontSize:"1rem"}}>{t("reservation.add")}</Button>}
              </Grid>
          </Grid>
        </form>
       {update && <>
      
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:3,marginTop:3}}>
            {t("reservation.deferReservation")}
        </Typography>
        <form onSubmit={handleSubmit2}>
          <Grid container spacing={2}>
              <Grid item xs={4}>
                    <InputLabel>{t("reservation.period")}</InputLabel>
                    <Select value={data.dayPeriod} defaultValue={data.dayPeriod} required={type=='hall'} onChange={(e)=>setData({...data,dayPeriod:e.target.value})} fullWidth>
                        <MenuItem value={'صباحية'}>{t("reservation.morning")}</MenuItem>
                        <MenuItem value={'مسائية'}>{t("reservation.night")}</MenuItem>
                        <MenuItem value={'كامل اليوم'}>{t("reservation.day")}</MenuItem>
                    </Select>
              </Grid>
              <Grid item xs={4}>
                   <InputLabel>{t("reservation.arrive")}</InputLabel>
                   <TextField variant="outlined" fullWidth InputProps={{inputProps: {min: dateString}}} required  type="date"error={timeError} helperText={timeError} value={data.startDate} onChange={(e)=>setData({...data,startDate:e.target.value})}/>
              </Grid>
              <Grid item xs={4}>
                   <InputLabel>{t("reservation.leave")}</InputLabel>
                   <TextField variant="outlined" fullWidth InputProps={{inputProps: {min: dateString}}} required type="date" value={data.endDate} onChange={(e)=>setData({...data,endDate:e.target.value})}/>
              </Grid>
              <Grid item xs={12}>
                   <Button variant='contained' type='submit' fullWidth style={{backgroundColor:"#B38D46",height:"50px" ,fontSize:"1rem"}}>{t("reservation.defer")}</Button>
              </Grid>
          </Grid>
        </form>
        </>}
      </Box>
      
    </Modal>
    <Snackbar open={snackOpen} autoHideDuration={6000} onClose={()=>setSnackOpen(false)}>
          <Alert onClose={()=>setSnackOpen(false)} severity="warning" sx={{ width: '100%' }}>
            يوجد حجز بالفعل في هذه الفترة   !!
          </Alert>
        </Snackbar>
  </div>
  ) 
}

export default ConfirmedReservationModal