import { Component } from "react"

export interface Props {
  // navigation: any;
  // id: string;
  // history: any;
  // location: any;
}

interface S {
  mobileNumberInput: any;
  mobileNoValide: boolean;
  full_phone_number: any;
  pageLocation: any
  submitBtnDisable: boolean
  submitBtnLoading: boolean
}

interface SS {
  id: any;
}

export default class LoginController extends Component<Props, S, SS> {
  

  constructor(props: Props) {
    super(props);

    this.state = {      
      mobileNumberInput: "",
      mobileNoValide: false,
      full_phone_number: "",
      pageLocation: "",
      submitBtnDisable: false,
      submitBtnLoading: false     
    };   
    
  }

  async componentDidMount() {
    // localStorage.setItem(
    //   "LoginSignupLocation",
    //   this.props.location.state.LoginLocation
    // );
  }

  apiCall = async (data: any) => {
    
  };

  RedictOTP = () => {
    // this.props.history.push({
    //   pathname: "/Otp",
    //   state: this.state,
    // });
  }

  handleLogin = (e: any) => {
    e.preventDefault();
    if (this.state.mobileNumberInput) {
      this.MobileLogin();
    } else {
      this.setState({
        mobileNoValide: true,
      });
    }
  };

  onChangeMobileNumber = (e: any) => {
    let { value } = e.target;
    var reg = /^[0-9\b]+$/;
    if (value.length <= 10 || value.length === 0) {
      if (e.target.value === "" || reg.test(e.target.value)) {
        this.setState({
          mobileNumberInput: value,
          mobileNoValide: false,
        });
      } else {
        e.target.value = "";
      }
    }
    if (value.length === 10) {
      this.setState({
        submitBtnDisable: true
      })
    } else {
      this.setState({
        submitBtnDisable: false
      })
    }
  };
  
  MobileLogin = async () => {
    const fcmToken = (await localStorage.getItem("fcmToken")) || "";
    this.setState({
      submitBtnLoading: true,
    })
    if (this.state.mobileNumberInput.length === 10) {
      // if (this.props.location.state.LoginLocation === "signup") {
      //   let body = {
      //     data: {
      //       attributes: {
      //         full_phone_number: "+91" + this.state.mobileNumberInput,
      //       },
      //       type: "sms_account",
      //       login: false,
      //       device_id:fcmToken
      //     },
      //   };
      //   // this.postLoginMobileApiCallId = await this.apiCall({
      //   //   contentType: configJSON.ApiContentType,
      //   //   method: configJSON.apiPostMethod,
      //   //   endPoint: configJSON.postLoginMobileApiEndPoint,
      //   //   body: JSON.stringify(body),
      //   // });
      // } else {
      //   let body = {
      //     data: {
      //       attributes: {
      //         full_phone_number: "+91" + this.state.mobileNumberInput,
      //       },
      //       type: "sms_account",
      //       login: true,
      //       device_id:fcmToken
      //     },
      //   };
      //   // this.postLoginMobileApiCallId = await this.apiCall({
      //   //   contentType: configJSON.ApiContentType,
      //   //   method: configJSON.apiPostMethod,
      //   //   endPoint: configJSON.postLoginMobileApiEndPoint,
      //   //   body: JSON.stringify(body),
      //   // });
      // }
    } else {
      return false;
    }
  };
}
