import { Routes, Route } from "react-router-dom";

import "./assets/scss/App.scss";
import "./assets/scss/Products.scss";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import UsersPage from "./pages/UsersPage";
import RequireAuth from "./components/RequireUserAuth";
import RequireAdminAuth from "./components/RequireAdminAuth";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CreateProductPage from "./pages/CreateProductPage";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import EditProductsPage from "./pages/EditProductsPage";
import EditProductPage from "./pages/EditProductPage";
import ShoppingCart from "./components/ShoppingCart";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFound />} />

				

				{/* opened routes */}
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/shopping-cart" element={<ShoppingCart />} />
				{/* <Route path="/house-plants/:type" element={<ProductsPage />} />
				<Route path="/garden-plants/:type" element={<ProductsPage />} />
				<Route path="/seeds/:type" element={<ProductsPage />} />
				<Route path="/accessories/:type" element={<ProductsPage />} /> */}
				{/* <Route path="/house-plants/:type/:id" element={<ProductPage />} /> */}
		
				{["/house-plants/:type", "/garden-plants/:type","/seeds/:type","/accessories/:type"].map((path, index) => (
                  <Route key={index} path={path} element={<ProductsPage />} />
                ))}
				{["/house-plants/:type/:id", "/garden-plants/:type/:id","/seeds/:type/:id","/accessories/:type/:id"].map((path, index) => (
                  <Route key={index} path={path} element={<ProductPage />} />
                ))}


				{/* routes for logged in users */}
				<Route
					path="/update-"
					element={
						<RequireAuth>
							<UpdateProfilePage />
						</RequireAuth>
					}
				/>

				{/* routes only for admins */}
				<Route
					path="/users"
					element={
						<RequireAdminAuth>
							<UsersPage />
						</RequireAdminAuth>
					}
				/>
			
				<Route
					path="/create_product"
					element={
						<RequireAdminAuth>
							<CreateProductPage />
						</RequireAdminAuth>
					}
				/>
				<Route
					path="/edit_products"
					element={
						<RequireAdminAuth>
							<EditProductsPage />
						</RequireAdminAuth>
					}
				/>
				<Route
					path="/edit_products/:id"
					element={
						<RequireAdminAuth>
							<EditProductPage />
						</RequireAdminAuth>
					}
				/>
			</Routes>

			<ToastContainer autoClose={3000} />
			<ReactQueryDevtools position="bottom-left" />
		</div>
	);
}

export default App;
