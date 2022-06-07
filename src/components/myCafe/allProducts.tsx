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
import {IsLoading} from '../slice/isLoadingSlice'
import LoadingState from './loadingState'
import { useNavigate } from "react-router-dom";

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

interface loading {
    loading: boolean
}

interface CategoryShuffle{
	fields:{
		category: string
	}
}
 
const AllProducts: React.FunctionComponent<AllProductsProps> = () => {

	//process.env.REACT_APP_NUTRITION_APIKEY

	const auth = getAuth();
	const dispatch = useDispatch();
	const getAllProducts = getProducts();
	const navigate = useNavigate()

  	let cartProducts = useSelector((state: Products) => state.cart);
	let singleProduct = useSelector((state: Products) => state.viewProduct)
	let getLoading = useSelector((state: loading) => state.loading)

	const [cafeProducts, setCafeProducts]:any[]= useState()
	const [category, setCategory]:any[] = useState()

	const add_product_to_db = () => {    
		onAuthStateChanged(auth, async(user) => {
			if (user) {
				dispatch(IsLoading(true))
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				
				const uid = user.uid ;
				await setDoc(doc(database, uid, "CartProducts"), {
					cartProducts: cartProducts.orders
				})
				dispatch(IsLoading(false))
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


	// const addToCart = (order:any) => {
	// 	dispatch(ADD_TO_CART(order))
	// }
	
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

	useEffect(() => {
		getAllProducts.then((products: string[] | number[]) => {
			setCafeProducts(products)
		})
	}, [])

	useEffect(() => {
		setCategory(cafeProducts)
	}, [cafeProducts])

	useEffect(() => {
		dispatch(IsLoading(false))
	}, [cafeProducts])

	const shuffleCafe = (cate: string) => {
		if(cafeProducts) {
			console.log(cafeProducts)
			const shuffleCategory = cafeProducts.filter((cafe: CategoryShuffle) => cafe.fields.category === cate)
			setCategory(shuffleCategory)
		}
		if(cate === 'All'){
			setCategory(cafeProducts)
		}
	}

	if(getLoading){

        return(
            <LoadingState />
        )
    }

    return (
        <div className="relative">
			<Header />
			{singleProduct.isActive && 
			<div className="absolute inset-0">
				<Product />
			</div>}
			<div className="flex my-2 border-t-2 pl-10">
                <p className="cursor-pointer mr-1" onClick={() => navigate('/')}>Home /</p>
				<p className="cursor-pointer ml-1 font-bold">Menu</p>
            </div>
			<div className="flex my-2 border-t-2 pl-10 px-10">
				<div className="md:mr-20 mr-10">
					Categories:
				</div>
				<div className="flex">
					<p className="mr-5" onClick={() => shuffleCafe('All')}>All</p>
					<div className="mr-5" onClick={() => shuffleCafe('coffee')}>Coffee</div>
					<div className="mr-5" onClick={() => shuffleCafe('Sandwich')}>Sandwich</div>
				</div>
			</div>
			<div className="grid md:grid-cols-3 grid-cols-2 gap-4 place-content-center border-t-2 mt- shadow-2xl shadow-inner">
				{category &&  category.map((order: any) => {
					const {fields} = order
					return(
						<div key={fields.id} className='md:w-80 h-52 m-5 cursor-pointer' onClick={() => dispatch(ViewProduct({order, isActive: true}))}>
							<img src={fields.productImage.fields.file.url} className=" h-1/2 bg-red-300 rounded-full object-center" alt={order.foodName}/>
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