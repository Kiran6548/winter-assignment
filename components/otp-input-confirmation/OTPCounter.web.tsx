import React from "react";
 
import { Statistic } from "antd";
import "./OtpConfirmation.web.css";
const { Countdown } = Statistic;
 
const OTPCounter = (props: any) => {
  return (
    <>
      <Countdown
        className="otp_counter"
        title="Resend OTP:"
        value={props.Otptime}
        onFinish={props.OtpFinishTime}
        format="ss"
      />
    </>
  );
};
 
export default OTPCounter;
export { OTPCounter }; 
