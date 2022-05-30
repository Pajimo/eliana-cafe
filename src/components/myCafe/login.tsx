import React, {useState, useEffect} from 'react'
import { getAuth,
    GoogleAuthProvider, 
    signInWithPopup,
    signInWithEmailAndPassword, 
    updateProfile,
    sendPasswordResetEmail } from "firebase/auth";
import { useDispatch } from "react-redux";
import { checkAuthType } from "../slice/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";
import {useNavigate} from 'react-router-dom'

interface LoginProps {
    
}
 
const Login: React.FunctionComponent<LoginProps> = () => {

    const auth = getAuth();
    const dispatch = useDispatch()
	const navigate = useNavigate()

    const [userProfile, setUserProfile] = useState({
        password: '',
        email: ''
    })

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setUserProfile({
		  ...userProfile,
		  [name]: value,
		});
	  };

    const signIn = async () =>{
        if(!userProfile.email){
          toast.error("Enter your Email address")
        }else if(!userProfile.password){
          toast.error('Enter your password')
        }else{
           signInWithEmailAndPassword(auth, userProfile.email, userProfile.password)
          .then((userCredential) => {
              // Signed in 
              //setUser(userCredential.user);
              toast('Signed In Successsfully')   
        // ...
          })
          .catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(error.code === 'auth/wrong-password'){
              toast.error('Invalid Password');
            }
            if(error.code === 'auth/user-not-found'){
              toast.error('Invalid Email Address');
            }
          });
        }
      }
      

      const resetPassword = async() => {
		dispatch(checkAuthType('forgot'))
      }

    return ( 
        <React.Fragment>
            <ToastContainer />
            <div className='md:flex md:flex-row'>
            	<div className="md:h-screen h-48 md:basis-5/12 bg-cover bg-center bg-no-repeat bg-orange-400">
            	</div>
				<div className='md:basis-7/12 grid place-items-center '>
					<div className=''>
						<div className="flex justify-center" onClick={() => navigate('/')}>
							<div className="logo">Home</div>
						</div>
						<h1 className="text-2xl font-bold ">Sign in to Eliana Cafe</h1>
						<button className='mt-5 w-full text-white rounded-lg mb-5 bg-blue-500 hover:bg-blue-400 py-2 font-semibold flex 
							items-center justify-center' 
							onClick = {(e) =>{
								e.preventDefault();
								//signInWithGoogle()
							}}> <FcGoogle className="mr-3 bg-white"/> Continue with Google</button>
						<div className='flex w-full'>
							<p className='border-b-2 basis-5/12 mb-2'></p>
							<p className='basis-2/12 text-center'>Or</p>
							<p className='border-b-2 basis-5/12 mb-2'></p>
						</div>
						<form className="mt-5">
							<label htmlFor='email' className='font-bold'>Email Address</label><br></br>
							<input type="text" name='email' 
								className='bg-gray-200 focus:bg-white w-96 py-2 px-4 mt-2 mb-7 rounded-lg focus:border-2 
									focus:border-red-200 focus:outline focus:outline-2 focus:outline-offset-2 outline-red-200' 
								value={userProfile.email} onChange={handleInputChange} /><br></br>
							<div className='flex justify-between'>
								<label htmlFor='password' className='font-bold'>Password</label><br></br>
								<p className="text-normal text-blue-500 cursor-pointer" onClick={resetPassword}>Forgot Password?</p>
							</div>
							<input type="password" name='password' 
								className='bg-gray-200 focus:bg-white w-96 py-2 px-4 mt-2 mb-7 rounded-lg 
									focus:border-2 focus:border-red-200 focus:outline focus:outline-2 focus:outline-offset-2 outline-red-200' 
								value={userProfile.password} onChange={handleInputChange} /><br></br>
							<button className='py-2 bg-orange-600 w-52 rounded-lg text-white' onClick={signIn}>Sign In</button>
						</form>
						<div className='mt-3'>
							<h1 className="">Not a Member? <span onClick={() => dispatch(checkAuthType('signup'))}
								className='text-blue-500 cursor-pointer'>Sign up now</span> </h1>
						</div>
					</div>
				</div>
          	</div>
        </React.Fragment>
     );
}
 
export default Login;