import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewProduct } from "../slice/viewProduct";




interface ProductProps {

}

interface Products{
    cart: {
        total_orders: number,
        total_price: number,
        orders: (string | number)[]
    },
    viewProduct: {
        product: [],
        isActive: boolean
    }
}

interface SingleProduct{
    state: boolean,
    productId: {}
}

const Product: React.FunctionComponent<ProductProps> = () => {

    const dispatch = useDispatch()

    let cartProducts = useSelector((state: Products) => state.cart)

    let singleProduct = useSelector((state: Products) => state.viewProduct)

    return ( 
        <div className="modal text-white">
            <div className="modal-content">
                <div className="modal-body text-stone-700 bg-white">
                    <div onClick={() => dispatch(ViewProduct({isActive: false}))}>close</div>
                    {singleProduct.product.map((one:any) => {
                        return(
                            <div key={one.id}>{one.food_name}</div>
                        )
                    })}
                </div>
            </div>
        </div>
     );
}
 
export default Product;
