import { getAuth,
    GoogleAuthProvider, 
    signInWithPopup,
    createUserWithEmailAndPassword, 
    sendEmailVerification,
    updateProfile,
    sendPasswordResetEmail } from "firebase/auth";
import { useDispatch } from "react-redux";
import { checkAuthType } from "../slice/authSlice";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { database } from "../../configuration/firebaseConfig";
import { FcGoogle } from "react-icons/fc";


interface SignUpProps {
    
}

interface Auth{
    currentUser: string
}
 
const SignUp: React.FunctionComponent<SignUpProps> = () => {

    const auth = getAuth();
	const dispatch = useDispatch()

    const [userProfile, setUserProfile] = useState({
        fullName: '',
        password: '',
        email: ''
    });
	const [checkbox, setCheckBox] = useState(false)


    const signUp = async() =>{
        if(!userProfile.fullName){
          toast.error('Enter your first name')
        }else if(!userProfile.password){
          toast.error("Enter your password")
        }else if(!checkbox){
			toast.error("Check the box")
		}else if(!userProfile.email){
          toast.error('Enter your email address')
        }else{
          try{
            const res = await createUserWithEmailAndPassword(auth, userProfile.email, userProfile.password)
            // Signed in 
            const user = res.user;
            await updateProfile(user, {
              displayName: userProfile.fullName
            })

            const q = query(collection(database, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
              await addDoc(collection(database, "users"), {
                uid: user.uid,
                name: userProfile.fullName,
                authProvider: "Email/Password",
                email: user.email,
              });
            }
            sendEmailVerification(user)
            // ...
          }
          catch(error: any){
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            if (error.code === 'auth/email-already-in-use') {
              toast.error('Email Already in Use');
            }
            // ..
          };
        }
    }

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setUserProfile({
		  ...userProfile,
		  [name]: value,
		});
	  };

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
						<h1 className="text-3xl font-bold ">Sign up to Eliana Cafe</h1>
						<button className='mt-5 w-full text-white rounded-lg mb-5 bg-blue-500 hover:bg-blue-400 py-2 font-semibold 
							flex items-center justify-center' 
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
							<label htmlFor='Fullname' className='font-bold'>Full Name</label><br></br>
							<input type="text" name='fullname' 
								className='bg-gray-200 focus:bg-white w-96 py-2 px-4 mt-2 mb-7 rounded-lg focus:border-2 
									focus:border-red-200 focus:outline focus:outline-2 focus:outline-offset-2 outline-red-200' 
								value={userProfile.fullName} onChange={handleInputChange} /><br></br>
							<label htmlFor='email' className='font-bold'>Email Address</label><br></br>
							<input type="text" name='email' 
								className='bg-gray-200 focus:bg-white w-96 py-2 px-4 mt-2 mb-7 rounded-lg focus:border-2 
									focus:border-red-200 focus:outline focus:outline-2 focus:outline-offset-2 outline-red-200' 
                                value={userProfile.email} onChange={handleInputChange} /><br></br>
							<label htmlFor='password' className='font-bold'>Password</label><br></br>
                            <input placeholder="6+ characters" type="password" name='password' 
								className='bg-gray-200 focus:bg-white w-96 py-2 px-4 mt-2 mb-7 rounded-lg focus:border-2 focus:border-red-200 focus:outline 
									focus:outline-2 focus:outline-offset-2 outline-red-200' 
								value={userProfile.password} onChange={handleInputChange} /><br></br>
							<div className="flex w-96">
								<input className="mt-2 mr-3" type='checkbox' checked={checkbox} onChange={() => setCheckBox(!checkbox)}/> 
								<p className="">Creating an account means you’re okay with our Terms of Service, 
									Privacy Policy, and our default Notification Settings.</p>
							</div>
							<button className='py-2 bg-orange-600 w-52 rounded-lg text-white font-semibold mt-5' onClick={signUp}>Create Account</button>
						</form>
					</div>
				</div>
          	</div>
        </React.Fragment>
     );
}
 
export default SignUp;