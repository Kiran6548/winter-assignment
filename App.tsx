import React from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/email-account-login/Login.web";
import OtpConfirmation from './components/otp-input-confirmation/OtpConfirmation.web';

function App() {
  return (
    <div className="App">
      <Login />
      <OtpConfirmation navigation={undefined} id={''} history={undefined} location={undefined} />
      {/* <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/about" component={About} />           
        </Switch>
    </Router> */}
    </div>
  );
}

export default App;
