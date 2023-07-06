import React ,{useEffect , useState} from 'react'
import { TextField, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Select, MenuItem } from '@mui/material';
import "../scss/addChalets.scss"
import { useDispatch, useSelector } from 'react-redux';
import { fetchInsurance, fetchReservations } from '../redux/reducers/reservation';
import { fetchHall } from '../redux/reducers/hall';
import { useTranslation } from 'react-i18next';
import Api from '../config/config';
import InsuranceDialoge from '../components/InsuranceDialoge';
import InsuranceFinanceModal from './../modals/InsuranceFinanceModal';

const InsurancesHalls = () => {

  const user=useSelector((state)=>state.employee.value.user)
  const dispatch=useDispatch()
  const [search,setSearch]=useState('')
  const [selectedOption, setSelectedOption] = useState(0);
  const [tempID,setTempId]=useState()
  const [open,setOpen]=useState(false)
  const { t, i18n } = useTranslation();
  const [openModel,setOpenModel]=useState(false)
  const [tempData,setTempDate]=useState()
  const handleCloseModel=()=>{
    setTempDate('')
    setOpenModel(false)
  }
  const handleEdit=(data)=>{
    setTempDate(data)
    setOpenModel(true)
  }
  const handleClose=()=>{
    setTempId('')
    setOpen(false)
  }
  let halls=useSelector((state)=>state.reservation.value.confirmed)
  let data = halls.filter((ele)=>ele.type=='hall')
  console.log(data);
  useEffect(()=>{
    dispatch(fetchReservations())
  },[])
  const OpenSubmit=(id)=>{
    setTempId(id)
    setOpen(true)
  }
  const handleOptionChange = (event) => setSelectedOption(event.target.value);
  let filteredData= data.filter((ele)=> {
    let sum = ele.payment.reduce((prev,cur)=>prev+=cur.insurance,0)
    return sum
  })
   if(selectedOption==1) filteredData = data.filter((ele)=>!ele.restored)
   if(selectedOption==2) filteredData = data.filter((ele)=>ele.restored)
   if(search) filteredData= data.filter((ele)=>ele.clientName.includes(search))
  return (
    <div style={{direction:i18n.language=='en'?'ltr':"rtl"}}>
    {(user.admin || (user.permissions&&user.permissions.insurance))?
    <div className="cont">
    <h2>{t("insurance.hall")}</h2>
    <div className="search-box">  
      <TextField type="text" variant="outlined" value={search} placeholder={t("search")} onChange={(e)=>setSearch(e.target.value)} sx={{marginLeft:"20px",borderRadius:"50px"}}/>
      <Select style={{ borderColor: '#000000', borderWidth: '2px', borderRadius: '8px' , '&:focus': {
      borderColor: '#FF0000', // change the border color to red when focused
    }, }}  value={selectedOption} onChange={handleOptionChange} >
         <MenuItem value={0}>{t("insurance.all")}</MenuItem>
         <MenuItem value={1}>{t("insurance.notReturned")}</MenuItem>
         <MenuItem value={2}>{t("insurance.returned")}</MenuItem>
      </Select>
    </div>
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead className='tablehead'>
          <TableRow >
            <TableCell align='center' className='table-row'>{t("insurance.client")} </TableCell>
            <TableCell align='center' className='table-row'>{t("insurance.employee")}</TableCell>
            <TableCell align='center' className='table-row'>{t("insurance.amount")}</TableCell>
            <TableCell align='center' className='table-row'>{t("insurance.damage")}</TableCell>
            <TableCell align='center' className='table-row'>{t("insurance.returned")}</TableCell>
            <TableCell align='center' className='table-row'>{t("date")}</TableCell>
            <TableCell align='center' className='table-row'></TableCell>
            {/* <TableCell align='center' className='table-row'></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row,ind) => (
            <TableRow key={ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell  align="center" scope="row"> {row?.client?.name}</TableCell>
              <TableCell align="center">{row?.employee}</TableCell>
              <TableCell  align="center" scope="row"> {row.payment.reduce((prev,cur)=>prev+=cur.insurance,0)}</TableCell>
              <TableCell align="center">{row?.damage}</TableCell>
              <TableCell align="center">{row.restored?t("insurance.returned"):t("insurance.notReturned")}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              {!row.restored && <TableCell align="center"><Button variant='contained' style={{backgroundColor:"var(--primary)"}} size='small' onClick={()=>OpenSubmit(row._id)}>{t("insurance.return")}</Button></TableCell>}
              {/* {!row.restored && <TableCell align="center"><Button variant='contained' style={{backgroundColor:"var(--primary)"}} size='small' onClick={()=>handleEdit(row)}>{t("insurance.edit")}</Button></TableCell>} */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <InsuranceFinanceModal open={openModel} data={tempData} handleClose={handleCloseModel}/>
    <InsuranceDialoge open={open} handleClose={handleClose} id={tempID}/>
    </div>:<h3 style={{textAlign:"center"}}>Sorry, this page not available</h3>}
    </div>
  )
}

export default InsurancesHalls