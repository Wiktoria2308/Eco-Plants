import { Link } from "react-router-dom"

const EmptyShopingCart = () => {
return(
    <div className="empty-cart-container">
        <h4 className="empty-cart-h1">Your shopping cart is empty</h4>
        <Link className="continue-shop" to='/'>Continue shopping</Link>
    </div>
)
}
export default EmptyShopingCart