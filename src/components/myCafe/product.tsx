import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewProduct } from "../slice/viewProduct";
import { ADD_TO_CART,  } from "../slice/cartSlice";
import {IsLoading} from '../slice/isLoadingSlice'
import LoadingState from './loadingState'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface ProductProps {

}

interface Products{
    cart: {
        total_orders: number,
        total_price: number,
        orders: (string | number)[]
    },
    viewProduct: {
        product: {
            fields: {
                id: number,
                foodName: string,
                price: number,
                productImage: {
                    fields: {
                        file: {
                            url: string
                        }
                    }
                },
                quantity: number
            }
        },
        isActive: boolean
    }
}

interface loading {
    loading: boolean
}

const Product: React.FunctionComponent<ProductProps> = () => {

    const dispatch = useDispatch()

    const [quantity, setQuantity]= useState<string>()

    let cartProducts = useSelector((state: Products) => state.cart)
    let getLoading = useSelector((state: loading) => state.loading)
    let singleProduct = useSelector((state: Products) => state.viewProduct.product.fields)

    useEffect(() => {
        dispatch(IsLoading(false))
    }, [])

    const addToCart = (order:any) => {
        dispatch(IsLoading(true))
        const quant = Number(quantity)
        const newOrder = {
            ...order,
            quantity: quant || singleProduct.quantity,
            total_price: quant * singleProduct.price || singleProduct.price
        }
		dispatch(ADD_TO_CART(newOrder))
        dispatch(IsLoading(false))
        toast('Product added')
	}

    if(getLoading){

        return(
            <LoadingState />
        )
    }

    return ( 
        <div>
        <ToastContainer />
        <div className="modal w-screen">
            <div className="modal-content h-full md:w-8/12 w-11/12">
                <div className="modal-body text-stone-700 bg-white ">
                    <div className="flex justify-end" onClick={() => dispatch(ViewProduct({isActive: false}))}>
                        <p className="text-2xl font-bold bg-black rounded-full px-2 text-white cursor-pointer">X</p>
                    </div>
                    <div key={singleProduct.id}>
                        <p className="text-2xl font-bold my-5 text-center">{singleProduct.foodName}</p>
                        <div className="md:flex md:py-7">
                            <div>
                                <img src={singleProduct.productImage.fields.file.url} className='bg-gray-400'/>
                            </div>
                            <div className="md:w-full md:mx-5">
                                <div>
                                    <select className="w-full my-5 text-center py-1 text-xl font-semibold border-2" 
                                        value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        
                                    </select>
                                </div>
                                    <p className="mb-5 text-xl font-semibold">${singleProduct.price}</p>
                                <div>
                                    <button className="w-full py-1 mb-2 bg-gray-900 rounded-lg text-white text-xl font-semibold" 
                                        onClick={() => addToCart(singleProduct)}>Add to bag</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
     );
}
 
export default Product;
