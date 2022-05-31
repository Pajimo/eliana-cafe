import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";


interface ProductProps {
    props: {}
    setProduct: Dispatch<SetStateAction<SingleProduct>>
}

interface Products{
    cart: {
        total_orders: number,
        total_price: number,
        orders: (string | number)[]
    }
}

interface SingleProduct{
    state: boolean,
    productId: {}
}
 
const Product: React.FunctionComponent<ProductProps> = ({props, setProduct}) => {


    let cartProducts = useSelector((state: Products) => state.cart)

    // interface SingleProduct{
    //     id:number
    // }

    const [singleProduct, setSingleProduct] = useState<object[]>([])

    useEffect(() => {
        setSingleProduct([props])
    }, [props])

    return ( 
        <div className="modal text-white">
            <div className="modal-content">
                <div className="modal-body text-stone-700 bg-white">
                    <div onClick={() => setProduct({state: false, productId: {}})}>close</div>
                    {singleProduct.map((one:any) => {
                        return(
                            <div key={one.id}>{one.name}</div>
                        )
                    })}
                </div>
            </div>
        </div>
     );
}
 
export default Product;