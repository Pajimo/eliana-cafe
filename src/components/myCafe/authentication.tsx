import React, { useEffect, useState } from "react";
import Login from "./login";
import SignUp from "./signup";
import ForgotPassword from "./forgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthType } from "../slice/authSlice";
import { getAuth,
    GoogleAuthProvider, 
    signInWithPopup,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendEmailVerification,
    updateProfile,
    sendPasswordResetEmail } from "firebase/auth";


interface AuthenticationProps {
    
}

interface AuthType{
    auth: string
}
 
const Authentication: React.FunctionComponent<AuthenticationProps> = () => {

    const authType = useSelector((state: AuthType) => state.auth)


    if(authType === 'login'){
        return(
            <div>
                <Login />
            </div>
        )
    }

    if(authType === 'signup'){
        return(
            <div>
                <SignUp />
            </div>
        )
    }

    return ( 
        <div>
            <ForgotPassword />
        </div>
     );
}
 
export default Authentication;