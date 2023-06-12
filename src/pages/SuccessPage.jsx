import { BsCheck2Circle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { resetStateTotal } from "../reducers/totalPrice";
import { resetStateCart } from "../reducers/shoppingCartReducer";
import { useDispatch } from "react-redux";
import { collection, addDoc} from "firebase/firestore";
import { db } from "../firebase/index";
import { useSelector } from "react-redux";
import useProduct from "../hooks/useProduct";


axios.defaults.baseURL = "https://api.stripe.com";

const stripe_api_key = import.meta.env.VITE_STRIPE_SECRET_KEY;

axios.defaults.headers.common = { Authorization: `Bearer ${stripe_api_key}` };

const SuccessPage = () => {
  let [searchParams] = useSearchParams();
  const { updateProductQuantity } = useProduct();
  const dispatch = useDispatch();
  const sessionID = searchParams.get("session_id");
  const products = useSelector(state => state.shoppingCart.value)
	const total = useSelector(state => state.total.balance)
  const [order] = useState(localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : [])

  const getSessionInfo = async (session_id) => {
    await axios
      .get(`/v1/checkout/sessions/${session_id}`)
      .then((response) => {
        if (response.data.payment_status === "paid") {
          
          if(order){
          
            let items = []
            products.forEach((product) => {
              let item = {id: product.id, name: product.name, quantity:product.shopQuantity, total_sum: product.total}
              items.push(item)
            })
            let newOrder = {
              ...order[0],
              session_id : session_id,
              total_price: total,
              products : items,
              created : new Date(response.data.created * 1000),
            }
            dispatch(resetStateTotal());
            dispatch(resetStateCart());
            saveOrder(newOrder);
          }
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  const saveOrder = async(data) => {
    if(JSON.parse(localStorage.getItem('order')).length > 0){
        //running twice in strict mode and writing twice to database
        try{
          await addDoc(collection(db, "orders"), {
            ...data,
         }); 

         products.forEach(async (product) => {
          const newQuantity = product.quantity - product.shopQuantity;
          updateProductQuantity(product.id, newQuantity )
        });

        }catch(error) {  
          console.warn(error);
    }
  }
      localStorage.setItem("order", JSON.stringify([]));  
      localStorage.setItem("persistantState", JSON.stringify({})); 
  }
  


  
  useEffect(() => {
    if (sessionID) {
      getSessionInfo(sessionID);
    }
  }, []);


  return (
    <div className="success-page-container">
      <BsCheck2Circle className="success-icon" />
      <h1>Thanks for your order!</h1>
      <p>
        We appreciate your business! If you have any questions, please email:
        ecoplants@example.com
      </p>
      <Link className="continue-shop" to="/">
        Return to home page
      </Link>
    </div>
  );
};
export default SuccessPage;
