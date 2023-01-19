import { Link } from "react-router-dom"

const CancelPage = () => {
return(

    <div className="cancel-page-container">
    <h4>Your order has been cancelled!</h4>
    <Link className="continue-shop" to='/'>Return to home page</Link>
    </div>

)
}

export default CancelPage