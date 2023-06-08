import React ,{useEffect , useState} from 'react'
import { TextField, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../scss/addChalets.scss"
import { useDispatch, useSelector } from 'react-redux';
import Api from './../config/config';
import { fetchEmploees } from './../redux/reducers/employee';
import { Select, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import UnconfirmedReservationsModal from '../modals/UnconfirmedReservationsModal';
import { fetchReservations } from '../redux/reducers/reservation';
import format from 'date-fns/format'
import DeleteDialoge from './../components/DeleteDialoge';
import ConfirmDialoge from '../components/ConfirmDialoge';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  select: {
    borderColor: '#000000',
    marginLeft: '20px',
    minWidth: '100px',
    borderWidth: '2px',
    borderRadius: '8px',
    '&:focus': {
      borderColor: 'red', // change the border color to custom variable when focused
    },
  },
}));
const UnConfirmedReservations = () => {
  const dispatch=useDispatch()
  const { t, i18n } = useTranslation();
  const user=useSelector((state)=>state.employee.value.user)
  const [open, setOpen] = React.useState(false);
  const [snackOpen,setSnackOpen]=useState(false)
  const [update,setUpdate]=useState(false)
  const [temp,setTemp]=useState()
  const [deleteOpen,setDeleteOpen]=useState(false)
  const handleOpen = () => setOpen(true);
  const classes = useStyles();
  const data=useSelector((state)=>state.reservation.value.unConfirmed)
  const handleDeleteClose=()=> setDeleteOpen(false)
  const [deleteID,setDeleteID]=useState()
  const [confirmData,setConfirmData]=useState()
  const [confirmOpen,setConfirmOpen]=useState(false)
  const handleConfirmClose=()=>setConfirmOpen(false)
  useEffect(()=>{dispatch(fetchReservations())},[])
  const handleClose = () => {
    setOpen(false)
    setTemp({})
    setUpdate(false)
  };
  const [search,setSearch]=useState('')
  function handleDeleteOpen(id){
    setDeleteID(id)
    setDeleteOpen(true)
  }
  function handleConfirmOpen(data){
    setConfirmData(data)
    setConfirmOpen(true)
  }
  function handleOpenEdit(data){
    setTemp({clientName:data.client.name,
      startDate:data.period.startDate,
      endDate:data.period.endDate,
      cost:data.finance.cost,
      entityId:data.entity.id,
      dayPeriod:data.period.dayPeriod,
      _id:data._id
    })
    setUpdate(true)
    setOpen(true)
  }
  function handleAccept(){
    setConfirmOpen(false)
    Api.patch('/admin/reservation',{
      _id:confirmData._id,
      period:confirmData.period.dayPeriod,endDate:confirmData.period.endDate,startDate:confirmData.period.startDate})
    .then(()=>dispatch(fetchReservations()))
    .catch((err)=>{if(err.response.status==403) setSnackOpen(true)})
 }
  let filteredData=data
  if(search) filteredData=filteredData.filter((ele)=>ele.client.name.includes(search) || ele.entity.name.includes(search)|| ele.period.dayPeriod.includes(search)|| ele.date.includes(search))
  // if(selectedOption ==2) filteredData =filteredData.filter((ele)=> ele.place=='hall')
  // if(selectedOption ==3) filteredData =filteredData.filter((ele)=> ele.place=='resort')
  // if(selectedOption ==4) filteredData =filteredData.filter((ele)=> ele.place=='chalet')
  return (
    <div className="cont" style={{direction:i18n.language=='en'?'ltr':"rtl"}}>
    <h2>{t("reservation.unConfirmed")}</h2>
    <div className="search-box">  
      <TextField type="text" variant="outlined" value={search} placeholder={t("search")} onChange={(e)=>setSearch(e.target.value)} sx={{marginLeft:"20px",borderRadius:"50px"}}/>
      {/* <Select
        className={classes.select}
  value={selectedOption}
  onChange={handleOptionChange}
>
  <MenuItem value={1}>الكل</MenuItem>
  <MenuItem value={2}>القاعات</MenuItem>
  <MenuItem value={3}>الشاليهات</MenuItem>
  <MenuItem value={4}>المنتجعات</MenuItem>
</Select> */}
      {(user.admin || (user.permissions&&user.permissions.addReservation))&&<Button onClick={handleOpen} variant='contained' className='btn'>{t("reservation.addReservation")}</Button>}
    </div>
    <TableContainer component={Paper} className='table-print'>
      <Table  aria-label="simple table">
        <TableHead className='tablehead'>
          <TableRow >
            <TableCell align='center' className='table-row'>{t("reservation.client")}</TableCell>
            <TableCell align='center' className='table-row'>{t("reservation.entity")}</TableCell>
            <TableCell align='center' className='table-row'>{t("reservation.period")}</TableCell> 
            <TableCell align='center' className='table-row'>{t("reservation.duration")}</TableCell>
            <TableCell align='center' className='table-row'>{t("reservation.amount")}</TableCell>
            <TableCell align='center' className='table-row'>{t("date")}</TableCell>
            {(user.admin || (user.permissions&&user.permissions.editReservation))&&<TableCell align='center' className='table-row'></TableCell>}
            {(user.admin || (user.permissions&&user.permissions.removeReservation))&&<TableCell align='center' className='table-row'></TableCell>}
            {(user.admin || (user.permissions&&user.permissions.acceptReservation))&&<TableCell align='center' className='table-row'></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row,ind) => (
            <TableRow key={ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center"> {row.client.name}</TableCell>
              <TableCell align="center">{row.entity.name}</TableCell>
              <TableCell align="center">{row.period.dayPeriod}</TableCell>
              <TableCell align="center">{` ${row.period.startDate}/ ${row.period.endDate}`}</TableCell>
              <TableCell align="center">{row.finance.cost}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              {(user.admin || (user.permissions&&user.permissions.editReservation))&&<TableCell align="center" className='row-hidden-print'><Button variant='contained' size='small' color='warning' onClick={()=>handleOpenEdit(row)}>{t("reservation.edit")}</Button></TableCell> }
              {(user.admin || (user.permissions&&user.permissions.removeReservation))&&<TableCell align="center" className='row-hidden-print'><Button variant='contained' size='small' style={{backgroundColor:'var(--fc-now-indicator-color)'}} onClick={()=>handleDeleteOpen(row._id)}>{t("reservation.delete")}</Button></TableCell> }
              {(user.admin || (user.permissions&&user.permissions.acceptReservation))&&<TableCell align="center" className='row-hidden-print'><Button variant='contained' size='small' color='success' onClick={()=>handleConfirmOpen(row)}>{t("reservation.confirm")}</Button></TableCell> }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          <UnconfirmedReservationsModal handleClose={handleClose} update={update} data={temp} handleOpen={handleOpen} open={open}/>
          <DeleteDialoge open={deleteOpen} handleClose={handleDeleteClose} url={"/admin/reservation/delete/"} id={deleteID}/>
          <ConfirmDialoge open={confirmOpen} handleAccept={handleAccept} handleClose={handleConfirmClose} url={"/admin/reservation"}/>
        <Snackbar open={snackOpen} autoHideDuration={6000} onClose={()=>setSnackOpen(false)}>
          <Alert onClose={()=>setSnackOpen(false)} severity="warning" sx={{ width: '100%' }}>
            يوجد حجز بالفعل في هذه الفترة   !!
          </Alert>
        </Snackbar>
</div>
  )
}

export default UnConfirmedReservations
