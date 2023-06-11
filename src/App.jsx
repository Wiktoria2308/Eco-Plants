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
import RequireUserAuth from "./components/RequireUserAuth";
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
import MainCategoryProducts from "./pages/MainCategoryProducts";
import ShippingPage from "./pages/ShippingPage";
import OrdersPage from "./pages/OrdersPage";
import OrdersUserPage from "./pages/OrdersUserPage";
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

        <Route path="/:category/:type" element={<ProductsPage />} />
        <Route path="/:category/:type/:id" element={<ProductPage />} />
        <Route path="/:category/:id" element={<ProductPage />} />

        <Route
          path="/house-plants"
          element={<MainCategoryProducts name="Houseplants" />}
        />
        <Route
          path="/garden-plants"
          element={<MainCategoryProducts name="Garden plants" />}
        />
        <Route path="/seeds" element={<MainCategoryProducts name="Seeds" />} />
        <Route
          path="/accessories"
          element={<MainCategoryProducts name="Accessories" />}
        />

        {/* routes for logged in users */}
        <Route
          path="/update-profile"
          element={
            <RequireUserAuth>
              <UpdateProfilePage />
            </RequireUserAuth>
          }
        />
        <Route
          path="/my-orders"
          element={
            <RequireUserAuth>
              <OrdersUserPage />
            </RequireUserAuth>
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
            <RequireAdminAuth>
              <OrdersPage />
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
