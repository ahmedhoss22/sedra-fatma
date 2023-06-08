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
import AddCutomerModal from '../modals/AddCustomer';
import { fetchCustomer } from './../redux/reducers/customer';
import { useTranslation } from 'react-i18next';

const Customers = () => {
  const user=useSelector((state)=>state.employee.value.user)
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [temp,setTemp]=useState()
  const dispatch=useDispatch()
  const [update,setUpdate]=useState(false)
  useEffect(()=>{dispatch(fetchCustomer())},[])
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setUpdate(false)
    setOpen(false)
  }
  const [search,setSearch]=useState('')
  let data=useSelector((state)=>state.customer.value.data)
  function handleDelete(id){
    Api.delete(`/admin/customer/delete/${id}`)
    .then((res)=>dispatch(fetchCustomer()))
    .catch((err)=>console.log(err.response.data))
  }
  function handleOpenEdit(data){
    setTemp(data)
    setOpen(true)
    setUpdate(true)
  }
  let filteredData=data
  if(search) filteredData=filteredData.filter((ele)=>ele.name.includes(search))
  return (
    <div  style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
    {(user.admin || (user.permissions&&user.permissions.addClient))?<div className="cont">
      <h2 >{t("client.title")}</h2>
      <div className="search-box">  
        <TextField type="text" variant="outlined" value={search} placeholder={t("dashboard.search")} onChange={(e)=>setSearch(e.target.value)} sx={{marginLeft:"20px",borderRadius:"50px"}}/>
        <Button onClick={handleOpen} variant='contained' className='btn'>{t("client.addBtn")}</Button>
      </div>
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead className='tablehead'>
            <TableRow >
              <TableCell align='center' className='table-row'>{t("client.name")}</TableCell>
              <TableCell align='center' className='table-row'>{t("client.id")}</TableCell>
              <TableCell align='center' className='table-row'>{t("client.phone")}</TableCell>
              <TableCell align='center' className='table-row'>{t("client.phone2")}</TableCell>
              <TableCell align='center' className='table-row'>{t("client.address")}</TableCell>
              <TableCell align='center' className='table-row'></TableCell>
              <TableCell align='center' className='table-row'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row,ind) => (
              <TableRow key={ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center"> {row.name}</TableCell>
                <TableCell align="center"> {row.nationalId}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.phone2}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center"><Button variant='contained' size='small' color='warning' onClick={()=>handleOpenEdit(row)}>{t("client.edit")}</Button></TableCell> 
                <TableCell align="center"><Button variant='contained' size='small' color='error' onClick={()=>handleDelete(row._id)}>{t("client.delete")}</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
            <AddCutomerModal update={update} handleClose={handleClose} data={temp} handleOpen={handleOpen} open={open}/>
    </div>:<h3 style={{textAlign:"center"}}>Sorry, this page not available</h3>}
    </div>
  )
}

export default Customers;