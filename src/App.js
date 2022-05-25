import {useEffect, Fragment} from "react"
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from "react-redux"
import Notification from "./components/UI/Notification"
import {sendCartData, fetchCartData} from "./store/cart-slice"

let isInitial = true

function App() {
	const dispatch = useDispatch()
	const isCartVisible = useSelector(state => state.ui.cartIsVisible)
	const cart = useSelector(state => state.cart)
	const notification = useSelector(state => state.ui.notification)
	
// 	FETCH DATA
	useEffect(() => {
		
		dispatch(fetchCartData())
		
		
	}, [dispatch])
	
// 	SEND DATA
	useEffect(() => {
		
		if(isInitial){
			isInitial=false;
			return;
		}
		
		if(cart.changed){
			dispatch(sendCartData(cart))
		}
		
	}, [cart, dispatch])
	
	
  return (
	<Fragment>
		 {notification && <Notification status = {notification.status} title={notification.title} message={notification.message}/>}
		<Layout>
		 {isCartVisible && <Cart />}
		  <Products />
		</Layout>
	</Fragment>
  );
}

export default App;
