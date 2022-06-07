import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { database } from '../../configuration/firebaseConfig'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UPDATE_CART, REMOVE_FROM_CART } from "../slice/cartSlice";
import { collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import { AiOutlineShopping } from "react-icons/ai";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import {IsLoading} from '../slice/isLoadingSlice'
import LoadingState from './loadingState'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CartProps {
    
}

interface Products{
    cart: {
        total_order: number,
        total_price: number,
        orders: [{
            id: number,
            foodName: string,
            quantity: number,
            price: number,
            total_price: number,
            productImage: {
                fields: {
                    file: {
                        url: string
                    }
                }
            }
        }]
    }
}

interface loading {
    loading: boolean
}
 
const Cart: React.FunctionComponent<CartProps> = () => {

    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let cartProducts = useSelector((state: Products) => state.cart)
    let getLoading = useSelector((state: loading) => state.loading)

    const fetchCartSliceData = async () => {
		onAuthStateChanged(auth, async(user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				
				const uid = user.uid ;
				await setDoc(doc(database, uid, "CartProducts"), {
					cartProducts: cartProducts.orders
				})
			} else{
			// ...
			// User is signed out
			// ...
				localStorage.setItem('CartProducts', JSON.stringify(cartProducts.orders))
			}
		});
    }

    const fetchInitialCartData = () => {
        onAuthStateChanged(auth, async(user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid ;
                const querySnapshot = await getDoc(doc(database, uid, 'CartProducts'));

                dispatch(UPDATE_CART((querySnapshot.data()!.cartProducts)))
                dispatch(IsLoading(false))   
                //dispatch()
			} else{
                // ...
                // User is signed out
                // ...
                const localCart = JSON.parse(localStorage.getItem('CartProducts')!)
                if(localCart) dispatch(UPDATE_CART(localCart))
                dispatch(IsLoading(false))

			}
		});
    }

    useEffect(() => {
        //console.log(cartProducts.orders)
        !cartProducts.total_order && fetchInitialCartData()
    }, [])

    const removeProduct = async(order: number) => {
        dispatch(IsLoading(true))
        dispatch(REMOVE_FROM_CART(order))
        dispatch(IsLoading(false))
    }

    useEffect(() => {
        !getLoading && fetchCartSliceData()
    }, [cartProducts.orders])

    if(getLoading){

        return(
            <LoadingState />
        )
    }

    
    if(cartProducts.total_order < 1 || !cartProducts.orders){
        return(
            <div>
                <Header />
                <div className="flex justify-center border-t-2 pt-20">
                    <div className="">
                        <div className="flex justify-center">
                            <AiOutlineShopping size={150} className=''/>
                        </div>

                        <p className="text-center font-semibold text-xl">Cart is empty</p>
                        <button
                            onClick={() => navigate('/homepage/all-products')} 
                            className="w-52 py-1 bg-green-800 rounded-xl text-white mt-5 font-semibold">Menu</button>
                        
                    </div>
                </div>
            </div>
        )
    }



    return ( 
        <div>
            <ToastContainer />
            <Header />
            <div className="flex my-2 border-t-2 ml-2">
                <p className="cursor-pointer mr-1" onClick={() => navigate('/')}>Home </p>
                <p className="cursor-pointer" onClick={() => navigate('/homepage/all-products')}>/ {"Menu"} /</p>
                <p className="cursor-pointer font-bold ml-1">{" Bag"}</p>
            </div>
            {cartProducts.orders.map((products) => {
                return(
                    <div key={products.id} className='border-t-2'>
                        <div className="md:flex md:h-32 md:justify-between mx-10 md:mx-20 shadow-2xl px-10 py-5 my-10 border-2 md:items-center">
                            <div className="md:mb-0 mb-5 md:w-1/6">
                                <p className="text-xl font-bold">{products.foodName}</p>
                            </div>
                            <div className="md:mb-0 mb-5">
                                <img src={products.productImage.fields.file.url} alt={products.foodName} className='h-32 bg-gray-200'/>
                            </div>
                            <div className="md:mb-0 mb-5">
                                <p className="text-sm font-semibold">PRICE</p>
                                <p className="font-semibold">${products.price}</p>
                            </div>
                            <div className="md:mb-0 mb-5">
                                <p className="text-sm font-semibold">QUANTITY</p>
                                <p className="font-semibold">{products.quantity}</p>
                            </div>
                            <div className="md:mb-0 mb-5">
                                <p className="text-sm font-semibold">SUBTOTAL</p>
                                <p className="font-semibold">${products.total_price}</p>
                            </div>
                            <div className="flex justify-center">
                                <p onClick={() => removeProduct(products.id)}
                                    className="cursor-pointer bg-red-600 text-xl font-bold px-2 text-white rounded-full">X</p>
                            </div>
                        </div>
                        
                    </div>
                )
            })}
            <div className="flex justify-end mr-10 md:mr-20 mt-5">
                <p className="text-xl font-bold ">Total: <span className="text-2xl">${cartProducts.total_price}.00</span></p>
            </div>
                <div className="flex justify-end my-5 mr-10 md:mr-20">
                    <button className="py-2 w-32 bg-red-600 text-white font-bold text-xl" onClick={() => toast('Product checkout')}>Check Out</button>
                </div>
        </div>
     );
}
 
export default Cart;