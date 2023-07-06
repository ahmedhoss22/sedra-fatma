import React, { useState } from 'react';
import '../scss/signup.scss';
import logo from '../assets/Logo 1.png';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Api from '../config/config';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [data, setData] = useState({ name: '', phone: '', password: '' ,confirmPassword:'',email:''});
  const [confirm,setConfirm]=useState('')
  const [phone,setPhone]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  function handleSubmit(e){
    e.preventDefault()
    if(data.password.length<8) return setPassword("Password must be more than 8 characters")
    else setPassword("")
    if(data.password!==data.confirmPassword) return setConfirm("Password must be same")
    else setConfirm("")
    Api.post('/users/signup',data)
    .then(()=>{
      setData({ name: '', phone: '', password: '' ,confirmPassword:'',email:''})
      setPhone("")
      setConfirm("")
      navigate('/user/signin')
    })
    .catch((err)=>{
      console.log(err.response.data.email);
      let phoneMsg =err.response.data.phone
      let emailMsg =err.response.data.email
      let passErr=err.response.data.password
      if(passErr) setPassword(passErr)
      else setPassword("")
      if(phoneMsg) setPhone(phoneMsg)
      else setPhone("")
      if(emailMsg) setEmail(emailMsg)
      else setEmail("")
    })
  }
  return (
    <div className='contain'>
      <div className='cont'>
        <div className='logo'>
          <img src={logo} alt='log' />
        </div>
        <h2>سدرة فاطمة للمناسبات و الايجار اليومي</h2>
        <form onSubmit={handleSubmit}>
          <h3>انشاء حساب</h3>
          <TextField
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B38D46' },
              '& .MuiInputLabel-outlined': { color: '#515151' },
            }}
            required
            id='outlined-basic'
            placeholder='الأسم'
            value={data.name}
            onChange={(e)=>setData({...data,name:e.target.value})}
            variant='outlined'
            
          />
          <TextField sx={{'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B38D46' },'& .MuiInputLabel-outlined': { color: '#515151' },}}
            required
            id='outlined-basic'
            placeholder='البريد الالكتروني'
            value={data.email}
            onChange={(e)=>setData({...data,email:e.target.value})}
            error={email}
            helperText={email}
            variant='outlined'
            type='email'
          />
          <TextField sx={{'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B38D46' },'& .MuiInputLabel-outlined': { color: '#515151' },}}
            required
            id='outlined-basic'
            placeholder='رقم الهاتف'
            value={data.phone}
            onChange={(e)=>setData({...data,phone:e.target.value})}
            error={phone}
            helperText={phone}
            variant='outlined'
            type='number'
          />
          <TextField
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B38D46' },
              '& .MuiInputLabel-outlined': { color: '#515151' },
            }}
            required
            id='outlined-basic'
            value={data.password}
            onChange={(e)=>setData({...data,password:e.target.value})}
            placeholder='كلمة السر'
            variant='outlined'
            type='password'
            error={password}
            helperText={password}
          />
          <TextField
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B38D46' },
              '& .MuiInputLabel-outlined': { color: '#515151' },
            }}
            required
            id='outlined-basic'
            value={data.confirmPassword}
            onChange={(e)=>setData({...data,confirmPassword:e.target.value})}
            placeholder='تأكيد كلمة السر'
            variant='outlined'
            error={confirm}
            helperText={confirm}
            type='password'
          />
          <div className="btns">
            <Button variant='contained' type='submit' className='btn'>استمرار</Button>
            <Button variant='contained' type='button' className='btn' onClick={()=>navigate('/user/signin')}>تسجيل الدخول</Button>
          </div>
        </form>
        <div className="buble1"></div>
        <div className="buble2"></div>
        <div className="buble3"></div>
      </div>
    </div>
  );
};

export default Signup;
