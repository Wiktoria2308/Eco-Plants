import { Routes, Route } from "react-router-dom";
import "./assets/scss/App.scss";
import "./assets/scss/Products.scss";
import "./assets/scss/ShoppingCart.scss";
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
import EditProductPage from "./pages/EditProductPage";
import EditProductsPage from "./pages/EditProductsPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import HousePlantsPage from "./pages/HousePlantsPage";
import GardenPlantsPage from "./pages/GardenPlantsPage";
import SeedsPage from "./pages/SeedsPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import ShippingPage from "./pages/ShippingPage";
import OrdersPage from "./pages/OrdersPage";
import AllProductsPage from "./pages/AllProductsPage";


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
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/all-products" element={<AllProductsPage />} />


	
        {[
          "/house-plants/:type",
          "/garden-plants/:type",
          "/seeds/:type",
          "/accessories/:type",
        ].map((path, index) => (
          <Route key={index} path={path} element={<ProductsPage />} />
        ))}

        {[
          "/house-plants/cactuses/:id",
		  "/house-plants/succulents/:id",
		  "/house-plants/orchids/:id",
          "/garden-plants/berry-bushes/:id",
		  "/garden-plants/ornamental-shrubs/:id",
          "/seeds/vegetable-seeds/:id",
		  "/seeds/herbs-seeds/:id",
		  "/seeds/flower-seeds/:id",
      "/accessories/soil/:id",
      "/accessories/watering-cans/:id",
      "/accessories/pots/:id",
        ].map((path, index) => (
          <Route key={index} path={path} element={<ProductPage />} />
        ))}

        {[
          "/house-plants/:id",
          "/garden-plants/:id",
          "/seeds/:id",
          "/accessories/:id",
        ].map((path, index) => (
          <Route key={index} path={path} element={<ProductPage />} />
        ))}
		

        <Route path="/house-plants" element={<HousePlantsPage />} />
        <Route path="/garden-plants" element={<GardenPlantsPage />} />
        <Route path="/seeds" element={<SeedsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />

        {/* routes for logged in users */}
        <Route
          path="/update-profile"
          element={
            <RequireAuth>
              <UpdateProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/my-orders"
          element={
            <RequireAuth>
              <OrdersPage />
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
          path="/orders"
          element={
            <RequireAuth>
              <OrdersPage />
            </RequireAuth>
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
