import React, { Component } from "react";
import SocialMediaLoginController from "./SocialMediaLoginController.web";
import { Button } from "antd";

class FacebookLogin extends SocialMediaLoginController {
  render() {
    return (
      <>
        {this.props.navigation === "login" && (
          <Button
            data-testid={"Login_btn_googleID"}
            className="Login_btn_google"
            onClick={() => this.connectFacebookLogin()}
          >
            <img 
            // src={InstagramIcon}
             className="social_img_logo" />
            Facebook
          </Button>
        )}

        {this.props.navigation === "both" && (
          <div className="signUpLinks_item">
            <div
              data-testid={"Signup_btnID"}
              className="mobileLink Signup_btn"
              onClick={() => this.connectFacebookLogin()}
            >
              <img
                // src={InstagramIcon}
                className="social_img_logo"
                style={{ height: "30px", paddingLeft: "60px" }}
              />
              {this.props.loginLoc === "signup" ? (
                <p className="mobile_text">Signup with FacebookLogin</p>
              ) : (
                <p className="mobile_text">Login with FacebookLogin</p>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}
// @ts-ignore 
export default FacebookLogin
export { FacebookLogin };