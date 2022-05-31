import React, {useState, useEffect} from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HeaderProps {
    
}
 
const Header: React.FunctionComponent<HeaderProps> = () => {

    const auth = getAuth()

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const authSubmit = () =>{
        if(auth.currentUser){
            signOut(auth).then(() => {
                toast("Sign-out successful")
            }).catch((error) => {
                // An error happened.
                toast.error('Error Signing out')
            });
        }
    }

    const fetchInitialAuth = () => {
        onAuthStateChanged(auth, async(user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid ;
                setIsLoggedIn(true)
			} else{
                // ...
                // User is signed out
                // ...
                setIsLoggedIn(false)
			}
		});
    }

    useEffect(() => {
        fetchInitialAuth()
    }, [])

    const navigate = useNavigate()

    return ( 
        <React.Fragment>
            <div className='text-white flex items-center justify-between px-5 md:px-20'>
                <div className="text-5xl font-extrabold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                        ELIANA CAFE
                    </span>
                </div>
                <div className=''>
                    {isLoggedIn ? 
                    <button onClick={authSubmit}>Sign Out</button> 
                    : 
                    <button className='bg-black rounded-3xl w-40 py-2' onClick={() => navigate('/authentication')}>Log In / Sign Up</button>}
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default Header;