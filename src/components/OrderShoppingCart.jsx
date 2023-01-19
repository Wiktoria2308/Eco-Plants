import { BsCardChecklist } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
  }

  return stripePromise;
};

const OrderShoppingCart = ({ products, total }) => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const checkoutData = products.map(item => (

      {
        price: item.price_id,
        quantity: item.shopQuantity,
        
      }
  ));
 
  const checkoutOptions = {
    lineItems: checkoutData,
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  };


  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };
  if (stripeError) alert(stripeError);

  return (
    <div className="order-shopping-cart-container">
      <div className="order-shopping-cart-order">
        <BsCardChecklist className="order-icon" />
        <h5>My order</h5>
      </div>
      <div className="order-shopping-cart-shipping">
        <p>Shipping:</p>
        <p>Free</p>
      </div>
      <div className="order-shopping-cart-total">
        <p>Total:</p>
        <p>{total} kr</p>
      </div>
    
      <button
        className="go-to-checkout-button"
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Checkout"}
      </button>
    </div>
  );
};
export default OrderShoppingCart;
