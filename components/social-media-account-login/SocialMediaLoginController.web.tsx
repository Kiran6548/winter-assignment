import {Component} from "react";
import { notification } from "antd";
// @ts-ignore
import { auth } from "../../firebase";
import * as FIRBASE_CLIENT from "firebase/auth";
type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface Props {   
    navigation: any;
    id: string;
    history: any;
    location: any;
    loginLoc: any;   
}

interface S {    
    isUserLoggedIn: boolean;
    apiToken: any;   
}

interface SS {    
    id: any;
   
}
export default class SocialMediaLoginController extends Component<
    Props,
    S,
    SS
> {
   

    constructor(props: Props) {
        super(props);
        this.state = {
            isUserLoggedIn: false,
            apiToken:""
        };       
    }

    
    async componentDidMount() { 
        const getToken = await localStorage.getItem("token");
        if(getToken){
            this.setState({apiToken:getToken})
        }
    }

    handlepageRedirect = (responseJson: any) => {
        if (responseJson.data.attributes.language === "") {
            this.openNotificationWithIcon("success", "Signup successfully")
            this.props.history.push({
                pathname: "/selectLanguage",
                state: { pageLocation: this.props.location.state.LoginLocation },
            });
        } else {
            this.openNotificationWithIcon("success", "Login successfully")
            this.props.history.push("/Home")
        }
    }
  
    postGoogleSignIn = async (result: any) => {
        localStorage.setItem("socialProfile", JSON.stringify(result.user))
        let googleLoginData = {
            data: {
                attributes: {
                    full_phone_number: "",
                },
                email: result.user.email,
                type: "social_account",
                login: this.props.loginLoc === "signup" ? false : true,
                social_auth_id: result.user.accessToken,
                platform: "google"

            }
        }
        // this.postGoogleSignInAPICallID = await this.apiCall({
        //     contentType: configJSON.ApiContentType,
        //     method: configJSON.apiPostMethod,
        //     endPoint: configJSON.postGoogleSignInApiEndpoint,
        //     body: googleLoginData
        // });
    }
  
    postInstagramSignIn = async (result: any) => {
        localStorage.setItem("socialProfile", JSON.stringify(result.user))
        let facebookLoginData = {
            data: {
                attributes: {
                    full_phone_number: "",
                },
                email: result.user.email,
                type: "social_account",
                login: this.props.loginLoc === "signup" ? false : true,
                social_auth_id: result.user.accessToken,
                platform: "instagram"

            }
        }
        // this.postInstagramSignInAPICallID = await this.apiCall({
        //     contentType: configJSON.ApiContentType,
        //     method: configJSON.apiPostMethod,
        //     endPoint: configJSON.postInstagramSignInApiEndpoint,
        //     body: facebookLoginData
        // });
    }
 
    openNotificationWithIcon = (type: NotificationType, error: any) => {
        notification[type]({
            message: error
        });
    };
   
    connectGoogle = () => {
        FIRBASE_CLIENT
            .signOut(auth)
            .then(() => {
                let provider = new FIRBASE_CLIENT.GoogleAuthProvider();
                FIRBASE_CLIENT.signInWithPopup(auth, provider)
                    .then((result: any) => {
                        if (result) {
                            console.log('@@@ Social Login Result ======', result);
                            this.postGoogleSignIn(result);
                        }
                    })
                    .catch(err => {
                        console.log("Google Error ==", err);
                        // @ts-ignore
                        // window.notify([{ message: err?.message || 'Error Occured While connceting to Google', type: "danger" }]);
                        this.openNotificationWithIcon("error", err.message)
                    });
            })
    };
   
    connectFacebookLogin = () => {
        FIRBASE_CLIENT
            .signOut(auth)
            .then(() => {
                let provider = new FIRBASE_CLIENT.FacebookAuthProvider();
                FIRBASE_CLIENT.signInWithPopup(auth, provider)
                    .then((result: any) => {
                        console.log('Facebook Response ==', result);
                        this.postInstagramSignIn(result)
                    })
                    .catch(err => {
                        console.log("Facebook Error ==", err);
                        // @ts-ignore
                        // window.notify([{ message: err?.message || 'Error Occured While connceting to Facebook', type: "danger" }]);
                        this.openNotificationWithIcon("error", err.message)
                    })
            })
    };   
}

