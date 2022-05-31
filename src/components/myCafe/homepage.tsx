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
            <div className='relative'>
                <div className='absolute inset-x-0 top-0'>
                    <Header />
                </div>
                <div className='flex h-96 mb-10'>
                    <div className='basis-1/2'>
                        <div className='h-full bg-cover bg-no-repeat bg-center' style={{backgroundImage: `url(${icedcoffee})`}}>
                        </div>
                    </div>
                    <div className='basis-1/2 bg-red-400 grid place-items-center'>
                        <div className='text-white text-center w-2/3'>
                            <p className='font-bold text-6xl'>Silky New Cold brew</p>
                            <p className='font-semibold text-2xl mt-4'>Dreamy, smooth, cold choclate cream brew</p>
                            <button onClick={() => navigate('/homepage/all-products')} 
                                className='border-2 border-white w-32 mt-5 py-2 rounded-3xl font-semibold'>Order now</button>
                        </div>
                    </div>
                </div>
                <div className=' '>
                    <div className='flex h-96 mb-10'>
                        <div className='basis-1/2 bg-pink-300 grid place-items-center'>
                            <div className='text-stone-700 text-center w-2/3'>
                                <p className='font-bold text-6xl'>Special Eliana waffles</p>
                                <p className='font-semibold text-xl mt-4'> 
                                    Dive into the unexpected flavors of the cafe Special and Ice cold 
                                        Lemonade Refreshers both with tastes you wont see coming</p>
                                <button onClick={() => navigate('/homepage/all-products')} 
                                    className='border-2 border-stone-700 w-32 mt-5 py-2 rounded-3xl font-semibold'>Order now</button>
                            </div>
                        </div>
                        <div className='basis-1/2'>
                            <div className='h-full bg-cover bg-no-repeat bg-center' style={{backgroundImage: `url(${cafeBreakfast})`}}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </React.Fragment>
    );
}
 
export default HomePage;