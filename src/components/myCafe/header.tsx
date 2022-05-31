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
            {isLoggedIn ? 
            <button onClick={authSubmit}>Sign Out</button> 
            : 
            <button onClick={() => navigate('/authentication')}>Log In / Sign Up</button>}
        </React.Fragment>
     );
}
 
export default Header;