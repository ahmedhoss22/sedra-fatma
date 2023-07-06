import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, shareOff, shareOn } from './../redux/reducers/reservation';
import logo from '../assets/Logo 1.png';
import "../scss/reservationsDetails.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Divider } from '@mui/material';
import AddPayment from '../modals/AddPayment';
import Api from '../config/config';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const UnConfiremdReservationDetails = () => {
  const {id}=useParams()
  const dispatch =useDispatch()
  const [payment,setPayment]=useState({open:false,update:false,data:{type:"نقدي"}})
  const data=useSelector((state)=>state.reservation.value.unConfirmed)
  const reservation=data.filter((ele)=>ele._id==id)[0]
  let totalInsurance = parseFloat(reservation?.payment?.reduce((prev,cur)=>{return prev+=parseFloat(cur?.insurance)},0))
  let totalPaid = parseFloat(reservation?.payment?.reduce((prev,cur)=>{return prev+=parseFloat(cur?.paid)},0))

  useEffect(()=>{ 
    dispatch(fetchReservations())
  },[])

  function handleClose(){
    setPayment({open:false,update:false,data:{type:"نقدي"}})
  }

  const handeleDeletePayment=async(paymentId)=>{
    await Api.patch(`/admin/payment/${id}`,{id:paymentId})
    .then(()=> dispatch(fetchReservations()) )
  }
  console.log(data);
    return (
    <>
    <header>
        {<LocalPrintshopIcon id="share" className='onshare' onClick={()=>window.print()}/>}
        <div className="details shareon">
            <div className='text'>
              <p>تفاصيل الحجز بجميع الخدمات</p>
              <p> اسم العميل : {reservation?.client?.name} </p>
              <p> رقم العميل : {reservation?.client?.phone} </p>
              {reservation?.period.type=='days' && <p> الفترة : {`${reservation?.period?.startDate} /  ${reservation?.period?.endDate}`} </p>}
              {reservation?.period.type=='dayPeriod' && <p> الفترة : {`${reservation?.period?.startDate} /  ${reservation?.period?.dayPeriod}`} </p>}
            </div>
            <img src={logo} alt='logo' height="60px" width="60px" />          
        </div>
    </header>
    <TableContainer component={Paper} className='table-print'>
      <Table  aria-label="simple table">
            <TableRow style={{border:0}} className='shareon hide'  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                 <TableCell align="center" colSpan={2} style={{border:0}} className='table-data'>
                    <img src={logo} alt='logo' height="60px" width="60px" />
                    <h2>سدرة فاطمة</h2>
                    <p>تفاصيل الحجز بجميع الحجوزات</p> 
                   </TableCell>
            </TableRow>
        <TableBody style={{border:"1px solid"}}>
            <TableRow className='shareon hide'  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" className='table-data'>اسم العميل</TableCell>
              <TableCell align="center" className='table-data'> {reservation?.client?.name}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" className='table-data'> مبلغ الحجز</TableCell>
              <TableCell align="center" className='table-data'> {reservation?.cost }</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" className='table-data'> التأمين</TableCell>
              <TableCell align="center" className='table-data'> {totalInsurance}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" className='table-data'> المدفوع</TableCell>
              <TableCell align="center" className='table-data'> {totalPaid}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>
    <div className='pay shareoff'>
     <Button variant='contained'  className='onshare' id="btn" onClick={()=>setPayment({...payment,open:true,update:false})}>دفعات <AddIcon/></Button>
      <TableContainer component={Paper} className='table-print'>
        <Table  aria-label="simple table">
          <TableHead className='tablehead'>
            <TableRow >
              <TableCell align='center' className='table-row'>نوع الدفع</TableCell>
              <TableCell align='center' className='table-row'>المبلغ</TableCell>
              <TableCell align='center' className='table-row'>مبلغ التأمين</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {reservation?.payment?.map((ele,index)=>(
              <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center"> {ele?.type}</TableCell>
                <TableCell align="center"> {ele?.paid}</TableCell>
                <TableCell align="center"> {ele?.insurance}</TableCell>
                <TableCell align="center"><Button variant='contained' color='warning' onClick={()=>setPayment({...payment,open:true,update:true,data:{...ele,index}})}>تعديل</Button></TableCell>
                <TableCell align="center"><Button variant='contained' color='error' onClick={(()=>handeleDeletePayment(ele._id))}>حذف</Button></TableCell>
              </TableRow>
             )) }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <AddPayment handleClose={handleClose} open={payment.open} update={payment.update} data={payment.data}/>
    </>
  ) 
}

export default UnConfiremdReservationDetails
