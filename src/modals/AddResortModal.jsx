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
import { useTranslation } from 'react-i18next';
import { fetchResort } from './../redux/reducers/resort';
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

function AddResortModal({handleClose,handleOpen,open}) {    
 const [data,setData]=useState({name:'',file:'',area:"",address:"",pool:'',games:'',kitchen:'',bath:'',price:'',details:''})
 const inputFile=useRef()
  const { t, i18n } = useTranslation();
  const dispatch=useDispatch()
 function uploadFiles(e){
  const uploadedFiles = [];
  const files = e.target.files
  for (let i = 0; i < files.length; i++) {
    uploadedFiles.push(files[i]);
  }
  setData({...data,file:uploadedFiles})
}
function handleSubmit(e){
  e.preventDefault();
  Api.post('/admin/resort', data,{
    headers:{
      'Content-Type': 'multipart/form-data',
    } 
   }).then(() => {
      dispatch(fetchResort())
      setData({name:'',file:'',games:'',kitchen:'',pool:'',price:'',details:'',area:''})
      handleClose()
  });
}
 return (
    <div>
      <Modal style={{direction:i18n.language=='en'?'ltr':'rtl'}} open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={style} className='model'>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
            {t("entity.resort")}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="chaletImg">{t("entity.image")}</InputLabel>
                  <TextField ref={inputFile} fullWidth id='chaletImg' variant="outlined" required name="file" type="file"  InputProps={{inputProps: { multiple: true}}}  onChange={uploadFiles}/>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="chaletImg">{t("entity.name")}</InputLabel>
                    <TextField variant="outlined" required type="text"  value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                   <InputLabel htmlFor="chaletImg">{t("entity.area")}</InputLabel>
                    <TextField variant="outlined" required type="number"  value={data.area} onChange={(e)=>setData({...data,area:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="chaletImg">{t("entity.kitchen")}</InputLabel>
                    <TextField variant="outlined" required type="number" value={data.kitchen} onChange={(e)=>setData({...data,kitchen:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                   <InputLabel htmlFor="chaletImg">{t("entity.pools")}</InputLabel>
                    <TextField variant="outlined" required type="number" value={data.pool} onChange={(e)=>setData({...data,pool:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                   <InputLabel htmlFor="chaletImg">{t("entity.games")}</InputLabel>
                    <TextField variant="outlined" required type="number" value={data.games} onChange={(e)=>setData({...data,games:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                   <InputLabel htmlFor="chaletImg">{t("entity.price")}</InputLabel>
                    <TextField variant="outlined" required type="number" value={data.price} onChange={(e)=>setData({...data,price:e.target.value})}/>
                </Grid>
                <Grid item xs={12}>
                   <InputLabel htmlFor="chaletImg">{t("entity.details")}</InputLabel>
                    <TextField variant="outlined" fullWidth type="text" multiline value={data.details} onChange={(e)=>setData({...data,details:e.target.value})}/>
                </Grid>
                <Grid item xs={6}>
                    <Button variant='contained' type='submit' fullWidth style={{backgroundColor:"#B38D46",height:"50px" ,fontSize:"1rem"}}>اضافة</Button>
                </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
export default AddResortModal;