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
import { Select, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { fetchReservations } from '../redux/reducers/reservation';
import { fetchHall } from './../redux/reducers/hall';
import { fetchResort } from './../redux/reducers/resort';
import { fetchChalets } from './../redux/reducers/chalet';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

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
const DeferredModal = ({handleClose,handleOpen,open,data:temp,update}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
const dispatch=useDispatch()
const halls=useSelector((state)=>state.hall.value.data)
const resorts=useSelector((state)=>state.resort.value.data)
const chalets=useSelector((state)=>state.chalet.value.data)
const [snackOpen,setSnackOpen]=useState(false)
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

const [data,setData]=useState({startDate:'',endDate:'',dayPeriod:""})
 useEffect(()=>{if(temp)setData(temp)},[temp])
function handleSubmit(e){
  e.preventDefault();
  let url = '/admin/reservation/confirmed/deferred';
  Api.post(url, data)
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
         <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
            {t("reservation.deferReservation")}
        </Typography> 
        <form onSubmit={handleSubmit}>
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
                   <TextField variant="outlined" fullWidth required type="date" value={data.startDate} onChange={(e)=>setData({...data,startDate:e.target.value})}/>
              </Grid>
              <Grid item xs={4}>
                   <InputLabel>{t("reservation.leave")}</InputLabel>
                   <TextField variant="outlined" fullWidth required type="date" value={data.endDate} onChange={(e)=>setData({...data,endDate:e.target.value})}/>
              </Grid>
              <Grid item xs={12}>
                   <Button variant='contained' type='submit' fullWidth style={{backgroundColor:"#B38D46",height:"50px" ,fontSize:"1rem"}}>{t("reservation.defer")}</Button>
              </Grid>
          </Grid>
        </form>
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

export default DeferredModal