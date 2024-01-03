import React, { Component } from "react";
import SocialMediaLoginController from "./SocialMediaLoginController.web";
import { Button } from "antd";

class GoogleLogin extends SocialMediaLoginController {
  render() {
    return (
      <>
        {this.props.navigation === "login" && (
          <Button
            data-testid={"Login_btn_googleID"}
            className="Login_btn_google"
            onClick={() => this.connectGoogle()}
          >
            <img 
            // src={GoogleICon} 
            className="social_img_logo" />
            Google
          </Button>
        )}

        {this.props.navigation === "both" && (
          <div className="signUpLinks_item">
            <div
              data-testid={"Signup_btnID"}
              className="mobileLink Signup_btn"
              onClick={() => this.connectGoogle()}
            >
              <img
                // src={GoogleICon}
                className="social_img_logo"
                style={{ height: "30px", paddingLeft: "60px" }}
              />
              {this.props.loginLoc === "signup" ? (
                <p className="mobile_text">Signup with Google</p>
              ) : (
                <p className="mobile_text">Login with Google</p>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}
// @ts-ignore
export default GoogleLogin
export { GoogleLogin };