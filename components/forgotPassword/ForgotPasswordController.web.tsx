import { Component } from "react";

export interface Props {
  navigation: any;
  id: string;  
  history: any;
  location:any;
  classes: any   
}

interface S {
  
  loading: boolean;
  mailSending: boolean;
  email: string;
  emailError: string;
  emailSent: boolean;
  alertMsgType: any;
  snackbarOpen: boolean;
  alertMsg: string;
  pageType: string;
  disableResetPassBtn: boolean;
  password: string;
  confirmPassword: string;
  token: string;
  passwordNotMatch: string;
  enablePasswordField: boolean;
  enableConfirmPasswordField: boolean;
  msgList: any 
}

interface SS {
  id: any;
}

export default class ForgotPasswordController extends Component<
  Props,
  S,
  SS
> {

  constructor(props: Props) {
    super(props);
    this.state = {      
      loading: true,
      email: "",
      mailSending: false,
      emailError: "",
      emailSent: true,
      alertMsgType: '',
      snackbarOpen: false,
      alertMsg: '',
      pageType: '',
      disableResetPassBtn: true,
      password: "",
      confirmPassword: "",
      passwordNotMatch: "",
      token: "",
      enablePasswordField: false,
      enableConfirmPasswordField: false,
      msgList: {
        passResetMsg: "Password Successfully Changed"
      }
    };
  }

 
  async componentDidMount(){
    const token = localStorage.getItem('signin-token');     
    if(token){
      let userData: any = localStorage.getItem('userData');
      if(userData && userData!==""){
        userData = JSON.parse(userData);
      }  
    //   this.props.history.replace({ pathname: userData.user_type === "customer"? "/landing" : "/contractorDashboard" });
    }else{
      this.getTokenFromUrl()
    }   
  }
  getTokenFromUrl = () => {
    this.setState({
        loading: false,
        pageType: "forgotPassword"
    })
    // const urlSearchParams = new URLSearchParams(this.props.location.search);
    // const tokenFromUrl = urlSearchParams.get('token');
    // const emailFromUrl = urlSearchParams.get('email') || '';
    // console.log(tokenFromUrl,"pagePath")
    // if(tokenFromUrl){
    //   this.setState({
    //     pageType: "resetPassword",
    //     token: tokenFromUrl,
    //     email: emailFromUrl,
    //     loading: false,
    //   })
    // } else{
    //   setTimeout(() =>this.setState({
    //     loading: false,
    //     pageType: "forgotPassword"
    //   }), 500) 
    // }   
  }
  callAnApi = (props:any) => {
    
  }
  navigateTo = (url:any) => {    
    // this.props.navigation.navigate(url)
    this.setState({
      loading: true
    }, () => {
      setTimeout(() => this.props.history.push(url), 500) 
    })
  }
  closeAlertMsg = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      snackbarOpen: false,
      alertMsgType: '',
      alertMsg: ''

    })
  }
  validateLoginEmail = () => { 
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validMail = emailPattern.test(this.state.email) 
    console.log(validMail)
    if(validMail){
      this.setState({
        emailError: ""
      })
      this.sendEmailForForgotPassword()
    } else {
      this.setState({
        emailError: "Please enter Valid Email"
      })
    }
  };
   
  handleEmailChange = (event:any) => {
    const value = event.target.value;
    this.setState({
      email: value
    })
  }
  handlePasswordChange = (event:any) => {
    const value = event.target.value;
    const name = event.target.name;
    if(name === "password"){
      const containUppercase = /[A-Z]/.test(value);
      const containLowercase = /[a-z]/.test(value);
      const containNumber = /\d/.test(value); 
      const expectedLength = value.length >=8; 
      const disableResetPassBtn= !(expectedLength && containUppercase && containLowercase && containNumber)
      this.setState({
        password: value,
        disableResetPassBtn: disableResetPassBtn
      })
    }else{
      this.setState({
        confirmPassword: value,
      })
    }   
  }
  handleClickShowPassword = () => {
    this.setState({
      enablePasswordField: !this.state.enablePasswordField
    })
  }
  handleClickShowConfirmPassword = () => {
    this.setState({
      enableConfirmPasswordField: !this.state.enableConfirmPasswordField
    })
  }
  sendEmailForForgotPassword = async () => {
    this.setState({
      mailSending: true
    })
    const headers= {
      'Content-Type': 'application/json',      
    }     
    const postBody = {
      email: this.state.email,      
    }
    // this.sendForgotPasswordMailApiId = this.callAnApi({
    //   headers: headers, 
    //   body: postBody,
    //   endPoint: "password/forgot",
    //   requestType: "POST"
    // })
  }
  resetPasswordApi = () => {
    if(this.state.password !== this.state.confirmPassword){
      this.setState({
        passwordNotMatch: ""
      })
      return "";
    }
    this.setState({
      disableResetPassBtn: true
    })
    const headers= {
      'Content-Type': 'application/json',   
      token: this.state.token   
    }     
    const postBody = {
      new_password: this.state.password,
      confirm_new_password: this.state.confirmPassword,
      token: this.state.token 
    }
    // this.restPasswordApiId = this.callAnApi({
    //   headers: headers, 
    //   body: postBody,
    //   endPoint: "password",
    //   requestType: "PUT"
    // })
  }
  onClickResendEmail = () => {
    this.setState({
      pageType: "forgotPassword"
    })
  }
  // Customizable Area End
}
