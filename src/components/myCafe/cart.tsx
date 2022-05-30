import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { database } from '../../configuration/firebaseConfig'
import { getAuth } from "firebase/auth";
import { UPDATE_CART } from "../slice/cartSlice";



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

    useEffect(() => {
        if(auth.currentUser){
            
        }else{
            const localCart = JSON.parse(localStorage.getItem('CartProducts')!)
            dispatch(UPDATE_CART(localCart))
        }
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