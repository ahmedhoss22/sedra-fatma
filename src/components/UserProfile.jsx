import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import user from "../assets/user.png"
import SettingsIcon from '@mui/icons-material/Settings';
import "../scss/Userprofile.scss"
import { useTranslation } from 'react-i18next';
import { REACT_APP_API_URL } from '../.env';
import { useNavigate } from 'react-router-dom';
import { fetchUserData, logout } from '../redux/reducers/user';

const UserProfile = ({open,close}) => {
    let apiKey=REACT_APP_API_URL
  const { t, i18n } = useTranslation();
  const dispatch=useDispatch()
    const navigate=useNavigate()
    let data=useSelector((state)=>state.user.value.data)
    let logedin=useSelector((state)=>state.user.value.logedin)
    const handleLogout=()=>{
        localStorage.removeItem('userToken')
        close()
        dispatch(fetchUserData())
        dispatch(logout())
    }
    function handleSetting(){
        close()
        navigate('/userSetting')
    }
    return (
    <div className='userProfile' style={{display:open?'flex':'none'}}>
        <div className="title">
            <h2>{t("profile.profile")}</h2>
            <button type='button' onClick={()=>close()} style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%'}} className='text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray'>
                <HighlightOffIcon/>
             </button>
        </div>
{  logedin&&  <>    <div className="info" style={{display:data.name?"flex":"none"}}>
            {data.image?<img src={apiKey+data.image} alt="" height="40px" width="40px"/>:<img src={user} alt="" height="40px" width="40px"/>}
            <div className="userData" >
                <p className='username'>{data.name}</p>
                <p className='visitor'>{data.phone} </p>
            </div>
        </div>
        <button className="setting" style={{display:data.name?"flex":"none"}} onClick={handleSetting}>
            <div>
                <h5>{t("profile.myProfile")}</h5>
                <p>{t("profile.setting")}</p>
            </div>
            <SettingsIcon/>
        </button></>}
        <div className="logout">
            {logedin&& <button onClick={handleLogout}>{t("profile.logout")}</button>}
            {!logedin && <button onClick={(()=> navigate('/user/signin'))}>{t("profile.login")}</button>}
        </div>
    </div>
  )
}

export default UserProfile