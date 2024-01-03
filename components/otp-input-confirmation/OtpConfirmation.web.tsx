import React from "react"; 
import { Button } from "antd";
import OtpInput from "react-otp-input";
import OTPCounter from "./OTPCounter.web";
import OtpConfirmationController from "./OtpConfirmationController.web"
 
export default class OtpConfirmation extends OtpConfirmationController {
 
  renderOtpSection = () => {
    return (
      <div className="mainLogInContainer">
        <div className="SignUp_Box">
          {this.props?.location?.state?.pageLocation === "signup" ? (
            <h2 className="SignupBox_heading">Signup</h2>
          ) : (
            <h2 className="SignupBox_heading">Login</h2>
          )}
          <form onSubmit={this.handleOtp}>
            <div className="otp_header">
              <p className="text_otp_send_mobile">
                Enter OTP sent to your mobile number
              </p>
              <div className="input_otp_header">
                <OtpInput
                  className="otp_input"
                  value={this.state.otpInput}
                  onChange={this.handleChangeOtp}
                  numInputs={4}
                // separator={<span>-</span>}
                />
                 {this.state.otpInputFill && (
                  <p className="input_error">Please enter Otp.</p>
                )}
              </div>

              {this.state.IsotpExpired ? (
                <label 
                data-testid={"resendOTPButtonID"}
                className="otp_expired_msg" onClick={() => this.handleResendOTP()}>
                  Resend OTP
                </label>
              ) : (
                <OTPCounter
                  OtpFinishTime={this.OtpFinishTime}
                  Otptime={this.state.Otptime}
                />
              )}
              <Button  
              data-testid={"submitButtonID"}
              loading={this.state.submitBtnLoading}
               disabled={this.state.submitBtnLoading}
                className={this.state.otpInput.length === 4 ? "Login_btn" : "otp_btn Login_btn"}
                 htmlType="submit"
                 onClick={this.handleOtpSubmit}
              >
              {!this.state.submitBtnLoading ? "Submit" : "Loading"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
   
  render() {
    return (
      <>
         
        {this.renderOtpSection()}
      </>
    );
  }
 
}
 
export {OtpConfirmation} 