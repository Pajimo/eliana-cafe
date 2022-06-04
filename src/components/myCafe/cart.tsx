import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { database } from '../../configuration/firebaseConfig'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UPDATE_CART, REMOVE_FROM_CART } from "../slice/cartSlice";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { AiOutlineShopping } from "react-icons/ai";
import Header from "./header";
import { useNavigate } from "react-router-dom";


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
 
const Cart: React.FunctionComponent<CartProps> = () => {

    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let cartProducts = useSelector((state: Products) => state.cart)

    const fetchCartData = async () => {
        if(auth.currentUser){
            
        }else{
            console.log(cartProducts)
        }
    }

    useEffect(() => {
        fetchCartData()
    }, [cartProducts])

    const fetchInitialCartData = () => {
        onAuthStateChanged(auth, async(user) => {
			if (user) {
                 console.log(user)
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid ;
                const querySnapshot = await getDocs(collection(database, uid));
                querySnapshot.forEach((doc) => {
                      //console.log(`${doc.id} => ${doc.data()}`);
                      dispatch(UPDATE_CART((doc.data().cartProducts)))})             
                //dispatch()
			} else{
                // ...
                // User is signed out
                // ...
                const localCart = JSON.parse(localStorage.getItem('CartProducts')!)
                dispatch(UPDATE_CART(localCart))
			}
		});
    }

    useEffect(() => {
        console.log(cartProducts.orders)
        !cartProducts && fetchInitialCartData()
    }, [])

    const removeProduct = async(order: number) => {
        const remainingProduct = cartProducts.orders.filter((one) => one.id !== order)
        if(remainingProduct.length > 0){
            dispatch(REMOVE_FROM_CART(remainingProduct[0]))
            onAuthStateChanged(auth, async(user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    
                    const uid = user.uid ;
                    await setDoc(doc(database, uid, "CartProducts"), {
                        cartProducts: remainingProduct[0]
                    })
                } else{
                // ...
                // User is signed out
                // ...
                    localStorage.setItem('CartProducts', JSON.stringify(remainingProduct[0]))
                }
            });
        }else{
            dispatch(REMOVE_FROM_CART({}))
            onAuthStateChanged(auth, async(user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    
                    const uid = user.uid ;
                    await setDoc(doc(database, uid, "CartProducts"), {
                        cartProducts: remainingProduct[0]
                    })
                } else{
                // ...
                // User is signed out
                // ...
                    localStorage.setItem('CartProducts', JSON.stringify({}))
                }
            });
        }
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
            <Header />
            {cartProducts.orders.map((products) => {
                return(
                    <div key={products.id} className='border-t-2'>
                        <div className="flex h-32 justify-between mx-20 shadow-2xl px-10 py-5 mt-10 border-2 items-center">
                            <div>
                                <p className="text-xl font-bold">{products.foodName}</p>
                            </div>
                            <div className="h-f">
                                <img src={products.productImage.fields.file.url} alt={products.foodName} className='h-32 bg-gray-200'/>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">PRICE</p>
                                <p className="font-semibold">${products.price}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">QUANTITY</p>
                                <p className="font-semibold">{products.quantity}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">SUBTOTAL</p>
                                <p className="font-semibold">${products.total_price}</p>
                            </div>
                            <div>
                                <p onClick={() => removeProduct(products.id)}
                                    className="cursor-pointer bg-red-600 text-xl font-bold px-2 text-white rounded-full">X</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
     );
}
 
export default Cart;