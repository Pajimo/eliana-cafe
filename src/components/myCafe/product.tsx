import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


interface ProductProps {
    props: number
}
 
const Product: React.FunctionComponent<ProductProps> = ({props}) => {

    interface Products{
        cart: {
            total_orders: number,
            total_price: number,
            orders: (string | number)[]
        }
    }

    let cartProducts = useSelector((state: Products) => state.cart)

    // interface SingleProduct{
    //     id:number
    // }

    const [singleProduct, setSingleProduct] = useState<(string | number)[]>([])

    useEffect(() => {
        console.log('yes boss')
        setSingleProduct(cartProducts.orders.filter((product:any) => product.id === props))
    }, [props])

    return ( 
        <div className="border-2 border-green-500">
            {singleProduct.map((one:any) => {
                return(
                    <div key={one.id}>{one.name}</div>
                )
            })}
        </div>
     );
}
 
export default Product;