import React ,{useEffect , useState ,useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../scss/addChalets.scss"
import { Grid, InputLabel } from '@mui/material';
import { TextField } from '@mui/material';
import Api from './../config/config';
import { useTranslation } from 'react-i18next';
import { fetchChalets } from './../redux/reducers/chalet';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function AddChaletModal({handleClose,handleOpen,open}) {    
 const [data,setData]=useState({name:'',file:'',area:"",address:"",sleeping:"",lounge:'',kitchen:'',bath:'',nightPrice:'',morningPrice:'',wholeDayPrice:'',details:''})
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
  Api.post('/admin/chalet', data,{
    headers:{
      'Content-Type': 'multipart/form-data',
    } 
   }).then(() => {
      dispatch(fetchChalets())
      setData({name:'',file:'',area:"",address:"",sleeping:"",lounge:'',kitchen:'',bath:'',nightPrice:'',morningPrice:'',wholeDayPrice:'',details:''})
      handleClose()
  });
}
 return (
    <div>
      <Modal style={{direction:i18n.language=='en'?'ltr':'rtl'}} open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={style} className='model'>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:5}}>
            {t("entity.chalet")}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="chaletImg">{t("entity.image")}</InputLabel>
                  <TextField ref={inputFile} fullWidth id='chaletImg' variant="outlined" required name="file" type="file"  InputProps={{inputProps: { multiple: true}}}  onChange={uploadFiles}/>
                </Grid>
                <Grid item xs={4}>
                   <InputLabel htmlFor="chaletImg">{t("entity.name")}</InputLabel>
                    <TextField variant="outlined" required type="text" placeholder="اسم الشاليه" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/>
                </Grid>
                <Grid item xs={4}>
                    <InputLabel htmlFor="chaletImg">{t("entity.area")}</InputLabel>
                    <TextField variant="outlined" required type="number" placeholder="مساحة الشاليه" value={data.area} onChange={(e)=>setData({...data,area:e.target.value})}/>
                </Grid>
                <Grid item xs={4}>
                   <InputLabel htmlFor="chaletImg">{t("entity.bedroom")}</InputLabel>
                    <TextField variant="outlined" required type="number" placeholder="عدد غرف النوم" value={data.sleeping} onChange={(e)=>setData({...data,sleeping:e.target.value})}/>
                </Grid>
                <Grid item xs={4}>
                    <InputLabel htmlFor="chaletImg">{t("entity.lounge")}</InputLabel>
                    <TextField variant="outlined" required type="number" placeholder="عدد الصالات" value={data.lounge} onChange={(e)=>setData({...data,lounge:e.target.value})}/>
                </Grid>
                <Grid item xs={4}>
                    <InputLabel htmlFor="chaletImg">{t("entity.bathrooms")}</InputLabel>
                    <TextField variant="outlined" required type="number" placeholder="عدد الحمامات" value={data.bath} onChange={(e)=>setData({...data,bath:e.target.value})}/>
                </Grid>
                <Grid item xs={4}>
                   <InputLabel htmlFor="chaletImg">{t("entity.kitchen")}</InputLabel>
                    <TextField variant="outlined" required type="number" placeholder="عدد المطابخ" value={data.kitchen} onChange={(e)=>setData({...data,kitchen:e.target.value})}/>
                </Grid>
                <Grid item xs={4}>
                    <InputLabel htmlFor="chaletImg">{t("entity.morningPrice")}</InputLabel>
                    <TextField variant="outlined" required type="number" placeholder={t("entity.morningPrice")} value={data.morningPrice} onChange={(e)=>setData({...data,morningPrice:e.target.value})}/>
                </Grid>
                <Grid item xs={4}>
                    <InputLabel htmlFor="chaletImg">{t("entity.nightPrice")}</InputLabel>
                    <TextField variant="outlined" required type="number" placeholder={t("entity.nightPrice")} value={data.nightPrice} onChange={(e)=>setData({...data,nightPrice:e.target.value})}/>
                </Grid>
                <Grid item xs={4}>
                    <InputLabel htmlFor="chaletImg">{t("entity.wholePrice")}</InputLabel>
                    <TextField variant="outlined" required type="number" placeholder={t("entity.wholePrice")} value={data.wholeDayPrice} onChange={(e)=>setData({...data,wholeDayPrice:e.target.value})}/>
                </Grid>
                <Grid item xs={4}>
                   <InputLabel htmlFor="chaletImg">{t("entity.address")}</InputLabel>
                    <TextField variant="outlined" required type="text" placeholder="عنوان الشاليه" value={data.address} onChange={(e)=>setData({...data,address:e.target.value})}/>
                </Grid>
                <Grid item xs={8}>
                    <InputLabel htmlFor="chaletImg">{t("entity.details")}</InputLabel>
                    <TextField variant="outlined" fullWidth type="text" multiline placeholder="التفاصيل (يجب الفصل بينهم ب - ) " value={data.details} onChange={(e)=>setData({...data,details:e.target.value})}/>
                </Grid>
                <Grid item xs={4}>
                    <Button variant='contained' type='submit' fullWidth style={{backgroundColor:"#B38D46",height:"50px" ,fontSize:"1rem"}}>اضافة</Button>
                </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
export default AddChaletModal;