import React, { useEffect, useState ,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { REACT_APP_API_URL } from '../.env';
import { Button, InputLabel, TextField } from '@mui/material';
import "../scss/userSetting.scss"
import Footer from './../components/Footer';
import Api from './../config/config';
import { fetchUserData } from './../redux/reducers/user';
import Snackbar from '@mui/material/Snackbar';
import { useTranslation } from 'react-i18next';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
const UserSetting = () => {
  const { t, i18n } = useTranslation();
  const dispatch =useDispatch()
  const apiUrl=REACT_APP_API_URL
  const fileInput=useRef()
  const [passData,setPassData]=useState({newPass:'',confirmNewPass:'',oldPass:''})
  const [errors,setErrors]=useState({email:'',newPass:'',confirmPass:'',oldPass:''})
  const [snackOpen,setSnackOpen]=useState(false)
  const [data,setData]=useState({image:'',name:'',phone:'',email:'',file:''})
  const userData=useSelector((state)=>state.user.value.data)
  useEffect(()=>{setData(userData)},[userData])
  function handleSubmit(e){
    e.preventDefault();
    Api.patch('/users/updateDate',data,{headers:{'Content-Type': 'multipart/form-data'}})
    .then((res)=>{
        dispatch(fetchUserData())
        setErrors({email:''})
        setSnackOpen(true)
        console.log(res.data);
    })
    .catch((err)=>{
        if(err.response.data.email)return setErrors(err.response.data)
    })
  }
  function updatePassword(e){
    e.preventDefault();
    if(passData.newPass.length<8) return setErrors({newPass:"كلمة السر يجب ان تكون اكثر من 8 حروف"})
    if(passData.newPass !== passData.confirmNewPass) return setErrors({confirmPass:"تأكيد كلمة المرور يجب ان تكون متطابقة"})
    Api.patch('/users/updatePassword',passData)
    .then(()=>{
        setErrors({newPass:'',confirmPass:'',oldPass:''})
        setSnackOpen(true)
    })
    .catch((err)=>{
        console.log(err.response.data);
        if(err.response.data.password)return setErrors({oldPass:err.response.data.password})
    })
  }
  return (
    <>
    <div className='userSetting' style={{direction:i18n.language=='en'?'ltr':"rtl"}}>
        <h2>{t("setting.title")}</h2>
        <form className='data' onSubmit={handleSubmit}>
            {data.image?<img src={apiUrl+data.image} key={data.image} alt="profilePicture" /> :<AccountCircleIcon id="icon"/>}
            <InputLabel style={{textAlign:'center'}}>{data.file && data.file.name}</InputLabel>
            <Button variant='outlined' size='medium' id='submitBtn' onClick={()=>fileInput.current.click()}>{t("setting.changeProfile")}</Button>
            <input accept='image/png, image/jpg, image/jpeg' type="file" name='image'  ref={fileInput} style={{display:"none"}} onChange={(e)=>setData({...data,file:e.target.files[0]})}/>
            <>
                <InputLabel>{t("setting.name")}</InputLabel>
                <TextField type='text' variant='outlined' value={data.name} onChange={(e)=>setData({...data,name:e.target.value})} required />
            </>
            <>
                <InputLabel>{t("setting.email")}</InputLabel>
                <TextField type='email' error={errors.email} helperText={errors.email} variant='outlined' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} required />
            </>
            <>
                <InputLabel>{t("setting.phone")}</InputLabel>
                <TextField type='number' variant='outlined' value={data.phone} onChange={(e)=>setData({...data,phone:e.target.value})} required />
            </>
            <Button variant='contained' id='submitBtn' type='submit'>{t("setting.save")}</Button>
        </form>
        <h3>{t("setting.changePassword")}</h3>
        <form className='password' onSubmit={updatePassword}>
            <InputLabel>{t("setting.old")}</InputLabel>
            <TextField type='password' error={errors.oldPass} helperText={errors.oldPass} variant='outlined' value={passData.oldPass} onChange={(e)=>setPassData({...passData,oldPass:e.target.value})} required />
            <InputLabel>{t("setting.new")}</InputLabel>
            <TextField type='password' error={errors.newPass} helperText={errors.newPass} variant='outlined' value={passData.newPass} onChange={(e)=>setPassData({...passData,newPass:e.target.value})} required />
            <InputLabel>{t("setting.repeat")}</InputLabel>
            <TextField type='password' error={errors.confirmPass} helperText={errors.confirmPass} variant='outlined' value={passData.confirmNewPass} onChange={(e)=>setPassData({...passData,confirmNewPass:e.target.value})} required />
            <Button type='submit' variant='contained'>{t("setting.change")}</Button>
        </form>
    </div>
    <Footer/>
    <Snackbar open={snackOpen} autoHideDuration={6000} onClose={()=>setSnackOpen(false)}>
      <Alert onClose={()=>setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
     !! تم التعديل بنجاح 
      </Alert>
    </Snackbar>
    </>
  )
}

export default UserSetting
