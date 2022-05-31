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
        orders: any[]
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
        fetchInitialCartData()
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
                        {products.name}
                    </div>
                )
            })}
        </div>
     );
}
 
export default Cart;