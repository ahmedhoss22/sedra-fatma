import React ,{useState,useEffect} from 'react'
import { Grid } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import DashboardIcon from '@mui/icons-material/Dashboard';
import "../scss/halls.scss"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../scss/reservations.scss"
import { fetchUserReservations } from '../redux/reducers/user';
import CancelDialoge from '../components/CancelDialoge';
import Alert from '@mui/material/Alert';
import Footer from './../components/Footer';
import { FaStar } from 'react-icons/fa';
import Api from '../config/config';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { fetchChalets } from './../redux/reducers/chalet';
import { fetchResort } from './../redux/reducers/resort';
import { fetchHalls } from './../redux/reducers/hall';
import { useTranslation } from 'react-i18next';
import {REACT_APP_API_URL} from "../.env.js"

const Reservations = () => {
  const dispatch =useDispatch()
  const { t, i18n } = useTranslation();
  const [deleteOpen,setDeleteOpen]=useState(false)
  let apiKey=REACT_APP_API_URL
  const data=useSelector((state)=>state.user.value.reservations)
  const login=useSelector((state)=>state.user.value.logedin)
  const chalets=useSelector((state)=>state.chalet.value.data)
  const resorts=useSelector((state)=>state.resort.value.data)
  const halls=useSelector((state)=>state.hall.value.data)
  const [rating, setRating] = useState(0);
  const [note,setNote]=useState()
  const [temp,setTemp]=useState()
  const [hover, setHover] = useState(0);
  const handleDeleteClose=()=> setDeleteOpen(false)
  const [snackOpen,setSnackOpen]=useState(false)
  const [snackOpen2,setSnackOpen2]=useState(false)
  const [deleteID,setDeleteID]=useState()
  useEffect(()=>{
    dispatch(fetchUserReservations())
    dispatch(fetchChalets())
    dispatch(fetchHalls())
    dispatch(fetchResort())
  },[])
  function handleDeleteOpen(id){
    setDeleteID(id)
    setDeleteOpen(true)
  }
  function typeOfEntity(id){
    if(halls.filter((ele)=>ele._id==id).length) return "hall"
    if(resorts.filter((ele)=>ele._id==id).length) return "resort"
    if(chalets.filter((ele)=>ele._id==id).length) return "chalet"
  }
  function handleSubmit(e){
    e.preventDefault()
    if(!rating) return setSnackOpen(true)
    Api.post('/user/reservation/rate',{...temp,type:typeOfEntity(temp.entity.id),rate:rating,note})
    .then(()=>{
      setSnackOpen2(true)
      setRating(0)
      dispatch(fetchUserReservations())
    })
  }
  return (
    <>
    {
      login?
      <div className='container reserve'>
        <h2>{t("user.reservations")}</h2>
        <Grid container spacing={2}>
      {
        data.map((ele,ind)=>(
          <Grid key={ind} item xs={12} md={6} lg={4}>
            <Card sx={{ maxWidth: 400 }} style={{cursor:"alias"}} >
                <CardActionArea>
                  <CardMedia component="img" height="180" image={apiKey+ ele.image} alt="green iguana"/>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{display:"flex",justifyContent:"space-between",flexDirection:"row-reverse"}}>
                        {ele.entity.name}
                        <div className="price-box">
                              <p style={{margin:"0"}}><span className='price' style={{color:"var(--primary)"}}> {t("details.price")} {ele.cost} </span> </p>
                        </div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{display:"flex",justifyContent:"space-between"}}>
                    {ele.period.startDate!==ele.period.endDate&& <p style={{fontSize:"1rem"}} > {`${ele.period.startDate} / ${ele.period.endDate}`}</p>}
                    {ele.period.startDate==ele.period.endDate&& <p style={{fontSize:"1rem"}} > {`${ele.period.startDate} / ${ele.period.dayPeriod}`}</p>}
                    </Typography> 
                    <div className="status" style={{flexDirection:ele.completed && !ele.rated?"column-reverse":"row-reverse"}}>
                       {ele.completed && !ele.rated?
                        <form onSubmit={(e)=>{setTemp(ele); handleSubmit(e)}}>
                          <div>
                            <p>التقييم</p>
                              {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return (
                                  <label key={i}>
                                    <input  type="radio"  name="rating"  value={ratingValue}  onClick={() => setRating(ratingValue)} style={{display:"none"}}/>
                                    <FaStar className="star" color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} size={20} onMouseEnter={() => setHover(ratingValue)}onMouseLeave={() => setHover(0)}/>
                                  </label>
                                );
                              })}
                          </div>
                            <div className='rate'>
                              <Button variant='contained' type='submit'>ارسال</Button>
                              <TextField value={note} onChange={(e)=>setNote(e.target.value)} id="outlined-multiline-static" multiline label="ملاحظات" variant='standard'/>
                            </div>
                        </form>
                       :<Button variant='contained' color='error' disabled={ele.cancelRequest || ele.status == 'canceled' || ele.completed} onClick={()=>handleDeleteOpen(ele._id)}>الغاء الحجز</Button>}
                        {ele.status=='unConfirmed'&& <p>{t("user.unconfirm")}</p>}
                        { ele.status=='confirmed'&& <>{ele.completed?<p>{t("user.completed")}</p> :<p>{t("user.confirmed")}</p>}</>}
                        {ele.status=='canceled'&& <p>{t("user.canceled")}</p>}
                    </div>
                  </CardContent>
                </CardActionArea>
                   {ele.cancelRequest&& <Alert style={{marginTop:"20px"}} severity="info">{t("user.cancelRequest")} </Alert>}
              </Card>
          </Grid>
        ))
      }
        </Grid>
      </div>
      :<Link to="/user/signin" style={{textDecoration:"none",color:"#fff"}}><button className='back-btn'> Login </button></Link> 
    }
        <CancelDialoge open={deleteOpen} handleClose={handleDeleteClose} url={"/users/reservation/cancel/"} id={deleteID}/>
      <Footer/>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={()=>setSnackOpen(false)}>
          <Alert onClose={()=>setSnackOpen(false)} severity="warning" sx={{ width: '100%' }}>
            يجب تقييم الجهة قبل الارسال !!
          </Alert>
      </Snackbar>
      <Snackbar open={snackOpen2} autoHideDuration={6000} onClose={()=>setSnackOpen2(false)}>
          <Alert onClose={()=>setSnackOpen2(false)} severity="success" sx={{ width: '100%' }}>
              مشكور على تقييمك
          </Alert>
      </Snackbar>
    </>
  )
}

export default Reservations