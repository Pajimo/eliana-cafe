import React, {useState, useEffect, useRef} from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShopping, AiOutlineUnorderedList } from "react-icons/ai";
import { ToggleSidepanel } from '../slice/sidepanel';

interface HeaderProps {
    color: string
}

interface Products{
	cart: {
		total_orders: number,
		total_price: number,
		orders: (string | number)[]
	}
}

interface SidePanel{
    sidepanel: boolean
}
 
const Header: React.FunctionComponent<HeaderProps> = ({color}) => {

    const auth = getAuth();
    const colorRef:any = useRef();
    const colorBlack: any = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    let cartProducts = useSelector((state: Products) => state.cart)

    let sidePanel = useSelector((state: SidePanel) => state.sidepanel)

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
        colorRef.current.classList.remove(color)
        setTimeout(() => {
            colorBlack.current.classList.add(color)
        }, 1000)
    }, [])


    const authenticate = (authType: string) => {
        localStorage.setItem('authType', authType);
        navigate('/authentication')
    }

    return ( 
        <React.Fragment>
            <div ref={colorRef} className='text-white flex items-center justify-between px-5 md:px-20 py-3 relative'>
                <div className="text-5xl font-extrabold" onClick={() => navigate('/')}>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                        E
                    </span>
                </div>
                <div className='desktopview'>
                    {isLoggedIn ? 
                    <button onClick={authSubmit}>Sign Out</button>
                    :
                    <div className='flex'>
                        <button className='rounded-2xl w-24 py-1 mr-4 border-black border-2' onClick={() => authenticate('login')}>Sign in</button>
                        <button ref={colorBlack} className='bg-black rounded-2xl w-24 py-1' onClick={() => authenticate('signup')}>Join now</button>
                        <div className='relative px-2' onClick={() => navigate('/your-bag')}>
                            <div ref={colorBlack} className='absolute right-0 top-0 bg-black rounded-3xl px-1 text-sm'>{cartProducts.orders.length} </div><span><AiOutlineShopping size={35}/></span>
                        </div>
                    </div>}
                </div>
                <div className='mobileview font-bold' onClick={()=> 
                    {
                        if(!sidePanel) dispatch(ToggleSidepanel(true))}}>
                    <AiOutlineUnorderedList size={35}/>

                    {sidePanel && 
                        <div className='sidepanel flex justify-end' onClick={() => dispatch(ToggleSidepanel(false))}>
                            <div className='bg-white w-1/2 p-3'>
                                <div className='text-white text-4xl flex justify-end'>
                                    <p onClick={() => dispatch(ToggleSidepanel(false))} className='bg-black rounded-full px-2'>X</p>
                                </div>
                                <div className='flex justify-end mt-10'>
                                    <div className='relative px-2 text-black ' onClick={() => navigate('/your-bag')}>
                                        <div className='absolute right-0 top-0 bg-black rounded-3xl px-1 text-sm text-white'>{cartProducts.orders.length} </div><span><AiOutlineShopping size={35}/></span>
                                    </div>
                                </div>
                                <div className='mb-4 mt-10'>
                                    <button className='rounded-2xl w-full py-1 border-black border-2 text-black font-semibold' onClick={() => navigate('/homepage/all-products')}>Menu</button>
                                </div>
                                <div className=''>
                                    <button className='rounded-2xl w-full py-1 mb-4 border-black border-2 text-black font-semibold' onClick={() => authenticate('login')}>Sign in</button>
                                </div>
                                <div>
                                    <button className='bg-black rounded-2xl w-full py-1 font-semibold text-white' onClick={() => authenticate('signup')}>Join now</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default Header;