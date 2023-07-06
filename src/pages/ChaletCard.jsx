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
import ReservationChalet from '../components/ReservationChalet.jsx';
import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Grid } from '@mui/material';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useTranslation } from 'react-i18next';
import Phone from '../components/Phone.jsx';
import { fetchChalets } from '../redux/reducers/chalet.js';
import Loading from '../components/Loading.jsx';

const responsive = {
  0: { items: 2 },
  568: { items: 2 },
  1024: { items: 4 }
};

const ChaletCard = () => {
  const { t, i18n } = useTranslation();
  let apiKey=REACT_APP_API_URL
  const {id}=useParams()
  const dispatch=useDispatch()
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    dispatch(fetchChalets())
    setTimeout(()=>{setLoading(false)},1000)
  },[])
  let chalets= useSelector((state)=>state.chalet.value.data)
  let data = chalets.find((ele)=>ele._id==id)
  const handleDragStart = (e) => e.preventDefault();
  const [displayImg,setDisplayImg]=useState()
  useEffect(()=>{data&& setDisplayImg(data.images[0])},[data])
  function calcRate(){
    let total=0
  if(data.rate.length){
      total=data.rate.reduce((prev,curr)=>prev+=curr,0)
      total =( total/data.rate.length).toFixed(1)
  } 
  return total 
  }
  return (
        <>
        {
            loading? <Loading open={loading}/>:
          <>
            <Container>
                <h2 style={{textAlign:'right'}} className="my-5">{data.name} <Link to="/home/chalets" style={{color:"var(--dark)"}}> <ArrowForwardIcon/></Link></h2>
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
                    <p>{t("details.chaletArea")} {data.area} <img src={area} alt="" className='logo'/></p>
                    <p>{data.address} <img src={address} alt="" className='logo'/></p>
                    <p>{t("details.rate")} {calcRate()} <img src={rate} alt="" className='logo'/></p>
                </div>
                <div className="discription">
                <h3 className='title' style={{textAlign:i18n.language=='en'?'left':"right"}}>{t("details.description")}</h3>
                    <p className='subtitle' style={{textAlign:i18n.language=='en'?'left':"right"}}>{t("details.resrotSubtitle")}</p>
                    <div className="box">
                        <p> {t("details.bed")} {data.sleeping}<img src={bed} alt="" /> </p>
                        <p> {t("details.kitchen")} {data.kitchen}<img src={kitchen} alt="" /> </p>
                        <p> {t("details.lounge")} {data.lounge}<img src={living} alt="" /> </p>
                        <p> {t("details.bath")} {data.bath}<img src={bath} alt="" /> </p>
                    </div>
                  {data.details&& 
                   <>
                    <p className='subtitle'>{t("details.chaletDetails")}</p>
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
            <ReservationChalet data={data}/> 
          </>
         }
        </>
  )
}

export default ChaletCard