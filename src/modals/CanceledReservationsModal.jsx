import React ,{useEffect , useState ,useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../scss/addChalets.scss"
import { Grid, InputLabel } from '@mui/material';
import { TextField } from '@mui/material';
import Api from '../config/config';
import { useDispatch } from 'react-redux';
import { fetchEmploees } from '../redux/reducers/employee';
import { Select, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
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

const CanceledReservationsModal = ({handleClose,handleOpen,open,data:temp}) => {
const [selectedOption, setSelectedOption] = useState(1);
const classes = useStyles();
const handleOptionChange = (event) => setSelectedOption(event.target.value);
    
    const [data,setData]=useState({contractNo:"",client:"",place:"",period:'',date:"",amount:'',paid:'',remain:'',tax:''})
 const dispatch=useDispatch()
 useEffect(()=>{if(temp)setData(temp)
},[temp])

function handleSubmit(e){
  e.preventDefault();
  let url = temp? '/employee/data/update':'/employee/data';
  console.log(url);
  Api.post(url, data)
  .then(() => {
      dispatch(fetchEmploees())
      setData({name:'',nationalId:'',phone:"",email:"",password:"",confirmPassword:''})
      handleClose()
  })
  .catch((err)=>{
    console.log(err.message);
  })
}
  return (
    <div>
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
      <Box sx={style} className='model'>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
                اضافة حجز  ملغية 
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
              <Grid item xs={6}>
                  <TextField variant="outlined" fullWidth required type="text" placeholder="اسم العميل" value={data.client} onChange={(e)=>setData({...data,client:e.target.value})}/>
              </Grid>
              <Grid item xs={6}>
                  <TextField variant="outlined" fullWidth required type="number" placeholder="رقم العقد" value={data.contractNo} onChange={(e)=>setData({...data,contractNo:e.target.value})}/>
              </Grid>
              <Grid item xs={6}>
                  <TextField variant="outlined" fullWidth required type="text" placeholder="الفترة" value={data.period} onChange={(e)=>setData({...data,period:e.target.value})}/>
              </Grid>
              <Grid item xs={6}>
                  <TextField variant="outlined" fullWidth required type="number" placeholder="مبلغ الحجز" value={data.amount} onChange={(e)=>setData({...data,amount:e.target.value})}/>
              </Grid>
              <Grid item xs={6}>
                  <TextField variant="outlined" fullWidth required type="number" placeholder="المدفوع" value={data.paid} onChange={(e)=>setData({...data,paid:e.target.value})}/>
              </Grid>
              <Grid item xs={6}>
                  <TextField variant="outlined" fullWidth required type="number" placeholder="المتبقي" value={data.remain} onChange={(e)=>setData({...data,remain:e.target.value})}/>
              </Grid>
              <Grid item xs={6}>
                  <TextField variant="outlined" fullWidth required type="number" placeholder="الضريبة" value={data.tax} onChange={(e)=>setData({...data,tax:e.target.value})}/>
              </Grid>
              <Grid item xs={6}>
              <Select className={classes.select} value={selectedOption} onChange={handleOptionChange} fullWidth>
                <MenuItem value={1}>قاعة</MenuItem>
                <MenuItem value={2}>منتجع</MenuItem>
                <MenuItem value={3}>شاليه</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                  <Button variant='contained' type='submit' fullWidth style={{backgroundColor:"#B38D46",height:"50px" ,fontSize:"1rem"}}>اضافة</Button>
              </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  </div>
  ) 
}

export default CanceledReservationsModal