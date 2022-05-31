import React, {useEffect, useState} from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './header';
import imageHeader from '../../assets/images/image-header.jpg';
import icedcoffee from '../../assets/images/iced-coffee2.jpg'

interface HomePageProps {
    
}
 
const HomePage: React.FunctionComponent<HomePageProps> = () => {

    const auth = getAuth()

    const [isLoggedIn, setIsLoggedIn] = useState(false)

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
            <div style={{backgroundImage: `url(${imageHeader})`}} className='md:px-32 px-5 bg-contain bg-top'>
                <Header />
                <div className='h-96 '>
                    <button onClick={() => navigate('homepage/all-products')}>Order now</button>
                </div>
            </div>
            <div className='flex h-80 mt-10 mb-10'>
                <div className='basis-1/2'>
                    <div className='h-full bg-coverjh' style={{backgroundImage: `url(${icedcoffee})`}}></div>
                </div>
                <div className='basis-1/2 bg-gray-600'>
                    
                </div>
            </div>
    </React.Fragment>
    );
}
 
export default HomePage;