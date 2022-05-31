import React, {useEffect, useState} from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HomePageProps {
    
}
 
const HomePage: React.FunctionComponent<HomePageProps> = () => {

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
        }else{
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
        <div>
            <Link to='homepage/all-products'>
                <button>Order now</button>
            </Link><br></br>
            {isLoggedIn ? <button onClick={authSubmit}>Sign Out</button> : <button onClick={() => navigate('/authentication')}>Log In / Sign Up</button>}
        </div>
    );
}
 
export default HomePage;