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
import AddPaypal from '../modals/AddPaypal';
import { Select, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import ConfirmedReservationModal from '../modals/ConfirmedReservationModal';
import { fetchNotification, fetchReservations } from './../redux/reducers/reservation';
// import DeferredModal from '../modals/DeferredModal';
import DeleteDialoge from './../components/DeleteDialoge';
import CompleteDialoge from '../components/CompleteDialoge';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
const ConfirmerdReservarions = () => {
  const navigate=useNavigate()
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [update,setUpdate]=useState(false)
  const [deleteID,setDeleteID]=useState()
  const [complete,setComplete]=useState(false)
  const data=useSelector((state)=>state.reservation.value.confirmed)
  const [temp,setTemp]=useState()
  const user=useSelector((state)=>state.employee.value.user)
  const [deleteOpen,setDeleteOpen]=useState(false)
  console.log(data);
  const [tempComplete,setTempComplete]=useState(false)
  const handleOpen = () => setOpen(true);
  const handleDeleteClose=()=> setDeleteOpen(false)
  const handleClose = () => {
    setOpen(false)
    setTemp({})
    setUpdate(false)
    setUpdate(false)
    setComplete(false)
  };
  const [search,setSearch]=useState('')
  const dispatch=useDispatch()
   useEffect(()=>{
    dispatch(fetchReservations())
    removeNotification()
  },[])
  function removeNotification(){
    Api.patch("/admin/notification",{type:"confirmed"})
    .then(()=>dispatch(fetchNotification()))
  }
  function handleDeleteOpen(id){
    setDeleteID(id)
    setDeleteOpen(true)
  }
  function handleOpenEdit(data,status){
    setTemp({...data,
      clientName:data.client.name,
      clientPhone:data.client.phone,
      startDate:data.period.startDate,
      dayPeriod:data.period.dayPeriod,
      endDate:data.period.endDate,
      cost:data.cost,
      insurance:data.insurance
    })
    if(status=='edit'){
      setOpen(true)
      setUpdate(true)
    }
  }
  function completeOpen(data){
      setComplete(true)
      setTempComplete(data)    
  }
  let filteredData=data
  if(search) filteredData=filteredData.filter((ele)=>ele.client.name.includes(search) || ele.entity.name.includes(search)|| ele.date.includes(search) || ele.contractNumber>=search)
 
  // if(selectedOption ==2) filteredData =filteredData.filter((ele)=> ele.place=='hall')
  // if(selectedOption ==3) filteredData =filteredData.filter((ele)=> ele.place=='resort')
  // if(selectedOption ==4) filteredData =filteredData.filter((ele)=> ele.place=='chalet')
  return (
    <div className="cont" style={{direction:i18n.language=='en'?'ltr':"rtl"}}>
    <h2>{t("reservation.confirmed")}</h2>
    <div className="search-box">  
      <TextField type="text" variant="outlined" value={search} placeholder={t("search")}onChange={(e)=>setSearch(e.target.value)} sx={{marginLeft:"20px",borderRadius:"50px"}}/>
      {/* <Select className={classes.select} value={selectedOption} onChange={handleOptionChange}>
        <MenuItem value={1}>الكل</MenuItem>
        <MenuItem value={2}>القاعات</MenuItem>
        <MenuItem value={3}>الشاليهات</MenuItem>
        <MenuItem value={4}>المنتجعات</MenuItem>
      </Select> */}
      {/* {(user.admin || (user.permissions&&user.permissions.addReservation))&&<Button onClick={handleOpen} variant='contained' className='btn'>{t("reservation.addReservation")} </Button>} */}
    </div>
    <TableContainer component={Paper} className='table-print'>
      <Table  aria-label="simple table">
        <TableHead className='tablehead'>
          <TableRow >
            <TableCell align='center' className='table-row'>{t("reservation.contractNumber")}</TableCell>
            <TableCell align='center' className='table-row'>{t("reservation.client")}</TableCell>
            <TableCell align='center' className='table-row'>{t("reservation.entity")}</TableCell>
            <TableCell align='center'width={170}  className='table-row'>{t("reservation.period")}</TableCell>
            {/* <TableCell align='center' className='table-row'>المتبقي</TableCell> */}
            <TableCell align='center'width={140} className='table-row'>{t("date")}</TableCell>
            {(user.admin || (user.permissions&&user.permissions.deferreReservation))&&<TableCell align='center' className='table-row'></TableCell>}
            {(user.admin || (user.permissions&&user.permissions.removeReservation))&&<TableCell align='center' className='table-row'></TableCell>}
            {(user.admin || (user.permissions&&user.permissions.editReservation))&&<TableCell align='center' className='table-row'></TableCell>}
            {(user.admin || (user.permissions&&user.permissions.editReservation))&&<TableCell align='center' className='table-row'></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row,ind) => (
            <TableRow key={ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center"> {row.contractNumber}</TableCell>
              <TableCell align="center"> {row.client.name}</TableCell>
              <TableCell align="center"> {row.entity?.name}</TableCell>
              {row.period.type=='days'&& <TableCell align="center" > {`${row.period.startDate} / ${row.period.endDate}`}</TableCell>}
              {row.period.type=='dayPeriod'&& <TableCell align="center" > {`${row.period.startDate} / ${row.period.dayPeriod}`}</TableCell>}
              {/* <TableCell align="center"> {row.finance.remain}</TableCell> */}
              <TableCell align="center"> {row.date }</TableCell>
              {(user.admin || (user.permissions&&user.permissions.removeReservation))&&<TableCell align="center" className='row-hidden-print'><Button variant='contained' size='small' style={{backgroundColor:'var(--fc-now-indicator-color)'}} onClick={()=>handleDeleteOpen(row._id)}>{t("reservation.delete")}</Button></TableCell> }
              {(user.admin || (user.permissions&&user.permissions.editReservation))&&<TableCell align="center" className='row-hidden-print'><Button variant='contained' size='small' color='info' onClick={()=>handleOpenEdit(row,'edit')}>{t("reservation.edit")}</Button></TableCell> }
              {(user.admin || (user.permissions&&user.permissions.editReservation))&&<TableCell align="center" className='row-hidden-print'><Button variant='contained' size='small' color='warning' onClick={()=>navigate(`/reservationDetails/${row._id}`)}>{t("reservation.resDetails")}</Button></TableCell> }
              {(user.admin || (user.permissions&&user.permissions.editReservation))&&<TableCell align="center" className='row-hidden-print'><Button variant='contained' disabled={row.completed} size='small' color='secondary' onClick={()=>completeOpen(row)}>{t("reservation.complete")}</Button></TableCell> }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          <DeleteDialoge open={deleteOpen} handleClose={handleDeleteClose} url={"/admin/reservation/delete/"} id={deleteID}/>
          <ConfirmedReservationModal update={update} handleClose={handleClose} data={temp} handleOpen={handleOpen} open={open}/>
          {/* <DeferredModal update={update} handleClose={handleClose} data={temp} handleOpen={handleOpen2} open={open2}/> */}
          <CompleteDialoge handleClose={handleClose} data={tempComplete} open={complete}/>
</div>
  )
}

export default ConfirmerdReservarions