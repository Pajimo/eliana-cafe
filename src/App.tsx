import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from './components/myCafe/homepage';
import Cart from './components/myCafe/cart';
import AllProducts from './components/myCafe/allProducts';
import Authentication from './components/myCafe/authentication';

export interface AppProps {

}
 
const App: React.FunctionComponent<AppProps> = (props) => {

  return(
    <>
        <Routes>
          <Route path='/' element={<Authentication/>}/>
          <Route path='/your-bag' element={<Cart />} />
          <Route path='homepage/all-products' element={<AllProducts/>}/>
        </Routes>
        {/* {quantity.map((order: any) => {
          return(
            <div key={order.id}>
              <h1>{order.name}</h1>
              <div><button onClick={() => decreaseQuantity(order.id)}>-</button><h1>{order.eachQuantity}</h1><button onClick={() =>increaseQuantity(order.id)}>+</button></div>
              <h1>{order.price}</h1>
              <button onClick={() => addToCart(order)}>Add to bag</button>
            </div>
          )
        })} */}

    </>
  )
}


export default App;
