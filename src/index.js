import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import "./scss/app.scss"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Signin from './pages/Signin';
import Signup from "./pages/Signup"
import { createTheme } from '@mui/material/styles';
import PhoneVirefy from './pages/PhoneVirefy';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/user/signin' element={<Signin/>}/>
          <Route path='/user/signup' element={<Signup/>}/>
          <Route path='/user/phoneVirefy' element={<PhoneVirefy/>}/>
          <Route path='*' element={<App/>}/>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);