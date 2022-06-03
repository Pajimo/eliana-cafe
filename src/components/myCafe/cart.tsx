import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { database } from '../../configuration/firebaseConfig'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UPDATE_CART } from "../slice/cartSlice";
import { collection, getDocs } from "firebase/firestore";




interface CartProps {
    
}

interface Products{
    cart: {
        total_orders: number,
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

    if(cartProducts.total_orders < 1){
        return(
            <div>

            </div>
        )
    }
    
    return ( 
        <div>
            {cartProducts.orders.map((products) => {
                return(
                    <div key={products.id}>
                        <div className="flex h-32 justify-between mx-20 shadow-2xl px-10 py-5 mt-10 border-2 items-center">
                            <div>
                                <p className="text-xl font-bold">{products.foodName}</p>
                            </div>
                            <div className="h-f">
                                <img src={products.productImage.fields.file.url} alt={products.foodName} className='h-32 bg-gray-200'/>
                            </div>
                            <div>
                                <p>PRICE</p>
                                <p className="font-semibold">${products.price}</p>
                            </div>
                            <div>
                                <p>QUANTITY</p>
                                <p className="font-semibold">{products.quantity}</p>
                            </div>
                            <div>
                                <p>SUBTOTAL</p>
                                <p className="font-semibold">${products.total_price}</p>
                            </div>
                            <div>
                                <p className="bg-red-600 text-xl font-bold px-2 text-white rounded-full">X</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
     );
}
 
export default Cart;