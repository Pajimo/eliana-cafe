import { getAuth,
    GoogleAuthProvider, 
    signInWithPopup,
    createUserWithEmailAndPassword, 
    sendEmailVerification,
    updateProfile,
    sendPasswordResetEmail } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthType } from "../slice/authSlice";
import { setDoc, doc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { database } from "../../configuration/firebaseConfig";
import { FcGoogle } from "react-icons/fc";
import {useNavigate} from 'react-router-dom';
import {IsLoading} from '../slice/isLoadingSlice';
import LoadingState from './loadingState';


interface SignUpProps {
    
}

interface Auth{
    currentUser: string
}

interface loading {
	loading: boolean
}
 
const SignUp: React.FunctionComponent<SignUpProps> = () => {

    const auth = getAuth();
	const dispatch = useDispatch()
	const navigate = useNavigate()

    const [userProfile, setUserProfile] = useState({
        fullName: '',
        password: '',
        email: ''
    });
	const [checkbox, setCheckBox] = useState(false)

	let getLoading = useSelector((state: loading) => state.loading)

    useEffect(() => {
        dispatch(IsLoading(false))
    }, [])


    const signUp = async(e:any) =>{
		e.preventDefault()
		if(userProfile.password.length < 6){
			toast.error('Password too short')
		}else if(!userProfile.fullName){
          	toast.error('Enter your first name')
        }else if(!userProfile.password){
          	toast.error("Enter your password")
        }else if(!checkbox){
			toast.error("Check the box")
		}else if(!userProfile.email){
          	toast.error('Enter your email address')
        }else{
			try{
				dispatch(IsLoading(true))
				const res = await createUserWithEmailAndPassword(auth, userProfile.email, userProfile.password)
				// Signed in 
				const user = res.user;
				await updateProfile(user, {
					displayName: userProfile.fullName
				})

				const q = collection(database, user.uid);
				const docs = await getDocs(q);
				if (docs.docs.length === 0) {
					await setDoc(doc(database, user.uid, "User-Info"), {
						uid: user.uid,
						name: userProfile.fullName,
						authProvider: "Email/Password",
						email: user.email,
					})
				}
				sendEmailVerification(user)
				// ...
				dispatch(IsLoading(false))
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
					<img className="object-cover w-screen h-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0WvQ_kO59Mlgj7UMdoZj4OQpSfJF7mfr14w&usqp=CAU" />
            	</div>
				<div className='md:basis-7/12 grid place-items-center mt-10'>
					<div className=''>
						<div className="flex my-2 border-t-2">
							<p className="cursor-pointer mr-1" onClick={() => navigate('/')}>Home </p>
							<p className="cursor-pointer" onClick={() => navigate('/homepage/all-products')}>/ {"Menu"} /</p>
							<p className="cursor-pointer font-bold ml-1">Authentication - Signup</p>
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
							<input type="text" name='fullName' 
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
							<button className='py-2 bg-orange-600 w-52 rounded-lg text-white font-semibold mt-5' onClick={(e)=> signUp(e)}>Create Account</button>
						</form>
            			<div className='mt-3 pb-20'>
							<h1 className="">Already a Member? <span onClick={() => dispatch(checkAuthType('login'))}
								className='text-blue-500 cursor-pointer'>Log in</span> </h1>
						</div>
					</div>
				</div>
          	</div>
        </React.Fragment>
     );
}
 
export default SignUp;