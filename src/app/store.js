import { configureStore } from '@reduxjs/toolkit'
import shoppingCartReducer from '../reducers/shoppingCartReducer'

export const store = configureStore({
	reducer: {
		shoppingCart: shoppingCartReducer,
	},
})
