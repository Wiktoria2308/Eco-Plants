import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	value: [],
}


export const shoppingCartReducer = createSlice({
	name: 'shoppingCart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
            const product = state.value.find(product => product.id === action.payload[0].id)
            if(product){
            product.shopQuantity += action.payload[1]
            }
            else {
            state.value.push(action.payload[0])
            }
			// sum total price for each product in cart and add total attribute to each product
			state.value.forEach(product => product.total = product.shopQuantity * product.price);
			return state
		},
		removeProduct: (state, action) => {
			state.value = state.value.filter(product => product.id !== action.payload.id)
			return state
		},
        changeQuantity: (state, action) => {
			const product = state.value.find(product => product.id === action.payload[0].id)
			product.shopQuantity = action.payload[1];
			// sum total price for each product in cart and add total attribute to each product
			state.value.forEach(product => product.total = product.shopQuantity * product.price);
			return state
		},
	}
})

// Action creators are generated for each reducer function
export const { addToCart, removeProduct, changeQuantity } = shoppingCartReducer.actions

// Export the reducer
export default shoppingCartReducer.reducer