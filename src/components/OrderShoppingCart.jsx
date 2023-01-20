import { BsCardChecklist } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const OrderShoppingCart = ({ total }) => {

const navigate = useNavigate();


const handleClick = (e) => {
  e.preventDefault();
  navigate('/shipping')
}

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
        onClick={handleClick}
      >
      Checkout
      </button>

    </div>
  );
};
export default OrderShoppingCart;
