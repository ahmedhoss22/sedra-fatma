import React ,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {fetchUserData} from "../redux/reducers/user"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../scss/navbar.scss"
import user from "../assets/user.png"
import logo from "../assets/Logo 1.png"
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';
import { REACT_APP_API_URL } from '../.env';
import Arabic from "../assets/suadia.png"
import English from "../assets/en.jpg"
import { useTranslation } from 'react-i18next';

function NavbarComp() {
  const dispatch=useDispatch()
  let apiKey=REACT_APP_API_URL
  const { t, i18n } = useTranslation();
  let data=useSelector((state)=>state.user.value.data)
  const [open,setOpen]=useState(false)
    let logedin=useSelector((state)=>state.user.value.logedin)
    const handleClose=()=> setOpen(false)
  return (
    <>
      <Navbar expand="lg" className='navBar' >
        <Container className='cont'>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

          {i18n.language=='ar'&& <button className='translation' onClick={()=>i18n.changeLanguage('en')}><img src={Arabic} alt="arabic"/></button>}
          {i18n.language=='en'&& <button className='translation' onClick={()=>i18n.changeLanguage('ar')}><img src={English} alt="arabic"/></button>}
          <Navbar.Brand className='brand' onClick={()=>setOpen(true)}>
            {data.image?<img src={apiKey+ data.image} alt="" />: <img src={user} alt="" />}
            <div className="userData">
              <p className='username'>{logedin?data.name:"اسم المستخدم"}</p>
              <p className='visitor'>{t("navbar.visitor")}</p>
            </div>
          </Navbar.Brand>
          </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className='collapse'>
              <Nav style={{alignItems:"center"}}>
                  <div className='logo'>
                      <img src={logo} alt="logo" height="45px" width="45px"/>
                      <p>{t("navbar.badge")}</p>
                </div>
                <Nav.Link className='navlink'> <Link to="/home" style={{color:'unset',display:"block",width:"100%"}}>{t("navbar.main")}</Link></Nav.Link>
                <Nav.Link className='navlink'> <Link to='/reservations' style={{color:'unset',display:"block",width:"100%"}}>{t("navbar.reservation")}</Link></Nav.Link>
                <NavDropdown className='m-0 custom-nav-dropdown' style={{width:"90px"}} title="العروض" id="basic-nav-dropdown">
                  <NavDropdown.Item > <Link to="/chalet/page" style={{color:'unset',display:"block",width:"100%"}}> الشاليهات</Link></NavDropdown.Item>
                  <NavDropdown.Item><Link to="/resort/page" style={{color:'unset',display:"block",width:"100%"}}>المنتجعات</Link>  </NavDropdown.Item>
                  <NavDropdown.Item> <Link to="/hall/page" style={{color:'unset',display:"block",width:"100%"}}>  القاعة</Link></NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className='navlink'> <Link to='/termsAndCondition' style={{color:'unset'}}>{t("navbar.terms")}</Link></Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      <UserProfile open={open} close={handleClose}/>
    </>
  
  );
}

export default NavbarComp;