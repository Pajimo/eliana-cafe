import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { checkAuthType } from "../slice/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import {IsLoading} from '../slice/isLoadingSlice'
import LoadingState from './loadingState'
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordProps {
    
}

interface loading {
    loading: boolean
}
 
const ForgotPassword: React.FunctionComponent<ForgotPasswordProps> = () => {

    const dispatch = useDispatch()

    const auth = getAuth();
    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    let getLoading = useSelector((state: loading) => state.loading)

    useEffect(() => {
        dispatch(IsLoading(false))
    }, [])

    const sendResetInstruction = () => {
        dispatch(IsLoading(true))
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
        dispatch(IsLoading(false))
    }

    if(getLoading){

        return(
            <LoadingState />
        )
    }

    return ( 
        <React.Fragment>
            <ToastContainer />
            <div className='md:flex md:flex-row'>
            	<div className="md:h-screen h-48 md:basis-5/12">
                    <img className='object-cover w-screen h-full' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGFJCx8_1EOl-8pzL5YTbxBA4CrbKRFtj7A&usqp=CAU' />
            	</div>
				<div className='md:basis-7/12 grid place-items-center '>
					<div className=''>
                        <div className="flex my-2 border-t-2">
							<p className="cursor-pointer mr-1" onClick={() => navigate('/')}>Home </p>
							<p className="cursor-pointer" onClick={() => navigate('/homepage/all-products')}>/ {"Menu"} /</p>
							<p className="cursor-pointer ml-1" onClick={() => dispatch(checkAuthType('login'))}>Authentication - Login /</p>
							<div className="cursor-pointer font-bold ml-1" >Forgot Password</div>
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