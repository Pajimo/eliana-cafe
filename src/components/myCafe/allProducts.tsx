import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART,  } from "../slice/cartSlice";
import { doc, setDoc } from "firebase/firestore"; 
import { database } from "../../configuration/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Product from "./product";
import Authentication from "./authentication";

export interface AllProductsProps {
    
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
    productId: number
}
 
const AllProducts: React.FunctionComponent<AllProductsProps> = () => {

	const auth = getAuth()

  	let cartProducts = useSelector((state: Products) => state.cart)

	const [singleProduct, setSingleProduct] = useState<SingleProduct>({
		state:false,
		productId: 0
	})

	const add_product_to_db = async() => {    
		onAuthStateChanged(auth, async(user) => {
			console.log(user)
			if (user) {
				console.log('okay')
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

	useEffect(() => {
		add_product_to_db()
	}, [cartProducts])

    const dispatch = useDispatch()

    const [allProducts, setAllProducts] = useState([
		{id: 1, name: 'capuchino', eachQuantity: 1, price: 50, total_price: 0}, 
		{id: 2, name: 'Ice tea', eachQuantity: 1, price: 20, total_price: 0}, 
		{id: 3, name: 'coffee', eachQuantity: 1, price: 5, total_price: 0}
    ])

	const addToCart = (order:any) => {
		dispatch(ADD_TO_CART(order))
	}
	
	const increaseQuantity = (id: number) => {
		const oneOrder = allProducts.find((order:any) => order.id === id)
		if(oneOrder){
			oneOrder.eachQuantity++
			//console.log(oneOrder.quantity)
			setAllProducts([...allProducts])
		}
	}

	const decreaseQuantity = (id: number) => {
		const oneOrder = allProducts.find((order:any) => order.id === id)!
		if(oneOrder.eachQuantity > 1){
			oneOrder.eachQuantity--
			setAllProducts([...allProducts])
		}
	}

	const showProduct = (product: number) => {
		setSingleProduct({
			state: true,
			productId: product
		})
	}
        

    return (
        <div>
			{singleProduct ? <Product props={singleProduct.productId}/> : ''}
			{cartProducts.orders.length} <span>Orders</span>
            {allProducts.map((order: any) => {
				return(
					<div key={order.id} onClick={() => showProduct(order.id)}>
					<h1>{order.name}</h1>
					<div>
						<button onClick={() => decreaseQuantity(order.id)}>-</button>
						<h1>{order.eachQuantity}</h1>
						<button onClick={() =>increaseQuantity(order.id)}>+</button></div>
					<h1>{order.price}</h1>
					<button onClick={() => addToCart(order)}>Add to bag</button>
					</div>
				)
            })}
        </div>
     );
}
 
export default AllProducts;