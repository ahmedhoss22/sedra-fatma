import React ,{useEffect , useState ,useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../scss/addChalets.scss"
import { Grid, InputLabel } from '@mui/material';
import { TextField } from '@mui/material';
import Api from './../config/config';
import { useDispatch } from 'react-redux';
import { fetchExpenses } from '../redux/reducers/finance';
import { useTranslation } from 'react-i18next';

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

function AddExpensesModal({handleClose,handleOpen,open,data:temp ,update}) {    
 const [data,setData]=useState({type:"",reciver:"",billType:'',amount:'',date:"",bill:''})
 const [errors,setErrors]=useState({email:"",password:"",confirmPassword:''})
  const { t, i18n } = useTranslation();
  const [period,setPeriod]=useState(0)
 const dispatch=useDispatch()
 useEffect(()=>{if(temp)setData({...temp})
},[temp])
  const fileInputRef = useRef(null);
  const handleButtonClickUpload = () => {
    fileInputRef.current.click();
  };
  function handleUploadFile(e) {
    const uploadedFile = e.target.files[0];
    setData(prevData => ({
      ...prevData,
      file: uploadedFile
    }));
  }
function handleSubmit(e){
  e.preventDefault();
  let url = update? '/admin/expenses/update':'/admin/expenses';
  Api.post(url,data,{headers:{
    'Content-Type': 'multipart/form-data',
  } })
  .then(()=>{
    dispatch(fetchExpenses())
    handleClose()
  })
  .catch((err)=>console.log(err))
}
const buttonGroup = [
  { label: 'بضمان',enLabel:"Guarantee", value: "بضمان"},
  { label: 'بدون ضمان',enLabel:"no Guarantee", value: "بدون ضمان"},
];
const handleButtonClick = (index) => {
  setPeriod(index);
};
 return (
    <div>
      <Modal style={{direction:i18n.language=='en'?"ltr":"rtl"}} open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={style} className='model'>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
              {t("finance.addExpenses")} 
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth required type="text" placeholder={t("finance.receiver")} value={data.reciver} onChange={(e)=>setData({...data,reciver:e.target.value})}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth required type="text" placeholder={t("finance.expensesType")} value={data.type} onChange={(e)=>setData({...data,type:e.target.value})}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth required type="number" placeholder={t("finance.amount")} value={data.amount} onChange={(e)=>setData({...data,amount:e.target.value})}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" fullWidth required type="text" placeholder={t("finance.pillType")} value={data.billType} onChange={(e)=>setData({...data,billType:e.target.value})}/>
                </Grid>
                <Grid item>
                  <Button variant="contained" className='bills-btn' onClick={handleButtonClickUpload}>
                    {t("finance.addPill")}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    value={data.bill}
                    onChange={handleUploadFile}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="btns-box">
                      {buttonGroup.map((button, index) => (
                        <Button  key={index} className={period === index ? 'active btns' : 'btns'} onClick={() => handleButtonClick(index)}>
                          {i18n.language=='en'? button.enLabel:button.label}
                        </Button>
                    ))}
                  </div>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' type='submit' fullWidth className='bills-btn'>{t("finance.add")}</Button>
                </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
export default AddExpensesModal;
