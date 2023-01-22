import OrdersList from "../components/OrdersList";
import { useAuthContext } from "../contexts/AuthContext";

const OrdersPage = () => {
    const { isAdmin } = useAuthContext();
return(
    <>
    {isAdmin ? <OrdersList admin="true"/> :  <OrdersList admin="false"/>}
  
    </>
)
}

export default OrdersPage;