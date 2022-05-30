import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { database } from '../../configuration/firebaseConfig'

interface CartProps {
    
}
 
const Cart: React.FunctionComponent<CartProps> = () => {

    interface Products{
        cart: {
            total_orders: number,
            total_price: number,
            orders: any[]
        }
    }

    let cartProducts = useSelector((state: Products) => state.cart)

    const fetchCartData = async () => {
        
    }

    useEffect(() => {
        fetchCartData()
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