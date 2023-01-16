import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	value: [],
}


export const shoppingCartReducer = createSlice({
	name: 'shoppingCart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.value.push(action.payload)
			return state
		},
		removeProduct: (state, action) => {
			state.value = state.value.filter(product => product.id !== action.payload.id)
			return state
		},
	}
})

// Action creators are generated for each reducer function
export const { addToCart, removeProduct } = shoppingCartReducer.actions

// Export the reducer
export default shoppingCartReducer.reducer