import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore"; 
import { database } from "../../configuration/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Product from "./product";
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
		category: string,
		categories: any[]
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
		dispatch(IsLoading(false))
	}, [cafeProducts])


	const shuffleCafe = (cate: string) => {
		if(cafeProducts) {
			const shuffleCategory = cafeProducts.filter((cafe: CategoryShuffle) => {
				for(let i = 0; i < cafe.fields.categories.length; i++){
					if(cafe.fields.categories[i] === cate){
						return cafe.fields
					}
					// console.log(cafe.fields.categories[i] === cate)
					// return cafe.fields.categories[i] === cate
					//return cafe.fields.categories[i] === cate
				}
			})
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
			<div className="flex my-2 border-t-2 overflow-scroll overflow-y-hidden px-10 py-2 items-center">
				<div className="md:mr-12 mr-7 font-semibold">
					Categories:
				</div>
				<div className="flex items-center text-gray-800">
					<p className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('All')}>All</p>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Coffee')}>Coffee</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Special')}>Special</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Food')}>Food</div>
					<div className="mr-5 cursor-pointer focus:border-b-2 focus:text-red-400 hover:text-black hover:font-bold" onClick={() => shuffleCafe('Drink')}>Drinks</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Sandwich')}>Sandwich</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Tea')}>Tea</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Espresso')}>Espresso</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Latte')}>Latte</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Breakfast')}>Breakfast</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Caffe')}>Caffe</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Chocolate ')}>Chocolate</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Vanilla ')}>Vanilla</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Frappuccino ')}>Frappuccino</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Bacon')}>Bacon</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Egg')}>Egg</div>
					<div className="mr-5 cursor-pointer hover:text-black hover:font-bold" onClick={() => shuffleCafe('Caramel ')}>Caramel</div>
				</div>
			</div>
			<div className="grid md:grid-cols-3 grid-cols-2 gap-4 place-content-center border-t-2 shadow-2xl shadow-inner px-10 pt-5">
				{category &&  category.map((order: any) => {
					const {fields} = order
					return(
						<div key={fields.id} className='md:w-80 h-52 pt-5 cursor-pointer' onClick={() => dispatch(ViewProduct({order, isActive: true}))}>
							<img src={fields.productImage.fields.file.url} className=" h-1/2 bg-gray-800 rounded-full object-center" alt={order.foodName}/>
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