import { createTheme, ThemeProvider, withStyles, Theme } from "@material-ui/core/styles";
import ForgotPasswordController, { Props } from "./ForgotPasswordController.web";
import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,    
    InputLabel, 
    Snackbar,
    IconButton,
    InputAdornment,
} from "@material-ui/core";
import { Alert as MuiAlert } from '@material-ui/lab';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

const theme = createTheme({
    palette: {
        primary: {
            main: "#0000ff",
            contrastText: "#fff",
        },
    },
});
export const EditStyle = (theme: Theme) => ({
    containerView: {
        margin: '100px 0', 
        width: 'unset',
        fontFamily: "Lato",
    },
    cardContainer: {
        border: '0.5px solid #e7eff7',
        boxShadow: '0 10px 20px 0 rgb(216, 255, 255)',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        display: "flex",
        width: 496,
        height: 581,
        marginLeft: "98px",         
        "@media(max-width: 767px)": { marginLeft: '20px' }               
    },
    submitButton: {
        color: "#FFF",        
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "24px",
        display: "flex",
        height: "56px",
        padding: "10px 16px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        marginTop: '15px'
    },
    imgContainer: {
        display: 'flex', 
        marginLeft: '200px', 
        alignItems: 'center'
    },
    tickContainer: {
        display: "flex",
        gap:'6px',
        alignItems: 'center',
        fontSize: '14px',
        margin: 0,
        marginTop: 10
    },
    cardHeader: {
        fontSize: '24px',
        fontWeight: 700
    },
    subTitle: {
        margin: "6px 0px",
        fontSize: '18px'
    },
    resetPasswordCard: {
        display: 'flex',     
        margin: 'auto 66px',    
        gap: '12px'
    },
    font18: {
        fontSize: '18px'
    },
    font16: {
        fontSize: '16px'
    },
    font24: {
        fontSize: '24px'
    },
    font700: {
        fontWeight: 700
    },
    navigate:{
        cursor: 'pointer',
        fontWeight: 700,
        fontSize: '18px',
        color: '#2966FF'
    },
    emailSentSubTitle: {
        fontSize: '18px',
        lineHeight: "24px",
    }
  
})


class ForgotPassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);  
  }

  renderForgotPasswordCard = () => {
    const {classes} = this.props;
    return(
        <Box style={{ margin: 'auto 66px' }}>
            <Typography className={classes.cardHeader} gutterBottom>Forgot Password</Typography>
            <p className={classes.emailSentSubTitle}>No Worries, we'll send a recovery link to your email</p>
            <Box>
                <InputLabel className={classes.font16}>Email</InputLabel>
                <TextField
                    style={{ marginTop: '15px', width: '100%' }}
                    data-test-id="txtInputEmail1"
                    variant="outlined"
                    id="outlined-start-adornment"
                    placeholder="Email"
                    value={this.state.email}
                    helperText={this.state.emailError}
                    onChange={this.handleEmailChange}
                    error={!!this.state.emailError}
                />
            </Box>
            <Button 
                disabled={this.state.mailSending} 
                onClick={this.validateLoginEmail} 
                data-test-id={"btnSendMail"} 
                className={classes.submitButton}
                style={{ textTransform: 'inherit', width: '100%', backgroundColor: this.state.mailSending? 'gray':'#2966FF'}} variant="contained" color="primary">
                    Send a recovery Link
            </Button>
         
    </Box>
    )
  }

  renderEmailSentMessage = () => {
    const {classes} = this.props
    return(
        <Box style={{ margin: 'auto 66px' }}>
            <Typography className={classes.cardHeader} gutterBottom>Check your email</Typography>
            <p className={classes.emailSentSubTitle}>We have sent a password reset link to email from admnnow42test@gmail.com</p>
            <p className={classes.navigate} onClick={this.onClickResendEmail}>Resend e-mail</p>
            <p className={classes.font18}>Back to <span className={classes.navigate} onClick={() => this.navigateTo("/")}>Login</span></p>
        </Box>
    )
  }
 
  renderResetPassword = () => {
    const containUppercase = /[A-Z]/.test(this.state.password);
    const containLowercase = /[a-z]/.test(this.state.password);
    const containNumber = /\d/.test(this.state.password); 
    const enableSubmit =  containUppercase && containLowercase && containNumber && this.state.password.length >=8
    const {classes} = this.props; 
    console.log(enableSubmit, this.state.disableResetPassBtn, this.state.disableResetPassBtn&&enableSubmit, "enableSubmit") 
    return(
        <Box className={classes.resetPasswordCard} style={{ flexDirection: 'column', }}>
            <Typography className={classes.cardHeader}>New Password</Typography>
            <p className={classes.subTitle} >Enter new password for {this.state.email}</p>
            <Box>
                <InputLabel style={{color: 'black'}} className={classes.font16}>New Password</InputLabel>                 
                <TextField
                    id="outlined-adornment-password"
                    data-test-id="txtInputPassword"
                    style={{ marginTop: '10px', width: '100%' }}
                    variant="outlined"
                    type={this.state.enablePasswordField ? 'text' : 'password'}
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    name="password"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                onClick={this.handleClickShowPassword}
                                edge="end"
                            >
                                {this.state.enablePasswordField ? <VisibilityOutlinedIcon />: <VisibilityOffOutlinedIcon />}
                            </IconButton>
                        </InputAdornment>
                        }}
                        placeholder="*******"
                />
            </Box>
            <Box>
                <InputLabel style={{color: 'black'}} className={classes.font16}>Confirm Password</InputLabel>                
                 <TextField
                    id="outlined-adornment-passwordConfirm"
                    data-test-id="txtInputpasswordConfirm"
                    style={{ marginTop: '10px', width: '100%' }}
                    variant="outlined"
                    type={this.state.enableConfirmPasswordField ? 'text' : 'password'}
                    onChange={this.handlePasswordChange}
                    value={this.state.confirmPassword}
                    error={!!this.state.passwordNotMatch}
                    helperText={this.state.passwordNotMatch}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                onClick={this.handleClickShowConfirmPassword}
                                edge="end"
                            >
                                {this.state.enableConfirmPasswordField ? <VisibilityOutlinedIcon />: <VisibilityOffOutlinedIcon />}
                            </IconButton>
                        </InputAdornment>
                        }}
                        placeholder="*******"
                />
            </Box>
            {/* <Box>
                <p className={classes.subTitle}>Your password must contain</p>
                <p className={classes.tickContainer}><span><img height={12} width={12} src={containUppercase ? greenTick :  grayTick} /></span> At least one uppercase letter</p>
                <p className={classes.tickContainer}><span><img height={12} width={12} src={containLowercase ? greenTick :  grayTick} /></span> At least one lowercase letter</p>
                <p className={classes.tickContainer}><span><img height={12} width={12} src={containNumber ? greenTick :  grayTick} /></span> At least one number</p>
                <p className={classes.tickContainer}><span><img height={12} width={12} src={this.state.password.length >= 8 ? greenTick :  grayTick} /></span> Minimum character length is 8 charectors</p>
            </Box> */}
            <Box>
                <Button 
                    disabled={this.state.disableResetPassBtn} 
                    onClick={this.resetPasswordApi} 
                    data-test-id={"btnResetPass"} 
                    style={{ textTransform: 'capitalize', width: '100%', backgroundColor: this.state.disableResetPassBtn ? 'gray':'#2966FF'}} 
                    variant="contained" 
                    className={classes.submitButton}
                    color="primary"
                >
                   Set New Password
                </Button>
            </Box>
        </Box>
    )

  }

  render() {
    
    const { classes } = this.props;
    return (
        <ThemeProvider theme={theme}>

            <Snackbar open={this.state.snackbarOpen} autoHideDuration={4000} style={{top: '80px'}} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={this.closeAlertMsg}>
                <MuiAlert style={{backgroundColor: 'white', borderRadius: '8px',display: 'flex', alignItems: 'center'}}  severity={this.state.alertMsgType} >
                    <Typography>{this.state.alertMsg}</Typography>
                </MuiAlert>
            </Snackbar>  
            <Box style={{ backgroundColor: 'rgb(236, 253, 253)' }}>
                <Grid className={classes.containerView} justifyContent="space-around" container>
                    <Grid item className={classes.cardContainer} style={{flexDirection: "column"}}>
                        {this.state.pageType === "forgotPassword" && this.renderForgotPasswordCard()}
                        {this.state.pageType === "emailSentMessage" && this.renderEmailSentMessage()}                         
                        {this.state.pageType === "resetPassword" && this.renderResetPassword()}
                    </Grid>                    
                </Grid>
            </Box>                        
        </ThemeProvider >         
    );
   
  }
}

export { ForgotPassword }
export default withStyles(EditStyle)(ForgotPassword);
