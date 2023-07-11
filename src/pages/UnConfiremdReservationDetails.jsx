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
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Divider } from '@mui/material';
import AddPayment from '../modals/AddPayment';
import ReservationServices from '../modals/ReservationServices';
import ReservationFreeReservation from '../modals/ReservationFreeReservation';
import Request from '../modals/Request';
import Api from '../config/config';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const UnConfiremdReservationDetails
 = () => {
  let share=useSelector((state)=>state.reservation.value.share)
  const {id}=useParams()
  const dispatch =useDispatch()
  const { t, i18n } = useTranslation();
  const [payment,setPayment]=useState({open:false,update:false,data:{type:"نقدي"}})
  const [servicesData,setServicesDate]=useState([])
  const [freeServices,setFreeServices]=useState({open:false,update:false,data:{}})
  const [services,setServices]=useState({open:false,update:false,data:{}})
  const [request,setRequest]=useState({open:false,update:false,data:{}})
  const [freeServicesDate,setFreeServicesDate]=useState([])
  const data=useSelector((state)=>state.reservation.value.unConfirmed)
  const reservation=data.filter((ele)=>ele._id==id)[0]
  const [requestDate,setRequestDate]=useState([])
  let totalInsurance = parseFloat(reservation?.payment?.reduce((prev,cur)=>{return prev+=parseFloat(cur?.insurance)},0))
  let totalPaid = parseFloat(reservation?.payment?.reduce((prev,cur)=>{return prev+=parseFloat(cur?.paid)},0))
  let totalServices =parseFloat(servicesData.reduce((prev,cur)=>{return prev+=parseFloat(cur?.price)},0)) +parseFloat(requestDate.reduce((prev,cur)=>{return prev+=parseFloat(cur?.price)},0))

  useEffect(()=>{ 
    dispatch(fetchReservations())
    fetchServices()
  },[])

  const handleShare =async () => {
    await dispatch(shareOn())
    document.body.style.backgroundColor = 'white';
    await domtoimage.toBlob(document.body)
    .then((blob) => {
      saveAs(blob, 'page.png');
    })
    // const reader = new FileReader();
// reader.readAsDataURL(blob); 
// reader.onloadend = function() {
//   const base64data = reader.result;  

//   // Send the base64 string via WhatsApp using the Twilio API
//   const accountSid = 'your_account_sid';
//   const authToken = 'your_auth_token';
//   const client = require('twilio')(accountSid, authToken);

//   client.messages
//     .create({
//       body: 'Here is the screenshot',
//       from: 'whatsapp:+14155238886', // your Twilio number
//       to: 'whatsapp:+1234567890', // recipient's number
//       mediaUrl: base64data
//     })
//     .then(message => console.log(message.sid))
//     .done();
// }
    await  dispatch(shareOff())
  };
  
  const fetchServices = async()=>{
    await Api.get(`/admin/reservation/service/${id}`)
    .then((res)=>{
      let temp =res.data
      let tempServices , tempFree, tempRequest=[]
      tempServices= temp.filter((ele)=>ele.type=='service')
      tempFree= temp.filter((ele)=>ele.type=='free')
      tempRequest= temp.filter((ele)=>ele.type=='request')
      setServicesDate(tempServices)
      setFreeServicesDate(tempFree)
      setRequestDate(tempRequest)
    })
    .catch((err)=>console.log(err.message))
  }

  function handleClose(){
    setPayment({open:false,update:false,data:{type:"نقدي"}})
    setFreeServices({open:false,update:false})
    setServices({open:false,update:false})
    setRequest({open:false,update:false})
  }
  const handleDelete=async (id)=>{
   await Api.delete(`/admin/reservation/service/${id}`)
   .then(()=> fetchServices())
  }
  const handeleDeletePayment=async(paymentId)=>{
    await Api.patch(`/admin/payment/${id}`,{id:paymentId})
    .then(()=> dispatch(fetchReservations()) )
  }
    return (
    <>
    <header>
        {<LocalPrintshopIcon id="share" className='onshare' onClick={()=>window.print()}/>}
        <div className="details shareon">
            <div className='text'>
              <p>تفاصيل الحجز بجميع الخدمات</p>
              <p> اسم العميل : {reservation?.client?.name} </p>
              <p> رقم العميل : {reservation?.client?.phone} </p>
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
            <TableRow className='shareon hide' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" className='table-data'>رقم العميل</TableCell>
              <TableCell align="center" className='table-data'> {reservation?.client?.phone}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" className='table-data'>رقم العقد</TableCell>
              <TableCell align="center" className='table-data'> {reservation?.contractNumber }</TableCell>
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
            {/* <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" className='table-data'> مبلغ الموظف</TableCell>
              <TableCell align="center" className='table-data'> 0</TableCell>
            </TableRow> */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" className='table-data'> اجمالي المصروفات</TableCell>
              <TableCell align="center" className='table-data'>  {totalServices}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" className='table-data'>المتبقي</TableCell>
              <TableCell align="center" className='table-data'>  {(reservation?.cost + totalServices) - totalPaid}</TableCell>
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
    <div className='pay shareoff'>
      <Button variant='contained'  className='onshare' id="btn" onClick={()=>setFreeServices({...freeServices,open:true,update:false})}>الخدمات المجانية <AddIcon/></Button>
      <TableContainer component={Paper} className='table-print'>
        <Table  aria-label="simple table">
          <TableHead className='tablehead'>
            <TableRow >
              <TableCell align='center' className='table-row'>الخدمة المجانية</TableCell>
              <TableCell align='center' className='table-row'>العدد</TableCell>
              <TableCell align='center' className='table-row'>الملاحظات</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {freeServicesDate.map((row)=>(
              <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center"> {row.service}</TableCell>
                <TableCell align="center"> {row.number}</TableCell>
                <TableCell align="center"> {row.note}</TableCell>
                <TableCell align="center"><Button variant='contained' color='warning' onClick={()=>setFreeServices({...freeServices,open:true,update:true})}>تعديل</Button></TableCell>
                <TableCell align="center"><Button variant='contained' color='error' onClick={()=>handleDelete(row._id)}>حذف</Button></TableCell>
              </TableRow>
             )) }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <div className='pay shareoff'>
     <Button variant='contained'  className='onshare' id="btn" onClick={()=>setServices({...services,open:true,update:false})}>الخدمات الاضافية <AddIcon/></Button>
      <TableContainer component={Paper} className='table-print'>
        <Table  aria-label="simple table">
          <TableHead className='tablehead'>
            <TableRow >
              <TableCell align='center' className='table-row'>الخدمة الاضافية</TableCell>
              <TableCell align='center' className='table-row'>النوع</TableCell>
              <TableCell align='center' className='table-row'>العدد</TableCell>
              <TableCell align='center' className='table-row'>المبلغ الكلي</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicesData.map((row)=>(
                <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center"> {row.service}</TableCell>
                  <TableCell align="center"> {row.package}</TableCell>
                  <TableCell align="center"> {row.number}</TableCell>
                  <TableCell align="center"> {row.price}</TableCell>
                  <TableCell align="center"><Button variant='contained' color='warning' onClick={()=>setServices({...services,open:true,update:true,data:row})}>تعديل</Button></TableCell>
                  <TableCell align="center"><Button variant='contained' color='error' onClick={()=>handleDelete(row._id)}>حذف</Button></TableCell>
                </TableRow>
              )) }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <div className='pay shareoff'>
    <Button variant='contained'  className='onshare' id="btn" onClick={()=>setRequest({...request,open:true,update:false})}> اضافة مطلب <AddIcon/></Button>
      <TableContainer component={Paper} className='table-print'>
        <Table  aria-label="simple table">
          <TableHead className='tablehead'>
            <TableRow >
              <TableCell align='center' className='table-row'>الخدمة الاضافية</TableCell>
              <TableCell align='center' className='table-row'>البيان</TableCell>
              <TableCell align='center' className='table-row'>السعر</TableCell>
              <TableCell align='center' className='table-row'>الملاحظات</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {requestDate.map((row)=>(
                <TableRow  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center"> {row.service}</TableCell>
                  <TableCell align="center"> {row.statement}</TableCell>
                  <TableCell align="center"> {row.price}</TableCell>
                  <TableCell align="center"> {row.note}</TableCell>
                  <TableCell align="center"><Button variant='contained' color='warning' onClick={()=>setRequest({...request,open:true,update:true,data:row})}>تعديل</Button></TableCell>
                  <TableCell align="center"><Button variant='contained' color='error' onClick={()=>handleDelete(row._id)}>حذف</Button></TableCell>
                </TableRow>
              )) }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <AddPayment handleClose={handleClose} open={payment.open} update={payment.update} data={payment.data}/>
    <ReservationFreeReservation fetchData={fetchServices} handleClose={handleClose} open={freeServices.open} update={freeServices.update} tempData={freeServices.data}/>
    <ReservationServices fetchData={fetchServices} handleClose={handleClose} open={services.open} update={services.update} tempData={services.data}/>
    <Request fetchData={fetchServices} handleClose={handleClose} open={request.open} update={request.update} tempData={request.data}/>
    </>
  ) 
}

export default UnConfiremdReservationDetails

