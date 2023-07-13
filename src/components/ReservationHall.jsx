import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { DateRange ,DateRangePicker  ,Calendar  } from 'react-date-range'
import format from 'date-fns/format'
import { addDays ,differenceInDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Button, Grid, TextField } from '@mui/material';
import { useSelector } from 'react-redux'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import paypal from "../assets/paypal.webp"
import Footer from './Footer';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "../scss/calender.scss"
import "../scss/chaletCard.scss"
import Dialoge from './Dialoge'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import Api from './../config/config';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next'
import MapLocation from './../components/MapLocation';
import { useNavigate } from 'react-router-dom';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ReservationHall({data:data2}) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(true)
  const refOne = useRef(null)
  const [data,setData]=useState({startDate:new Date(),endDate:new Date(),periodType:'dayPeriod',dayPeriod:'صباحية',cost:data2? data2?.price?.morning : 0,type:'hall'})
  const [loading,setLoading]=useState(false)
  const [snackOpen,setSnackOpen]=useState(false)
  const [snackOpen2,setSnackOpen2]=useState(false)
  const naviagte=useNavigate()
  const [prices,setPrices]=useState()
  const [dialogeMsg,setDialogeMsg]=useState(false)
  const login=useSelector((state)=>state.user.value.logedin)
  const user=useSelector((state)=>state.user.value.data)
  const handelClose=()=>{
    setDialogeMsg(false)
    setLoading(false)
  }
  const handleButtonClick = (index) =>setData({...data,dayPeriod:index});
  useEffect(()=>{
    setPrices(data2?.price)
  },[data2])
  const buttonGroup = [
    { label: 'صباحية', value: 'صباحية',enLabel:"Morning" },
    { label: 'مسائية', value: 'مسائية',enLabel:"Night" },
    { label: 'كامل اليوم', value: 'كامل اليوم',enLabel:"Whole Day"},
  ];
  const disabledDates = [
    new Date('2023-04-21'),
    new Date('2023-04-20')
  ];
  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
          <Typography variant="caption" style={{fontWeight:"700",fontSize:"1.2rem"}} color="text.secondary">
             {props.label}
          </Typography>
        </Box>
      </Box>
    );
  }
  function handleSubmit(e){
    console.log("fired");
    e.preventDefault()
    setLoading(true)
    if(!login) return setDialogeMsg(true)
      Api.post('/user/reservation',{...data,clientId:user._id,clientName:user.name,phone:user.phone,entityId:data2._id,entityName:data2.name,image:data2.images[0]})
      .then((res)=>{
        setTimeout(()=>{
          setLoading(false)
          setSnackOpen(true)
          naviagte("/reservations")
        },1000)
      })
      .catch((error)=>{
        console.log(error)
        setTimeout(()=>{
          setSnackOpen2(true)
          setLoading(false)
        },1000)
      })
    }
    const DayPeriodPrice=(period)=>{
      if(period == 'صباحية') setData({...data,dayPeriod:period,cost:prices.morning})
      if(period == 'مسائية') setData({...data,dayPeriod:period,cost:prices.night})
      if(period == 'كامل اليوم') setData({...data,dayPeriod:period,cost:prices.wholeDay})
    }
    console.log(data.startDate);
  return (
    <>{
      data2 &&
      <>
    <div className="reservation"  >
      <form className="left-side" onSubmit={handleSubmit}>
        {i18n.language=='ar'? <h3 style={{direction:i18n.language=='ar'?'ltr':"rtl"}}> <span>{data2.price?.wholeDay}</span> {t("details.price")}</h3>
        :<h3 style={{direction:i18n.language=='ar'?'ltr':"rtl"}}>{t("details.price")} <span>{data2.price?.wholeDay}</span></h3>}
        <div className="box">
          <div className="leave" style={{borderRight:"none"}}>
            <p>{t("details.arrive")}</p>
            <p>{`${format(data.startDate,'MM/dd/yyyy') }`}</p>
            {data.dayPeriod}
          </div>
          
        </div>
        <div className="total">
        {i18n.language=='ar' &&<> <p >{t("details.total")}</p><span>{data.cost}</span></>}
         {i18n.language=='en' &&<><span>{data.cost}</span> <p >{t("details.total")}</p></>}
        </div>
      <button variant='contained' type='submit' className='choose'>{t("details.choose")}</button>
      <p className='subtitle'>{t("details.pill")}</p>
        <Grid container spacing={2} width={'80%'} margin='auto'>
          <Grid item xs={4} className='spinner'>
              <CircularProgressWithLabel style={{color:"var(--primary)"}} variant="determinate" value={100} label={3} />
              <p className='price'>{Math.floor(data.cost/3)}</p>
          </Grid> 
          <Grid item xs={4} className='spinner'>
             <CircularProgressWithLabel style={{color:"var(--primary)"}}  variant="determinate" value={66} label={2} />
             <p className='price'>{Math.floor(data.cost/3)}</p>
          </Grid> 
          <Grid item xs={4} className='spinner'>
             <CircularProgressWithLabel style={{color:"var(--primary)"}}  variant="determinate" value={33} label={1} />
             <p className='price'>{Math.floor(data.cost/3)}</p>
          </Grid> 
        </Grid> 
    </form>
    {open && <div className="calendar">
        <TextField fullWidth  value={`${format(data.startDate,'MM/dd/yyyy') }`} InputProps={{readOnly: true}} className="inputBox" />
     <div ref={refOne} className='calendar-box'>
    <Calendar className='calendarElement' onChange={(newDate) =>setData({...data,startDate:newDate,endDate:newDate})} minDate={new Date()} disabledDates={disabledDates} date={data.startDate}/>
      </div> 
      <div className="period">
        <h3>{t("details.period")}</h3>
        <div className="btns-box">
          {buttonGroup.map((button, index) => (
            <button
              type='button'
              key={index}
              className={data.dayPeriod === button.label ? 'active btns' : 'btns'}
              onClick={() => DayPeriodPrice(button.label)}
            >
              {i18n.language=='ar'&& button.label}
              {i18n.language=='en'&& button.enLabel}
            </button>
          ))}
        </div>
        </div>
      </div> }
      {/* <FormLabel id="demo-radio-buttons-group-label" className='payment-label'>اختار طريقة الدفع</FormLabel>
        <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="offline" name="radio-buttons-group">
          <FormControlLabel value="offline" control={<Radio />} label="الدفع عند الوصول" />
          <FormControlLabel value="paypal" control={<Radio />} label={<img src={paypal} alt='Paypal' width="120px" height="60px"/>} />
        </RadioGroup>
        <Button type='submit' variant='contained'>اتمام الحجز</Button>  */}
        
  </div>
        <MapLocation/>
        </>

    }
    <Dialoge open={dialogeMsg} handleClose={handelClose}/>

<Snackbar open={snackOpen} autoHideDuration={6000} onClose={()=>setSnackOpen(false)}>
  <Alert onClose={()=>setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
 !! تم الحجز بنجاح 
  </Alert>
</Snackbar>

<Snackbar open={snackOpen2} autoHideDuration={6000} onClose={()=>setSnackOpen2(false)}>
  <Alert onClose={()=>setSnackOpen2(false)} severity="warning" sx={{ width: '100%' }}>
    !!  لقد تم الحجز بالفعل  
  </Alert>
</Snackbar>

<Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
    <Footer/>
    </>
  );
}

export default ReservationHall;

