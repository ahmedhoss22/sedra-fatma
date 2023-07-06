import React ,{useEffect, useState} from 'react';
import Sidebar from './components/Sidebar';
import "./scss/app.scss"
import { Routes ,Route, BrowserRouter } from 'react-router-dom';
import AddChalet from './pages/AddChalet';
import AddRessort from './pages/AddRessort';
import AddHalls from './pages/AddHalls';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfirmedReservations from './pages/ConfirmedReservations';
import UnConfirmedReservations from './pages/UnConfirmedReservations';
import CanceledReservations from './pages/CanceledReservations';
import DeferredReservations from './pages/DeferredReservations';
import Paypal from './pages/Paypal';
import OnlinePayment from './pages/OnlinePayment';
import BankTransactions from './pages/BankTransactions';
import InsurancesChalet from './pages/InsurancesChalet';
import InsurancesHalls from './pages/InsurancesHalls';
import InsurancesResorts from './pages/InsurancesResorts';
import Reports from './pages/Reports';
import Draws from './pages/Draws';
import Expenses from './pages/Expenses';
import Customers from './pages/Customers';
import CancelRequest from './pages/CancelRequest';
import {  fetchUserData } from './redux/reducers/employee';
import Arabic from "./assets/suadia.png"
import Signin from './pages/Signin';
import English from "./assets/en.jpg"
import { useTranslation } from 'react-i18next';
import Loading from './components/Loading';
import ReservationDetails from './pages/ReservationDetails';
import Services from './pages/Services';
import { fetchNotification } from './redux/reducers/reservation';
import UnConfiremdReservationDetails from './pages/UnConfiremdReservationDetails';
import Search from './pages/Search';

function App() {
  const [loading,setLoading]=useState(false)
  let share=useSelector((state)=>state.reservation.value.share)
  const dispath=useDispatch()
  if(localStorage.getItem('adminToken')) dispath(fetchUserData())
  const { t, i18n } = useTranslation();
  const [open, setOpen]=useState(true)
  useEffect(()=>{dispath(fetchNotification())})
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },1000)
  },[])

  let logedin=useSelector((state)=>state.employee.value.logedin)
  return (
    <div className="App" style={{marginRight:logedin?( open && share? '145px':"10px"):"0",transition:".3s"}}>
         {logedin&&share&&  i18n.language=='ar'&& <button className='translation' onClick={()=>i18n.changeLanguage('en')}><img src={Arabic} alt="arabic"/></button>}
          {i18n.language=='en'&& <button className='translation' onClick={()=>i18n.changeLanguage('ar')}><img src={English} alt="arabic"/></button>}
      {logedin&&share&& <Sidebar isOpen={open} toggle={()=>setOpen(!open)}/>}
        <Routes>
          <Route path="/" element={logedin? <Dashboard/>:<Signin/>}/>
          <Route path='/addRessort' element={logedin? <AddRessort/>:<Signin/>}/>
          <Route path='/addChalet' element={logedin? <AddChalet/>:<Signin/>}/>
          <Route path='/addHall' element={logedin? <AddHalls/>:<Signin/>}/>
          <Route path='/reports' element={logedin? <Reports/>:<Signin/>}/>
          <Route path='/addEmployee' element={logedin? <AddEmployee/>:<Signin/>}/>
          <Route path='/insurances/chalet' element={logedin? <InsurancesChalet/>:<Signin/>}/>
          <Route path='/insurances/hall' element={logedin? <InsurancesHalls/>:<Signin/>}/>
          <Route path='/insurances/resort' element={logedin? <InsurancesResorts/>:<Signin/>}/>
          <Route path='/unConfirmedReservations' element={logedin? <UnConfirmedReservations/>:<Signin/>}/>
          <Route path='/confirmedReservations' element={logedin? <ConfirmedReservations/>:<Signin/>}/>
          <Route path='/deferredReservations' element={logedin? <DeferredReservations/>:<Signin/>}/>
          <Route path='/canceledReservations' element={logedin? <CanceledReservations/>:<Signin/>}/>
          <Route path='/paypal' element={logedin? <Paypal/>:<Signin/>}/>
          <Route path='/onlinePayment' element={logedin? <OnlinePayment/>:<Signin/>}/>
          <Route path='/bankTransactions' element={logedin? <BankTransactions/>:<Signin/>}/>
          <Route path='/expenses' element={logedin? <Expenses/>:<Signin/>}/>
          <Route path='/draws' element={logedin? <Draws/>:<Signin/>}/>
          <Route path='/cutomers' element={logedin? <Customers/>:<Signin/>}/>
          <Route path='/cancelRequest' element={logedin? <CancelRequest/>:<Signin/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/reservationDetails/:id' element={logedin? <ReservationDetails/> : <Signin/>}/>
          <Route path='/unConfermidReservationDetails/:id' element={logedin? <UnConfiremdReservationDetails/> : <Signin/>}/>
          <Route path='/services' element={logedin? <Services/> : <Signin/>}/>
          <Route path='/search' element={logedin? <Search/> : <Signin/>}/>
          <Route path='*' element={logedin? <Dashboard/>:<Signin/>}/>
        </Routes>
        <Loading open={loading}/>
    </div>
  );
}

export default App;
