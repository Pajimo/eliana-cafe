import React, {useState, useEffect} from 'react'
import { getAuth,
    GoogleAuthProvider, 
    signInWithPopup,
    signInWithEmailAndPassword, 
 	onAuthStateChanged
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthType } from "../slice/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";
import {useNavigate} from 'react-router-dom'
import {IsLoading} from '../slice/isLoadingSlice'
import LoadingState from './loadingState'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { database } from '../../configuration/firebaseConfig';


interface LoginProps {
    
}

interface loading {
	loading: boolean
}

interface Products{
	cart: {
		total_orders: number,
		total_price: number,
		orders: (string | number)[]
	}
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

	let getLoading = useSelector((state: loading) => state.loading)

	useEffect(() => {
		dispatch(IsLoading(false))
	}, [])  

    const signIn = async (e: any) =>{
		e.preventDefault()
        if(!userProfile.email){
          toast.error("Enter your Email address")
        }else if(!userProfile.password){
          toast.error('Enter your password')
        }else{
			dispatch(IsLoading(true))
           signInWithEmailAndPassword(auth, userProfile.email, userProfile.password)
          .then( async(userCredential) => {
              // Signed in 
              //setUser(userCredential.user);
              toast('Signed In Successsfully');
			  setTimeout(() => {
				navigate('/homepage/all-products') 
			  }, 1000)
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

	const googleProvider = new GoogleAuthProvider();
	const signInWithGoogle = async () => {
		try {
			dispatch(IsLoading(true))
			const res = await signInWithPopup(auth, googleProvider);
			const user = res.user;
			const q = collection(database, user.uid);
			const docs = await getDocs(q);
			if (docs.docs.length === 0) {
				await setDoc(doc(database, user.uid, "User-Info"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
				})
			} 
			toast('Signed In Successsfully');
			setTimeout(() => {
			navigate('/homepage/all-products') 
			}, 1000)
		} catch (err: any) {
			toast.error(err.message);
		}
	};
      

      const resetPassword = async() => {
		dispatch(checkAuthType('forgot'))
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
					<img className='object-cover w-screen h-full' src='data:image/jpeg;base64,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'/>
            	</div>
				<div className='md:basis-7/12 grid place-items-center mt-10'>
					<div className=''>
						<div className="flex my-2 border-b-2">
							<p className="cursor-pointer mr-1" onClick={() => navigate('/')}>Home </p>
							<p className="cursor-pointer" onClick={() => navigate('/homepage/all-products')}>/ {"Menu"} /</p>
							<p className="cursor-pointer font-bold ml-1">Authentication - Sign in</p>
						</div>
						<h1 className="text-2xl font-bold ">Sign in to Eliana Cafe</h1>
						<button className='mt-5 w-full text-white rounded-lg mb-5 bg-blue-500 hover:bg-blue-400 py-2 font-semibold flex 
							items-center justify-center' 
							onClick = {(e) =>{
								e.preventDefault();
								signInWithGoogle()
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
							<button className='py-2 bg-orange-600 w-52 rounded-lg text-white' onClick={(e) => signIn(e)}>Sign In</button>
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