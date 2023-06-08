
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
import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { fetchBanckTransaction, fetchOnlinePayments, fetchPaypal } from '../../redux/reducers/finance';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function IncomeReport({handleClose,handleOpen,open,startDate,endDate}) {    
  const { t, i18n } = useTranslation();
  const dispatch=useDispatch()
 let paypal=useSelector((state)=>state.finance.value.paypal)
 paypal=paypal.map((ele)=>({...ele,type:"بايبال"}))
 let onlinePayment=useSelector((state)=>state.finance.value.onlinePayment)
 onlinePayment=paypal.map((ele)=>({...ele,type:"دفع اونلاين"}))
 let banktransaction=useSelector((state)=>state.finance.value.banktransaction)
 banktransaction=paypal.map((ele)=>({...ele,type:"حوالة بنكية"}))
 useEffect(()=>{
    dispatch(fetchBanckTransaction())
    dispatch(fetchOnlinePayments())
    dispatch(fetchPaypal())
},[])
 let filteredData=[...paypal,...onlinePayment,...banktransaction]
 console.log(filteredData);
 if(startDate) filteredData=filteredData.filter((ele)=>(new Date(startDate).getTime())<=(new Date(ele.date).getTime()))
 if(endDate) filteredData=filteredData.filter((ele)=>(new Date(endDate).getTime())>=(new Date(ele.date).getTime()))
 return ( 
    <div>
      <Modal style={{direction:i18n.language=='en'?'ltr':"rtl"}} open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={style} className='model'>
          <div style={{display:'flex' ,justifyContent:"space-between"}}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
            {t("reports.income")} 
            </Typography>
            <HighlightOffIcon style={{cursor:"pointer",color:"gray"}} onClick={()=>handleClose()}/>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className='tablehead'>
                <TableRow >
                  <TableCell align='center' className='table-row' width={10}></TableCell>
                  <TableCell align='center' className='table-row'>{t("reports.donator")}</TableCell>
                  <TableCell align='center' className='table-row'>{t("reports.receiver")}</TableCell>
                  <TableCell align='center' className='table-row'>{t("reports.employee")}</TableCell>
                  <TableCell align='center' className='table-row'>{t("reports.revenue")}</TableCell>
                  <TableCell align='center' className='table-row'>{t("reports.typeIncome")}</TableCell>
                  <TableCell align='center' className='table-row'>{t("reports.date")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row,ind) => (
                  <TableRow key={ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" align="center" scope="row"> {ind+1}</TableCell>
                    <TableCell component="th" align="center" scope="row"> {row.donater}</TableCell>
                    <TableCell component="th" align="center" scope="row"> {row.reciver}</TableCell>
                    <TableCell component="th" align="center" scope="row"> {row.employee}</TableCell>
                    <TableCell component="th" align="center" scope="row"> {row.amount}</TableCell>
                    <TableCell component="th" align="center" scope="row"> {row.type}</TableCell>
                    <TableCell component="th" align="center" scope="row"> {row.date}</TableCell>
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
export default IncomeReport;
 