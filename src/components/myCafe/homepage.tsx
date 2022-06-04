import React, {useEffect, useState} from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './header';
import imageHeader from '../../assets/images/image-header.jpg';
import icedcoffee from '../../assets/images/iced-coffee2.jpg'
import cafeBreakfast from '../../assets/images/cafe-breakfast.jpg'

interface HomePageProps {
    
}
 
const HomePage: React.FunctionComponent<HomePageProps> = () => {

    const auth = getAuth();
    const navigate = useNavigate()

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

    return ( 
        <React.Fragment>
            <div className='relative'>
                <div className=''>
                    <Header />
                </div>
                <div className='md:flex md:h-96 mb-10'>
                    <div className='md:basis-1/2'>
                        <div className='h-96 md:h-full bg-cover bg-no-repeat md:bg-center' style={{backgroundImage: `url(${icedcoffee})`}}>
                        </div>
                    </div>
                    <div className='md:basis-1/2 bg-red-400 grid place-items-center h-96'>
                        <div className='text-white text-center md:w-2/3 px-5 md:px-0'>
                            <p className='font-bold md:text-6xl text-4xl'>Silky New Cold brew</p>
                            <p className='font-semibold text-2xl mt-4'>Dreamy, smooth, cold choclate cream brew</p>
                            <button onClick={() => navigate('/homepage/all-products')} 
                                className='border-2 border-white w-32 mt-5 py-2 rounded-3xl font-semibold'>Order now</button>
                        </div>
                    </div>
                </div>
                <div className=' '>
                    <div className='md:flex md:h-96 mb-10'>
                        <div className='basis-1/2 h-96 order-last'>
                            <div className='h-full bg-cover bg-no-repeat bg-center' style={{backgroundImage: `url(${cafeBreakfast})`}}>
                            </div>
                        </div>
                        <div className='md:basis-1/2 bg-pink-300 grid place-items-center h-96'>
                            <div className='text-stone-700 text-center md:w-2/3'>
                                <p className='font-bold md:text-6xl text-4xl'>Special Eliana waffles</p>
                                <p className='font-semibold text-2xl mt-4 px-5 md:px-0'> 
                                    Dive into the unexpected flavors of the cafe Special and Ice cold 
                                        Lemonade Refreshers both with tastes you wont see coming</p>
                                <button onClick={() => navigate('/homepage/all-products')} 
                                    className='border-2 border-stone-700 w-32 mt-5 py-2 rounded-3xl font-semibold'>Order now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </React.Fragment>
    );
}
 
export default HomePage;