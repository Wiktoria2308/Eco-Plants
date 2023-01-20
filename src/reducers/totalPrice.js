import { createSlice } from "@reduxjs/toolkit"


const initialState = {
	balance: 0,
}

export const totalPriceReducer = createSlice({
	name: 'total',
	initialState,
	reducers: {
		changeTotal: (state, action) => {
			state.balance = action.payload
			return state
		},
		resetStateTotal: (state) => {
			state.balance = initialState.balance;
			return state
		}
	},
})

export const { changeTotal, resetStateTotal } = totalPriceReducer.actions

export default totalPriceReducer.reducer