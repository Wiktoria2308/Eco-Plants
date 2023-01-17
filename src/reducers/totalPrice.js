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
	},
})

export const { changeTotal } = totalPriceReducer.actions

export default totalPriceReducer.reducer