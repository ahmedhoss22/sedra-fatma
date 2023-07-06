import React ,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {REACT_APP_API_URL} from "../.env.js"
import { Button, Container } from 'react-bootstrap';
import "../scss/chaletCard.scss"
import area from "../assets/area.png"
import rate from "../assets/rate.png"
import { useState } from 'react';
import CabinIcon from '@mui/icons-material/Cabin';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import ReservationHall from '../components/ReservationHall.jsx';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Grid } from '@mui/material';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useTranslation } from 'react-i18next';
import Phone from '../components/Phone.jsx';
import { fetchHalls } from '../redux/reducers/hall.js';
import Loading from './../components/Loading';
const responsive = {
  0: { items: 2 },
  568: { items: 2 },
  1024: { items: 4 }
};
const HallCard = () => {
  const dispatch=useDispatch()
  const handleDragStart = (e) => e.preventDefault();
  const [loading,setLoading]=useState(true)
  const {id}=useParams()
  const { t, i18n } = useTranslation();
  useEffect(()=>{
    dispatch(fetchHalls())
    setTimeout(()=>{setLoading(false)} ,1000)
  },[])
  let apiKey=REACT_APP_API_URL
  let halls= useSelector((state)=>state.hall.value.data)
  let data= halls.find((ele)=>ele._id==id)
  const [displayImg,setDisplayImg]=useState()
  useEffect(()=>{data&& setDisplayImg(data.images[0])},[data])
  function calcRate(){
    let total=0
  if(data?.rate.length!=0){
      total=data.rate.reduce((prev,curr)=>prev+=curr,0)
      total = total/data.rate.length
  } 
  return total 
  }
    return (
        <>
        {
            loading? <Loading open={loading}/>:
            <>
            <Container>
                <h2 style={{textAlign:'right'}} className="my-5">{data?.name}<Link to="/home/halls" style={{color:"var(--dark)"}}> <ArrowForwardIcon/></Link></h2>
                <Grid container spacing={2} height={"70vh"} className='image-seaction'>
                  <Grid item xs={12} sm={12} lg={12} style={{height:"70vh"}}>
                    <img src={apiKey+displayImg} alt="" className='mainImg'/>
                  </Grid>
                    <Grid item xs={12} sm={12} lg={12} className='side-images '>
                    <AliceCarousel responsive={responsive} mouseTracking buttonsDisabled dotsDisabled infinite={false} autoPlay autoPlayInterval={3000} vertical disableButtonsControls disableDotsControls>
                      {
                        data?.images&& data?.images.map((ele ,ind)=>(
                           <img src={apiKey+ele} className='images' alt="" onDragStart={handleDragStart} key={ind} onClick={()=>setDisplayImg(ele)}/>
                          ))
                        }
                        </AliceCarousel>
                    </Grid>
                </Grid>
                <div className="rooms my-4">
                    <p>{t("details.hallCapacity")} {data?.capacity} <img src={area} alt="" className='logo'/></p>
                    <p>{t("details.rate")} {calcRate()} <img src={rate} alt="" className='logo'/></p>
                </div>
                <div className="discription">
                    <h3 className='title' style={{textAlign:i18n.language=='en'?'left':"right"}}>{t("details.description")}</h3>
                    <p className='subtitle' style={{textAlign:i18n.language=='en'?'left':"right"}}>{t("details.hallSubtitle")}</p>
                    <div className="box">
                        <p style={{direction:i18n.language=='en'?'ltr':"rtl"}}> {t("details.halls")} {data?.halls} <HolidayVillageIcon style={{color:"var(--primary)",fontSize:"1.7rem"}}/> </p>
                        <p style={{direction:i18n.language=='en'?'ltr':"rtl"}}> {t("details.rooms")} {data?.rooms} <CabinIcon style={{color:"var(--primary)",fontSize:"1.7rem"}}/> </p>
                    </div>
                    {data?.details&& 
                   <>
                      <p className='subtitle' style={{textAlign:i18n.language=='en'?'left':"right"}}>{t("details.hallsDetails")}</p>
                    <ul className="box2" >
                          {data?.details.map((ele)=>(
                            <li>{ele}</li>
                            ))}
                    </ul>
                    </>
                    }
                </div>
            </Container>
        
        <ReservationHall data={data}/>
        <Phone/>
        </>
        }
        </>
  )
}

export default HallCard