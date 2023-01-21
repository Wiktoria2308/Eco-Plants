import { useAuthContext } from "../contexts/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserAddressForm from "../components/UserAddressForm";


let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
  }
  return stripePromise;
};

const ShippingPage = () => {
  const products = useSelector((state) => state.shoppingCart.value);
  const { currentUser } = useAuthContext();

  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const checkoutData = products.map((item) => ({
    price: item.price_id,
    quantity: item.shopQuantity,
  }));

  const checkoutOptions = {
    lineItems: checkoutData,
    mode: "payment",
    successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  const redirectToCheckout = async () => {
    setLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);

    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };
  if (stripeError) alert(stripeError);

  return (
    <>
        <UserAddressForm
          user={currentUser}
          redirect={redirectToCheckout}
          loading={isLoading}
        />
    </>
  );
};

export default ShippingPage;
