import React from "react";
import { LoginTextSide, Flag } from "./assets";
import { Button } from "antd";
import LoginController from "./LoginController.web";
import GoogleLogin from "../social-media-account-login/GoogleLogin.web";
import FacebookLogin from "../social-media-account-login/FacebookLogin.web";

export default class Login extends LoginController {
  renderLoginSection = () => {
    return (
      <div className="mainLogInContainer">
        <div className="SignUp_Box">
          
            <h2 className="SignupBox_heading">
              Login
              {/* <img
                src={LoginTextSide}
                alt="LoginTextSide"
                className="LoginTextSideImg"
              /> */}
            </h2>
          

          <div className="otp_header">
            <form onSubmit={this.handleLogin}>
              <div>
                <div className="input-group input_login_header">
                  <span className="input-group-text">
                    {/* <img
                      src={Flag}
                      alt="LoginTextSideImg"
                      className="LoginTextSideImg LoginTextSideImg_contry_img"
                    /> */}
                    +91
                  </span>
                  <input
                    data-testid={"phoneNoTextInputID"}
                    type="text"
                    maxLength={10}
                    className="form-control input_login_mobile_otp"
                    aria-label="Dollar amount (with dot and two decimal places)"
                    placeholder="Enter mobile number"
                    value={this.state.mobileNumberInput}
                    onChange={(e) => {
                      this.onChangeMobileNumber(e);
                    }}
                  />
                </div>
                {this.state.mobileNoValide && (
                  <p className="input_error">Please enter Mobile no.</p>
                )}
                <Button
                  data-testid={"loginButtonID"}
                  loading={this.state.submitBtnLoading}
                  className={
                    this.state.submitBtnDisable
                      ? "Login_btn"
                      : "Login_btn_disable"
                  }
                  htmlType="submit"
                  disabled={this.state.submitBtnLoading}
                >
                  {!this.state.submitBtnLoading ? "Submit" : "Loading"}
                </Button>
              </div>
            </form>

            <p className="Horizontal_line">
              <span>or</span>
            </p>

            <p className="Continue_btw_btn">Continue with</p>

            <div className="google_btn_header">
              <GoogleLogin
                //  @ts-ignore
                navigation={"login"}
                id={""}
                history={undefined}
                loginLoc="signup" location={undefined} />

              <FacebookLogin
                //  @ts-ignore
                navigation={"login"}
                id={""}
                history={undefined}
                loginLoc="signup" location={undefined}  />
            </div>
          </div>
        </div>
      </div>
    );
  };
 
  render() {
    return (
      <>        
        {this.renderLoginSection()}
      </>
    );
  }
}

export { Login };

