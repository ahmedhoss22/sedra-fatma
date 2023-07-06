import React ,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {REACT_APP_API_URL} from "../.env.js"
import { Button, Container } from 'react-bootstrap';
import "../scss/chaletCard.scss"
import area from "../assets/area.png"
import address from "../assets/address.png"
import rate from "../assets/rate.png"
import bed from "../assets/bed.png"
import living from "../assets/living.png"
import bath from "../assets/bath.png"
import kitchen from "../assets/kitchen.png";
import ReservationResort from '../components/ReservationResort.jsx';
import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PoolIcon from '@mui/icons-material/Pool';
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import GamesIcon from '@mui/icons-material/Games';
import AliceCarousel from 'react-alice-carousel';
import { useTranslation } from 'react-i18next';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Grid } from '@mui/material';
import Phone from '../components/Phone.jsx';
import { fetchResort } from '../redux/reducers/resort.js';
import Loading from '../components/Loading.jsx';

const responsive = {
  0: { items: 2 },
  568: { items: 2 },
  1024: { items: 4 }
};

const ResortCard = () => {
  
  const { t, i18n } = useTranslation();
  let apiKey=REACT_APP_API_URL
  const {id}=useParams()
  const [loading,setLoading]=useState(true)
  let resorts= useSelector((state)=>state.resort.value.data)
  let data = resorts.find((ele)=> ele._id == id)
  const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(fetchResort())
    setTimeout(()=>{setLoading(false)},1000)
  },[])
  const [displayImg,setDisplayImg]=useState()
  const handleDragStart = (e) => e.preventDefault();
  useEffect(()=>{data&& setDisplayImg(data.images[0])},[data])
  console.log(data);
  console.log(displayImg);
  function calcRate(){
    let total=0
    console.log(data.rate);
  if(data.rate.length!=0){
      total=data.rate.reduce((prev,curr)=>prev+=curr,0)
      total = total/data.rate.length
  } 
  return total 
  }
    return (
        <>
        {
            loading? <Loading open={loading}/>  :
            <>
              <Container>
                  <h2 style={{textAlign:'right'}} className="my-5">{data.name} <Link to="/home/resort" style={{color:"var(--dark)"}}> <ArrowForwardIcon/></Link></h2>
                  <Grid container spacing={2} height={"70vh"} className='image-seaction'>
                    <Grid item xs={12} sm={12} lg={12} style={{height:"70vh"}}>
                      <img src={apiKey+displayImg} alt="" className='mainImg'/>
                    </Grid>
                      <Grid item xs={12} sm={12} lg={12} className='side-images '>
                      <AliceCarousel responsive={responsive} mouseTracking buttonsDisabled dotsDisabled infinite={false} autoPlay autoPlayInterval={3000} vertical disableButtonsControls disableDotsControls>
                        {
                          data.images&& data.images.map((ele ,ind)=>(
                            <img src={apiKey+ele} className='images' alt="" onDragStart={handleDragStart} key={ind} onClick={()=>setDisplayImg(ele)}/>
                            ))
                          }
                          </AliceCarousel>
                      </Grid>
                  </Grid>
                  <div className="rooms my-4">
                      <p>{t("details.resortArea")} {data.area} <img src={area} alt="" className='logo'/></p>
                      <p>{t("details.rate")} {calcRate()} <img src={rate} alt="" className='logo'/></p>
                  </div>
                  <div className="discription">
                      <h3 className='title' style={{textAlign:i18n.language=='en'?'left':"right"}}>{t("details.description")}</h3>
                      <p className='subtitle' style={{textAlign:i18n.language=='en'?'left':"right"}}>{t("details.resrotSubtitle")}</p>
                      <div className="box">
                          <p> {t("cards.pools")} {data.pool} <PoolIcon style={{color:"var(--primary)",margin:"0 10px"}}/></p>
                          <p> {t("details.kitchen")} {data.kitchen} <img src={kitchen} width='20px' height='20px' alt="" /></p>
                          <p> {t("details.games")} {data.games} <GamesIcon style={{color:"var(--primary)",margin:"0 10px"}}/></p>
                      </div>
                      {data.details&& 
                    <>
                      <p className='subtitle' style={{textAlign:i18n.language=='en'?'left':"right"}}>{t("details.ResortsDetails")}</p>
                    <ul className="box2" >
                          {data.details.map((ele)=>(
                            <li>{ele}</li>
                            ))}
                      </ul>
                        </>
                      }
                  </div>
              </Container>
              <Phone/>
              <ReservationResort data={data}/>
          </>
        }
        </>
  )
}

export default ResortCard