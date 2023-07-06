import { Routes ,Route,useNavigate  } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TermsConditions from './pages/TermsConditions';
import Halls from './pages/Halls';
import Chalets from './pages/Chalets';
import Resorts from './pages/Resorts';
import ChaletCard from './pages/ChaletCard';
import ResortCard from './pages/ResortCard';
import HallCard from "./pages/HallCard";
import Reservations from "./pages/Reservations";
import { useDispatch } from 'react-redux';
import { fetchUserData } from "./redux/reducers/user";
import UserSetting from "./pages/UserSetting";
import HallPage from "./pages/HallPage";
import ResortPage from "./pages/ResortPage";
import ChaletPage from "./pages/ChaletPage";

function App() {
  const dispatch =useDispatch()
  if(localStorage.getItem('userToken')) dispatch(fetchUserData())
  return (
    <div className="App">
      <Navbar/>
       <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/home" element={<Home/>}>
              <Route  path="halls" element={<Halls/>}/>
              <Route path="resort" element={<Resorts/>}/>
              <Route path="chalets" element={<Chalets/>}/>
           </Route>
           <Route path="/terms-conditions" element={<TermsConditions/>}/>
           <Route path="/chaletCard/:id" element={<ChaletCard/>}/>
           <Route path="/resortCard/:id" element={<ResortCard/>}/>
           <Route path="/hallCard/:id" element={<HallCard/>}/>
           <Route path="/reservations" element={<Reservations/>}/>
           <Route path="/userSetting" element={<UserSetting/>}/>
           <Route path="/chalet/page" element={<ChaletPage/>}/>
           <Route path="/resort/page" element={<ResortPage/>}/>
           <Route path="/hall/page" element={<HallPage/>}/>
           <Route path="/termsAndCondition" element={<TermsConditions/>}/>
           <Route path="*" element={<Home/>}/>
       </Routes>

    </div>
  );
}

export default App;