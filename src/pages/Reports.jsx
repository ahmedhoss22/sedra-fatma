import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../scss/report.scss';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import ReservationsRevenue from '../modals/reports/ReservationsRevenue';
import HallReservations from '../modals/reports/HallReservations';
import ChaletReservation from '../modals/reports/ChaletReservation';
import ResortReservation from '../modals/reports/ResortReservation';
import WithdrawReport from '../modals/reports/WithdrawReport';
import CanceledReservations from './../modals/reports/CanceledReservations';
import DeferredReservations from './../modals/reports/DeferredReservations';
import IncomeReport from '../modals/reports/IncomeReport';
import GeneralReport from '../modals/reports/GeneralReport';
import RatesReport from '../modals/reports/RatesReport';
import { useTranslation } from 'react-i18next';

const Reports = () => {
  const { t, i18n } = useTranslation();
  const data=useSelector((state)=>state.employee.value.data)
  const [open,setOpen]=useState({reservationRevenue:false,hallReservation:false,chaletReservation:false,resortReservation:false,withdrawReport:false,cancledReservation:false,deferredReservation:false,income:false,general:false,rates:false})
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleStartDateChange = (date) =>setStartDate(date)
  const handleEndDateChange = (date) => setEndDate(date);
  const handleClose=()=> setOpen({reservationRevenue:false,hallReservation:false,chaletReservation:false,resortReservation:false,withdrawReport:false,cancledReservation:false,deferredReservation:false,income:false,general:false,rates:false})
  return (
    <div className='cont' style={{direction:i18n.language=='en'?'ltr':'rtl',margin:i18n.language=='en'?'10vh 10vh 0 0':"10vh 0 0 10vh"}}>
      <h2>{t("reports.title")}</h2>
      <div className="date-picker-container">
          <div className="date-picker">
            <span>{t("reports.from")}</span>
            <DatePicker selected={startDate} onChange={handleStartDateChange} selectsStart startDate={startDate} endDate={endDate} dateFormat="yyyy/MM/dd"/>
          </div>
          <div className="date-picker">
            <label>{t("reports.to")}</label>
            <DatePicker selected={endDate} onChange={handleEndDateChange} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} dateFormat="yyyy/MM/dd"/>
          </div>
      </div>
      <Grid container spacing={4} margin={'20px'}>
        <Grid xs={6}>
            <div className="item" onClick={()=>setOpen({reservationRevenue:true})}>{t("reports.resRevnue")}</div>
        </Grid>
        <Grid xs={6}>
            <div className="item" onClick={()=>setOpen({chaletReservation:true})} >{t("reports.chaletReserv")}</div>
        </Grid>
        <Grid xs={6}>
            <div className="item" onClick={()=>setOpen({hallReservation:true})}>{t("reports.hallReserv")}</div>
        </Grid>
        <Grid xs={6}>
            <div className="item" onClick={()=>setOpen({resortReservation:true})}>{t("reports.resortReserv")}</div>
        </Grid>
        <Grid xs={6}>
            <div className="item" onClick={()=>setOpen({cancledReservation:true})}>{t("reports.canceledtReserv")}</div>
        </Grid>
        <Grid xs={6}>
            <div className="item" onClick={()=>setOpen({deferredReservation:true})}>{t("reports.deferredReserv")}</div>
        </Grid>
        <Grid xs={6}>
            <div className="item" onClick={()=>setOpen({withdrawReport:true})}>{t("reports.draws")}</div>
        </Grid>
        <Grid xs={6}>
            <div className="item" onClick={()=>setOpen({income:true})}>{t("reports.income")}</div>
        </Grid>
        <Grid xs={6}>
            <div className="item" onClick={()=>setOpen({rates:true})}>{t("reports.rates")}</div>
        </Grid>
        <Grid xs={6}>
            <div className="item" onClick={()=>setOpen({general:true})}>{t("reports.general")}</div>
        </Grid>
      </Grid>
      <ReservationsRevenue open={open.reservationRevenue} handleClose={handleClose} startDate={startDate} endDate={endDate}/>
      <HallReservations open={open.hallReservation} handleClose={handleClose} startDate={startDate} endDate={endDate}/>
      <ChaletReservation open={open.chaletReservation} handleClose={handleClose} startDate={startDate} endDate={endDate}/>
      <ResortReservation open={open.resortReservation} handleClose={handleClose} startDate={startDate} endDate={endDate}/>
      <WithdrawReport open={open.withdrawReport} handleClose={handleClose} startDate={startDate} endDate={endDate}/>
      <CanceledReservations open={open.cancledReservation} handleClose={handleClose} startDate={startDate} endDate={endDate}/>
      <DeferredReservations open={open.deferredReservation} handleClose={handleClose} startDate={startDate} endDate={endDate}/>
      <IncomeReport open={open.income} handleClose={handleClose} startDate={startDate} endDate={endDate}/>
      <GeneralReport open={open.general} handleClose={handleClose} startDate={startDate} endDate={endDate}/>
      <RatesReport open={open.rates} handleClose={handleClose} startDate={startDate} endDate={endDate}/>
    </div>
  )
}
export default Reports