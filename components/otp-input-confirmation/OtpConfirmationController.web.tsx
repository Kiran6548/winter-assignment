
import {Component} from "react" 

export interface Props {
  
  navigation: any;
  id: string;
  history: any;
  location: any;
   
}

interface S {
  
  otpInput: any;
  IsotpExpired: boolean;
  Otptime: any;
  submitBtnLoading: boolean
  otpInputFill: boolean
  
}

interface SS {
   
  id: any;
  
}

export default class OtpConfirmationController extends Component<
  Props,
  S,
  SS
> {
  
  constructor(props: Props) {
    super(props);  
    
    this.state = {
      otpInput: "",
      IsotpExpired: false,
      Otptime: Date.now() + 30 * 1000,
      submitBtnLoading: false,
      otpInputFill: false,
    };
     
  }
 
  async componentDidMount() { }

  apiCall = async (data: any) => {
   
  };

  handlepageRedirect = () => {
    if (this.props.location.state.pageLocation === "signup") {
      this.props.history.push({
        pathname: "/selectLanguage",
        state: {pageLocation:this.props.location.state.pageLocation},
      });
    } else {
      this.props.history.push("/Home")
    }
  }

  OtpFinishTime = () => {
    this.setState({
      IsotpExpired: true,
    });
  };

  handleChangeOtp = (otp: any) => {
    this.setState({
      otpInput: otp,
    });
  };
  handleOtp = (e: any) => {
    e.preventDefault();
    if (this.state.otpInput.length===4) {
      this.handleOtpSubmit();
    } else {
      this.setState({
        otpInputFill: true,
      });
    }
  };
  handleOtpSubmit = async () => {
    if(this.state.otpInput.length === 4){
      this.setState({
        submitBtnLoading: true
      })
      let body = {
        data: {
          attributes: {
            full_phone_number: this.props?.location?.state?.full_phone_number,
            pin: this.state.otpInput
          },
        },
      };  
      // this.postOtpConfirmationApiCallId = await this.apiCall({
      //   contentType: configJSON.ApiContentType,
      //   method: configJSON.apiPostMethod,
      //   endPoint: configJSON.postOtpConfirmationApiEndPoint,
      //   body: body,
      // });
    }
  };

  handleResendOTP = async () => {
    let body = {
      data: {
        attributes: {
          full_phone_number: this.props?.location?.state?.full_phone_number,
        },
      },
    };
    // this.postResendOtpApiCallId = await this.apiCall({
    //   contentType: configJSON.ApiContentType,
    //   method: configJSON.apiPostMethod,
    //   endPoint: configJSON.postResendOtpApiEndPoint,
    //   body: body,
    // });
  }
}
