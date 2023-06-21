import React ,{useEffect , useState ,useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../scss/addChalets.scss"
import { Grid, InputLabel } from '@mui/material';
import { TextField } from '@mui/material';
import Api from '../config/config';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchEmploees } from '../redux/reducers/employee';
import { Select, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { fetchHall } from './../redux/reducers/hall';
import { fetchResort } from './../redux/reducers/resort';
import { fetchChalets } from './../redux/reducers/chalet';
import { fetchReservations } from '../redux/reducers/reservation';
import format from 'date-fns/format'
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
const UnconfirmedReservationsModal = ({handleClose,open,data:temp,update}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [data,setData]=useState({clientName:"",startDate:'2023-04-17',endDate:format(new Date(),'yyyy/MM/dd'),cost:'',entityId:'',entityName:'',id:''})
  const dispatch=useDispatch()
  const [type,setType]=useState('all')
  const [timeError,setTimeError]=useState('')
  const [nameError,setNameError]=useState('')
  const halls=useSelector((state)=>state.hall.value.data)
  const resorts=useSelector((state)=>state.resort.value.data)
  const chalets=useSelector((state)=>state.chalet.value.data)
  useEffect(()=>{
    dispatch(fetchChalets())
    dispatch(fetchHall())
    dispatch(fetchResort())
  },[])
useEffect(()=>{
  if(temp){
    setData(temp)
    if(halls.filter((ele)=>ele._id==data.entityId).length)setType('hall')
    else if(resorts.filter((ele)=>ele._id==data.entityId).length)setType('resort')
    else if(chalets.filter((ele)=>ele._id==data.entityId).length)setType('chalet')
    else setType('all')
  }
},[temp])
function handleSubmit(e){
  e.preventDefault();
  if(new Date (data.startDate).getTime() >= new Date(data.endDate).getTime())return setTimeError("يجب ان يكون تاريخ الوصول قبل تاريخ الانتهاء")
  let url = update? '/admin/reservation/update':'/admin/reservation';
  Api.post(url, data)
  .then(() => {
      dispatch(fetchReservations())
      setTimeError("")
      setData({name:"",startDate:new Date(),endDate:new Date(),cost:'',entityId:'',id:''})
      handleClose()
      setNameError('')
  })
  .catch((err)=>{
    if(err.response.status==403) setNameError("هذا العميل لديه حجز بالفعل")
  })
}
return (
    <div>
    <Modal style={{direction:i18n.language=='en'?'ltr':"rtl"}} open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
      <Box sx={style} className='model'>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
                {t("reservation.addReservation")}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
              <Grid item xs={6}>
                  <InputLabel>{t("reservation.client")}</InputLabel>
                  <TextField error={nameError} helperText={nameError} variant="outlined" fullWidth required type="text"  value={data.clientName} onChange={(e)=>setData({...data,clientName:e.target.value})}/>
              </Grid>
               <Grid item xs={6}>
                <InputLabel>{t("reservation.period")}</InputLabel>
                    <Select value={data.dayPeriod} defaultValue={data.dayPeriod} required={type=='hall'} onChange={(e)=>setData({...data,dayPeriod:e.target.value})} fullWidth>
                        <MenuItem value={'صباحية'}>{t("reservation.morning")}</MenuItem>
                        <MenuItem value={'مسائية'}>{t("reservation.night")}</MenuItem>
                        <MenuItem value={'كامل اليوم'}>{t("reservation.day")}</MenuItem>
                    </Select>
              </Grid>
              <Grid item xs={6}>
                <InputLabel>{t("reservation.entity")}</InputLabel>
                  <Select className={classes.select} defaultValue={data.entityId} value={data.entityId} onChange={(e)=>setData({...data,entityId:e.target.value._id,entityName:e.target.value.name})} fullWidth>
                    {chalets.map((ele)=><MenuItem key={ele._id} value={ele}>{ele.name}</MenuItem>)}
                    {resorts.map((ele)=><MenuItem key={ele._id} value={ele}>{ele.name}</MenuItem>)}
                    {halls.map((ele)=><MenuItem key={ele._id} value={ele}>{ele.name}</MenuItem>)}
                  </Select>
              </Grid>
              <Grid item xs={6}>
                   <InputLabel>{t("reservation.amount")}</InputLabel>
                   <TextField variant="outlined" fullWidth required type="number" value={data.cost} onChange={(e)=>setData({...data,cost:e.target.value})}/>
              </Grid>
              <Grid item xs={6}>
                   <InputLabel>{t("reservation.arrive")}</InputLabel>
                   <TextField variant="outlined" error={timeError} helperText={timeError} fullWidth required type="date" value={data.startDate} onChange={(e)=>setData({...data,startDate:e.target.value})}/>
              </Grid>
              <Grid item xs={6}>
                   <InputLabel>{t("reservation.leave")}</InputLabel>
                   <TextField variant="outlined" fullWidth required type="date" value={data.endDate} onChange={(e)=>setData({...data,endDate:e.target.value})}/>
              </Grid>
              <Grid item xs={12}>
                  <Button variant='contained' type='submit' fullWidth style={{backgroundColor:"#B38D46",height:"50px" ,fontSize:"1rem"}}>{t("reservation.add")}</Button>
              </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  </div>
  ) 
}

export default UnconfirmedReservationsModal


