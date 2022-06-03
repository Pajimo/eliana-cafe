import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART,  } from "../slice/cartSlice";
import { doc, setDoc } from "firebase/firestore"; 
import { database } from "../../configuration/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Product from "./product";
import { AiOutlineShopping } from "react-icons/ai";
import Header from "./header";
import { ViewProduct } from "../slice/viewProduct";
import { getProducts } from "../contentful/contentfulApi";

export interface AllProductsProps {
    
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
 
const AllProducts: React.FunctionComponent<AllProductsProps> = () => {

	//process.env.REACT_APP_NUTRITION_APIKEY

	const auth = getAuth();
	const dispatch = useDispatch();
	const getAllProducts = getProducts()

  	let cartProducts = useSelector((state: Products) => state.cart);
	let singleProduct = useSelector((state: Products) => state.viewProduct)
	
	const [cafeProducts, setCafeProducts]= useState<string[] | number[]>()

	const add_product_to_db = async() => {    
		onAuthStateChanged(auth, async(user) => {
			if (user) {
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

    const [allProducts, setAllProducts] = useState([])

	const addToCart = (order:any) => {
		dispatch(ADD_TO_CART(order))
	}
	
	const increaseQuantity = (id: number) => {
		// const oneOrder = allProducts.find((order:any) => order.id === id)
		// if(oneOrder){
		// 	oneOrder.eachQuantity++
		// 	//console.log(oneOrder.quantity)
		// 	setAllProducts([...allProducts])
		// }
	}

	const decreaseQuantity = (id: number) => {
		// const oneOrder = allProducts.find((order:any) => order.id === id)!
		// if(oneOrder.eachQuantity > 1){
		// 	oneOrder.eachQuantity--
		// 	setAllProducts([...allProducts])
		// }
	}

	const fetchBetter = async() => {
		const req = await fetch('https://cdn.contentful.com/spaces/rwgie9mbh5yo/environments/master/entries/?access_token=v7TRI_Ex99jhwO38ird5AYjeFFDECrPw0PvI3aIdTEk')
		const data = await req.json()
		console.log(data.items)
	}

	useEffect(() => {
		fetchBetter()
		getAllProducts.then((products: string[] | number[]) => {
			setCafeProducts(products)
		})
	}, [])

    return (
        <div className="relative">
			<Header color={'text-white'}/>
			{singleProduct.isActive && 
			<div className="absolute inset-0">
				<Product />
			</div>}
			<div className="grid md:grid-cols-3 grid-cols-2 gap-4 place-content-center border-t-2 mt-3 shadow-2xl shadow-inner">
				{cafeProducts &&  cafeProducts.map((order: any) => {
					const {fields} = order
					return(
						<div key={fields.id} className='md:w-80 h-52 m-5 ' onClick={() => dispatch(ViewProduct({order, isActive: true}))}>
							<img src={fields.productImage.fields.file.url} className="w-2/3 h-1/2 bg-red-300 rounded-full object-center" alt={order.foodName}/>
							<h1 className="font-semibold">{fields.foodName}</h1>
							{/* <div className="flex">
								<button onClick={() => decreaseQuantity(order.id)}>-</button>
								<h1>{order.serving_qty}</h1>
								<button onClick={() =>increaseQuantity(order.id)}>+</button>
							</div> */}
								<h1>${fields.price || 20}</h1>
								{/* <div>
									<button className="w-1/2 py-1 mb-2 bg-orange-400 rounded-lg text-white" 
										onClick={() => showProduct(order)}>View</button>
								</div>
								<div>
									<button className="w-1/2 py-1 mb-2 bg-orange-400 rounded-lg text-white" 
										onClick={() => addToCart(order)}>Add to bag</button>
								</div> */}
						</div>
					)
				})}
			</div>
        </div>
     );
}
 
export default AllProducts;