import React, { useEffect, useState } from 'react';
import '../scss/signin.scss';
import logo from '../assets/Logo 1.png';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Api from './../config/config';
import { useNavigate } from 'react-router-dom';
import { setLog, setLogout } from '../redux/reducers/employee';
import { useDispatch } from 'react-redux';

const Signin = () => {
  const dispatch=useDispatch()
  const [data, setData] = useState({  email: '', password: '' });
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  function handleSubmit(e){
    e.preventDefault()
    Api.post('/employee/signin',data)
    .then((res)=>{
      localStorage.setItem('adminToken',res.data.token)
      dispatch(setLog())
      setData({email: '', password: '' })
      setEmail("")
      navigate('/')
    })
    .catch((err)=>{
      console.log(err);
      let phoneMsg =err.response.data.email
      let passwordMsg =err.response.data.password
      if(phoneMsg) setEmail(phoneMsg); else setEmail("")
      if(passwordMsg) setPassword(passwordMsg); else setPassword('')
    })
  }
  return (
    <div className='contain'>
      <div className='cont'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
        <h2>سدرة فاطمة للمناسبات و الايجار اليومي</h2>
        <form onSubmit={handleSubmit}>
          <h3>تسجيل الدخول</h3>
          <TextField sx={{'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { borderColor: '#B38D46' },'& .MuiInputLabel-outlined': { color: '#515151' },}}
            required
            id='outlined-basic'
            placeholder="البريد الالكتروني"
            value={data.email}
            onChange={(e)=>setData({...data,email:e.target.value})}
            error={email}
            helperText={email}
            variant='outlined'
            type='email'
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
          <div className="btns">
            <Button variant='contained' type='submit' className='btn'>الدخول</Button>
          </div>
        </form>
        {/* <div className="buble1"></div> */}
        {/* <div className="buble2"></div> */}
        {/* <div className="buble3"></div> */}
      </div>
    </div>
  );
};

export default Signin;