import React ,{useEffect} from 'react'
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
import { fetchResort } from './../redux/reducers/resort';
import { useTranslation } from 'react-i18next';
import AddResortModal from './../modals/AddResortModal';
const AddRessort = () => {
  const user=useSelector((state)=>state.employee.value.user)
  const [open, setOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch=useDispatch()
  const data=useSelector((state)=>state.resort.value.data)
  useEffect(()=>{dispatch(fetchResort())},[])

  function handleDelete(id){
    Api.delete(`/admin/resort/delete/${id}`)
    .then((res)=>dispatch(fetchResort()))
    .catch((err)=>console.log(err.response.data))
  }
  return (
    <div className="cont" style={{direction:i18n.language=='en'?'ltr':'rtl'}}>
      <h2>{t("entity.resort")}</h2>
      <div className="search-box">  
        <TextField type="text" variant="outlined" placeholder="بحث" sx={{marginLeft:"20px",borderRadius:"50px"}}/>
        {(user.admin || (user.permissions&&user.permissions.addEntity))&&<Button onClick={handleOpen} variant='contained' className='btn'>{t("entity.resort")}</Button>}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className='tablehead'>
            <TableRow >
              <TableCell align='center' className='table-row'>{t("entity.name")}</TableCell>
              <TableCell align='center' className='table-row'>{t("entity.area")}</TableCell>
              <TableCell align='center' className='table-row'>{t("entity.kitchen")}</TableCell>
              <TableCell align='center' className='table-row'>{t("entity.pools")}</TableCell>
              <TableCell align='center' className='table-row'>{t("entity.games")}</TableCell>
              <TableCell align='center' className='table-row'>{t("entity.morningPrice")}</TableCell>
              <TableCell align='center' className='table-row'>{t("entity.nightPrice")}</TableCell>
              <TableCell align='center' className='table-row'>{t("entity.wholePrice")}</TableCell>
              {(user.admin || (user.permissions&&user.permissions.removeEntity))&&<TableCell align='center' className='table-row'>{t("entity.delete")}</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row,ind) => (
              <TableRow key={ind} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.area}</TableCell>
                <TableCell align="center">{row.kitchen}</TableCell>
                <TableCell align="center">{row.pool}</TableCell>
                <TableCell align="center">{row.games}</TableCell>
                <TableCell align="center">{row?.price?.morning}</TableCell> 
                <TableCell align="center">{row?.price?.night}</TableCell> 
                <TableCell align="center">{row?.price?.wholeDay}</TableCell> 
                {(user.admin || (user.permissions&&user.permissions.removeEntity))&&<TableCell align="center"><Button variant='contained' color='error' onClick={()=>handleDelete(row._id)}>حذف</Button></TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddResortModal handleClose={handleClose} handleOpen={handleOpen} open={open}/>
</div>
  )
}

export default AddRessort