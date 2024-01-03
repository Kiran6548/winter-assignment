import React from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/email-account-login/Login.web";
import OtpConfirmation from './components/otp-input-confirmation/OtpConfirmation.web';
import ForgotPassword from './components/forgotPassword/forgotPassword';

function App() {
  return (
    <div className="App">
      <Login />
      <ForgotPassword navigation={undefined} id={''} history={undefined} location={undefined} />
      <OtpConfirmation navigation={undefined} id={''} history={undefined} location={undefined} />
      
      
    </div>
  );
}

export default App;
