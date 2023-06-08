
import React ,{useEffect , useState ,useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../..//scss/addChalets.scss"
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { fetchBanckTransaction, fetchExpenses, fetchOnlinePayments, fetchPaypal } from '../../redux/reducers/finance';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translate(-50%, 0)',
  width: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function GeneralReport({handleClose,open,startDate,endDate}) {    
  const { t, i18n } = useTranslation();
  const dispatch=useDispatch()
 let paypal=useSelector((state)=>state.finance.value.paypal)
 let onlinePayment=useSelector((state)=>state.finance.value.onlinePayment)
 let banktransaction=useSelector((state)=>state.finance.value.banktransaction)
 let expenses=useSelector((state)=>state.finance.value.expenses)
 useEffect(()=>{
     dispatch(fetchBanckTransaction())
     dispatch(fetchOnlinePayments())
     dispatch(fetchPaypal())
     dispatch(fetchExpenses())
    },[])
    if(startDate) {
        paypal=paypal.filter((ele)=>(new Date(startDate).getTime())<=(new Date(ele.date).getTime()))
        onlinePayment=onlinePayment.filter((ele)=>(new Date(startDate).getTime())<=(new Date(ele.date).getTime()))
        banktransaction=banktransaction.filter((ele)=>(new Date(startDate).getTime())<=(new Date(ele.date).getTime()))
        expenses=expenses.filter((ele)=>(new Date(startDate).getTime())<=(new Date(ele.date).getTime()))
    }
    if(endDate) {
        paypal=paypal.filter((ele)=>(new Date(endDate).getTime())>=(new Date(ele.date).getTime()))
        onlinePayment=onlinePayment.filter((ele)=>(new Date(endDate).getTime())>=(new Date(ele.date).getTime()))
        banktransaction=banktransaction.filter((ele)=>(new Date(endDate).getTime())>=(new Date(ele.date).getTime()))
        expenses=expenses.filter((ele)=>(new Date(endDate).getTime())>=(new Date(ele.date).getTime()))
    }
    const paypalSum=paypal.reduce((prev,curr)=>prev+=parseInt(curr.amount) ,0)
    const onlinePaymentSum=onlinePayment.reduce((prev,curr)=>prev+=parseInt(curr.amount) ,0)
    const banktransactionSum=banktransaction.reduce((prev,curr)=>prev+=parseInt(curr.amount) ,0)
    const expensesSum=expenses.reduce((prev,curr)=>prev+=parseInt(curr.amount) ,0)
    let data=[{sum:paypalSum,label:"بايبال"},{sum:onlinePaymentSum,label:"الدفع اونلاين"},{sum:banktransactionSum,label:"الحولات البنكية"},{sum:expensesSum,label:"المصروفات"}]
 return ( 
    <div >
      <Modal open={open} onClose={handleClose} style={{direction:i18n.language=='en'?'ltr':"rtl",overflow:"scroll"}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={style} className='model'>
          <div style={{display:'flex' ,justifyContent:"space-between"}}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
            {t("reports.general")}   
            </Typography>
            <HighlightOffIcon style={{cursor:"pointer",color:"gray"}} onClick={()=>handleClose()}/>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className='tablehead'>
                <TableRow >
                  <TableCell align='center' className='table-row' width={10}></TableCell>
                  <TableCell align='center' className='table-row'>{t("reports.entity")}</TableCell>
                  <TableCell align='center' className='table-row'>{t("reports.amount")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row,ind) => (
                  <TableRow key={ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" align="center" scope="row"> {ind+1}</TableCell>
                    <TableCell component="th" align="center" scope="row"> {row.label}</TableCell>
                    <TableCell component="th" align="center" scope="row"> {row.sum}</TableCell>
                  </TableRow>
                ))}
                </TableBody>
            </Table>
          </TableContainer>
          <Button variant='contained' color='primary' id='printBtn' style={{margin:'20px auto 0',display:"block"}} onClick={()=>window.print()}>{t("reports.print")}</Button>
        </Box>
      </Modal>
    </div>
  );
}
export default GeneralReport;
 
