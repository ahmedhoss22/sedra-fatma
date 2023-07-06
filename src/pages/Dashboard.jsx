import React ,{useEffect, useState} from 'react'
import { Button, Grid, Link } from '@mui/material';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "../scss/dashboard.scss"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations } from '../redux/reducers/reservation';
import { useTranslation } from 'react-i18next';
import AddReservation from '../modals/AddReservation';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const unConfirmedData=useSelector((state)=>state.reservation.value.unConfirmed)
  const confirmedData=useSelector((state)=>state.reservation.value.confirmed)
  const deferredData=useSelector((state)=>state.reservation.value.deferred)
  const canceled=useSelector((state)=>state.reservation.value.canceled)
  const [search,setSearch]=useState('')
  const [modal,setModal]=useState({open:false,date:{}})
  const dispatch=useDispatch()
  const navigate=useNavigate()
  let data= [...unConfirmedData,...confirmedData]
  const events=data.map((ele)=>{
    return {title : `${ele.period.dayPeriod} - ${ele.client.name}`,date:ele.period.startDate}
  })
  const handleDateClick = (arg) => {
    const clickedDate = arg.date;
    const formattedDate = clickedDate.toLocaleDateString();
    alert(`Clicked date: ${formattedDate}`);
  };
  const handleClose= ()=>{setModal({open:false}) }
  let filteredDate=events
  if(search)filteredDate=filteredDate.filter((ele)=>ele.title.includes(search))
  useEffect(()=>{dispatch(fetchReservations())},[])



  return (
    <>
      <div className="container" style={{direction:i18n.language=='en'?"ltr":"rtl"}}>
      <h2 >{t("dashboard.title")}</h2>    
      <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
              <div className="box" style={{backgroundColor:"#DDBE1D"}} onClick={()=>navigate('/unConfirmedReservations')}>
                <p>{unConfirmedData.length}</p>
                <p>{t("dashboard.unconfirmed")}</p>
              </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div className="box" style={{backgroundColor:"#5CB854"}} onClick={()=>navigate('/confirmedReservations') }>
              <p>{confirmedData.length}</p>
              <p>{t("dashboard.confirmed")}</p>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div className="box" style={{backgroundColor:"#2BAEB7"}} onClick={()=>navigate('/deferredReservations')}>
              <p>{deferredData.length}</p>
              <p>{t("dashboard.deferred")}</p>
            </div>
          </Grid>
          <Grid item xs={6} md={3}>
            <div className="box" style={{backgroundColor:"#C92626"}} onClick={()=>navigate('/canceledReservations')}>
              <p>{canceled.length}</p>
              <p>{t("dashboard.canceled")}</p>
            </div>
          </Grid>
      </Grid>
      <div className="calender-header">
         <h2>{t("dashboard.timatable")}</h2>
          <div className="group" >
            <span> {t("dashboard.search")} </span>
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={t("dashboard.searchBox")}/>
          </div>
      </div>
          <Button variant='contained' onClick={()=>setModal({open:true})} style={{backgroundColor:"var(--primary)",fontWeight:"700"}}>اضافة حجز</Button>
    <FullCalendar
        plugins={[ dayGridPlugin ]}
        // weekends={false}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={filteredDate}
        />
        </div>
        <AddReservation open={modal.open} handleClose={handleClose}/>
    </>
  )
}

export default Dashboard