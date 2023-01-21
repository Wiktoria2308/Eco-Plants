import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContextProvider from "./contexts/AuthContext";
import App from "./App";
import { Provider } from 'react-redux'
import { store } from './app/store'


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 2,
			cacheTime: 1000 * 60 * 60 * 4,
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	//<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AuthContextProvider>
					<Provider store={store}>
				      <App />
			        </Provider>
				</AuthContextProvider>
			</BrowserRouter>
		</QueryClientProvider>
	//</React.StrictMode> 
);

