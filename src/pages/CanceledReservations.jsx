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
import { Select, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import CanceledReservationsModal from '../modals/CanceledReservationsModal';
import { fetchReservations } from '../redux/reducers/reservation';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({

  select: {
    borderColor: '#000000',
    marginLeft: '20px',
    minWidth: '100px',
    borderWidth: '2px',
    borderRadius: '8px',
    '&:focus': {
      borderColor: 'red', 
    },
  },
}));

const CanceledReservations = () => {
  const [search,setSearch]=useState('')
  const { t, i18n } = useTranslation();
  const dispatch=useDispatch()
  const data=useSelector((state)=>state.reservation.value.canceled)
  useEffect(()=>{dispatch(fetchReservations())},[])


  let filteredData=data
  if(search) filteredData=filteredData.filter((ele)=>ele.client.name.includes(search) ||ele.date.includes(search) || ele.entity.name.includes(search)|| ele.date.includes(search))
  return (
    <div className="cont"  style={{direction:i18n.language=='en'?"ltr":"rtl"}}>
    <h2>{t("reservation.canceled")}</h2>
    <div className="search-box">  
      <TextField type="text" variant="outlined" value={search} placeholder={t("search")} onChange={(e)=>setSearch(e.target.value)} sx={{marginLeft:"20px",borderRadius:"50px"}}/>
    </div>
    <TableContainer component={Paper} className='table-print'>
      <Table  aria-label="simple table">
        <TableHead className='tablehead'>
          <TableRow >
            <TableCell align='center' className='table-row'>{t("reservation.contractNumber")}</TableCell>
            <TableCell align='center' className='table-row'>{t("reservation.client")}</TableCell>
            <TableCell align='center' className='table-row'>{t("reservation.entity")}</TableCell>
            <TableCell align='center' className='table-row'>{t("reservation.period")}</TableCell>
            <TableCell align='center' className='table-row'>{t("reservation.amount")}</TableCell>
            <TableCell align='center' className='table-row'>{t("date")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row,ind) => (
            <TableRow key={ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center"> {row.contractNumber}</TableCell>
              <TableCell align="center"> {row.client.name}</TableCell>
              <TableCell align="center">{row.entity.name}</TableCell>
              {row.period.startDate!==row.period.endDate&& <TableCell align="center" > {`${row.period.startDate} / ${row.period.endDate}`}</TableCell>}
              {row.period.startDate==row.period.endDate&& <TableCell align="center" > {`${row.period.startDate} / ${row.period.dayPeriod}`}</TableCell>}
              <TableCell align="center">{row.finance.cost}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</div>
  )
}

export default CanceledReservations ;
