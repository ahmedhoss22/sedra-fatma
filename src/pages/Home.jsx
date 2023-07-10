import React ,{useState,useEffect} from 'react'
import "../scss/home.scss"
import {Box,TextField ,InputAdornment, Button} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Nav from 'react-bootstrap/Nav';
import { Link ,Outlet, useNavigate} from 'react-router-dom';
import Halls from './Chalets';
import Footer from '../components/Footer';
import SearchContext from './../components/SearchContext';
import { useSelector,useDispatch } from 'react-redux';
import { setSearch } from '../redux/reducers/chalet';
import { useTranslation } from 'react-i18next';
import SearchModal from '../components/SearchModal';

const Home = () => {
    const { t, i18n } = useTranslation();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [open,setOpen]=useState(false)
    useEffect(()=>{navigate('/home/halls')},[])
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => setValue(newValue);
    const handleClose=()=>setOpen(false)
    const search=useSelector((state)=>state.chalet.value.search)
  return (
    <>
    <div className='home'>      
        <h1>{t("main.title")}</h1>
        <p>{t("main.subtitle")}</p>
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
    </div>    
        <div className='searchBox'>
            <button variant='outlined' onClick={()=>setOpen(true)} style={{direction:i18n.language=='en'?'ltr':"rtl"}}>  {t("main.search")}  <SearchIcon/></button>
        </div>
        <div className="tabs">
        <SearchContext.Provider value={search}>
            <Nav variant="pills" defaultActiveKey="link-1">
                <Nav.Item>
                    <Nav.Link eventKey="link-1"><Link to="/home/halls">{t("cards.halls")}</Link> </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2"><Link to="/home/resort">{t("cards.resorts")} </Link></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" ><Link to="/home/chalets"> {t("cards.chalets")}</Link></Nav.Link>
                </Nav.Item>
            </Nav>
        </SearchContext.Provider>
        </div>
        <Outlet/>
        <Footer/>
        <SearchModal open={open} handleClose={handleClose}/>
    </>
  ) 
}

export default Home