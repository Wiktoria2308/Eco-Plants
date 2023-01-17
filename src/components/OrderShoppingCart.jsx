import { useNavigate} from "react-router-dom";
import {BsCardChecklist}  from 'react-icons/bs';

const OrderShoppingCart = ({total}) => {
    const navigate = useNavigate();

    const handleCheckout = (e) => {
        e.preventDefault();
        navigate('/checkout');
      }

return(
    <div className="order-shopping-cart-container">
        <div className="order-shopping-cart-order">
        <BsCardChecklist className="order-icon"/>
        <h5>My order</h5>
        </div>
        <div className="order-shopping-cart-total">
            <p>Total:</p>
            <p>{total} kr</p>
        </div>
       <button onClick={handleCheckout}>Checkout</button> 
    </div>
)
}
export default OrderShoppingCart;