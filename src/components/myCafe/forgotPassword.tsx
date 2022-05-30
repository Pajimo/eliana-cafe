import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { checkAuthType } from "../slice/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

interface ForgotPasswordProps {
    
}
 
const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = () => {

    const dispatch = useDispatch()

    const auth = getAuth()

    const [email, setEmail] = useState('')


    const sendResetInstruction = () => {
        if(!email){
            toast.error("Enter your email address")
        }else{
            sendPasswordResetEmail(auth, email)
            .then(() => {
            toast('Password reset link sent your email')
            // Password reset email sent!
            // ..
            })
            .catch((error: any) => {
            const errorCode = error.code;
            toast.error('Put in your email address')
            const errorMessage = error.message;
            // ..
            });
        }
    }

    return ( 
        <React.Fragment>
            <ToastContainer />
            <div className='md:flex md:flex-row'>
            	<div className="md:h-screen h-48 md:basis-5/12 bg-cover bg-center bg-no-repeat bg-orange-400">
            	</div>
				<div className='md:basis-7/12 grid place-items-center '>
					<div className=''>
						<div className="flex justify-center">
							<div className="logo"></div>
						</div>
						<h1 className="text-2xl font-bold ">Forgot Password?</h1>
                        <p className='mt-5  w-96'>Enter the email address you used when you joined and we’ll send you 
                            instructions to reset your password.</p>
                        <p className='mt-5  w-96'>For security reasons, we do NOT store your password. So rest assured 
                            that we will never send your password via email.</p>
						<form className="mt-5">
							<label htmlFor='email' className='font-bold'>Email Address</label><br></br>
							<input type="text" name='email' 
                                className='bg-gray-200 focus:bg-white w-96 py-2 px-4 mt-2 mb-7 rounded-lg focus:border-2 
                                    focus:border-red-200 focus:outline focus:outline-2 focus:outline-offset-2 outline-red-200' 
                                value={email} onChange={(e) => setEmail(e.target.value)} /><br></br>
                            <button className='py-2 bg-orange-600 w-52 rounded-lg text-white font-semibold' 
                                onClick={sendResetInstruction}>Send Reset Instructions</button>
						</form>
					</div>
				</div>
          	</div>
        </React.Fragment>
     );
}
 
export default ForgotPassword;