import { configureStore } from '@reduxjs/toolkit'
import shoppingCartReducer from '../reducers/shoppingCartReducer.js'
import totalPriceReducer from '../reducers/totalPrice.js'

function loadFromLocalStorage() {
	try {
	  const serialisedState = localStorage.getItem("persistantState");
	  if (serialisedState === null) return undefined;
	  return JSON.parse(serialisedState);
	} catch (e) {
	  console.warn(e);
	  return undefined;
	}
  }
  function saveToLocalStorage(state) {
	try {
	  const serialisedState = JSON.stringify(state);
	  localStorage.setItem("persistantState", serialisedState);
	} catch (e) {
	  console.warn(e);
	}
  }

export const store = configureStore({
	reducer: {
		shoppingCart: shoppingCartReducer,
		total: totalPriceReducer,
	},
	preloadedState: loadFromLocalStorage()
})

store.subscribe(() => saveToLocalStorage(store.getState()));