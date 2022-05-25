import {createSlice} from "@reduxjs/toolkit"
import {uiActions} from "./ui-slice"

const initialState = {
	items: [],
	totalQuantity: 0,
	changed: false
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		replaceCart(state,action) {
			state.totalQuantity = action.payload.totalQuantity
			state.items = action.payload.items
		},
		addItemToCart(state, action) {
			const newItem = action.payload
			const existingItem = state.items.find(item => item.id === newItem.id)
			state.totalQuantity++;
			state.changed = true
			if(!existingItem){
				state.items.push(
					{
						id: newItem.id,
						price: newItem.price,
						quantity: 1,
						totalPrice: newItem.price,
						title: newItem.title
					})
			}else{
				existingItem.quantity++;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price
			}
		},
		removeItemFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find(item => item.id === id)
			state.totalQuantity--;
			state.changed = true
			if(existingItem.quantity === 1){
				state.items = state.items.filter(item => item.id !== id)
			}else{
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price
			}
		}
	}
})




// ACTION CREATORS

// FETCH DATA FROM FIREBASE
export const fetchCartData = () => {
	return async(dispatch) => {
		const fetchData = async() => {
			const response = await fetch("https://practicefoodapp-default-rtdb.firebaseio.com/cart.json")
			
			if(!response.ok){
				throw new Error("Something went wrong while trying to fetch data...")
			}
			
			const data = await response.json()
			
			return data;
		}
		
		try{
			const cartData = await fetchData()
			dispatch(cartActions.replaceCart({
				items: cartData.items || [],
  				totalQuantity: cartData.totalQuantity || 0
			}))
			
		}catch(err){
			dispatch(uiActions.showNotification({
				status: "error",
				title: "Error...",
				message: "Fetching cart data failed"

			}))
		}
	}
}

// SEND DATA TO FIREBASE
export const sendCartData = (cart) => {
	return async(dispatch) => {
		dispatch(uiActions.showNotification({
			status: "pending",
			title: "Sending...", 
			message: "Sending cart data!"

		}))
		
		const sendRequest = async () => {
			const response = await fetch("https://practicefoodapp-default-rtdb.firebaseio.com/cart.json", {
				method: "PUT",
				body: JSON.stringify({totalQuantity: cart.totalQuantity, items: cart.items})
			})

			if(!response.ok){
				throw new Error("Sending cart data failed.")
			}	
		}
		
		try{
			await sendRequest()
			dispatch(uiActions.showNotification({
				status: "success",
				title: "Success...",
				message: "Sending cart data sucessfull!"
			}))	
		}catch (err) {
			dispatch(uiActions.showNotification({
				status: "error",
				title: "Error...",
				message: "Sending cart data failed"

			}))
		}
	}
}


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;