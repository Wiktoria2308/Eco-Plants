import { configureStore } from '@reduxjs/toolkit'
import shoppingCartReducer from '../reducers/shoppingCartReducer.js'
import totalPriceReducer from '../reducers/totalPrice.js'

export const store = configureStore({
	reducer: {
		shoppingCart: shoppingCartReducer,
		total: totalPriceReducer,
	},
})
