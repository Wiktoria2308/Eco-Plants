import { BsCheck2Circle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { resetStateTotal } from "../reducers/totalPrice";
import { resetStateCart } from "../reducers/shoppingCartReducer";
import { useDispatch } from "react-redux";

axios.defaults.baseURL = "https://api.stripe.com";

const stripe_api_key = import.meta.env.VITE_STRIPE_SECRET_KEY;

axios.defaults.headers.common = { Authorization: `Bearer ${stripe_api_key}` };

const SuccessPage = () => {
  let [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const sessionID = searchParams.get("session_id");

  const getSessionInfo = async (session_id) => {
    await axios
      .get(`/v1/checkout/sessions/${session_id}`)
      .then((response) => {
        if (response.data.payment_status === "paid") {
          setData(response.data);
          dispatch(resetStateTotal());
          dispatch(resetStateCart());
        } else {
          setData(null);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  useEffect(() => {
    if (sessionID) {
      getSessionInfo(sessionID);
    }
  }, [sessionID]);

  // console.log("data", data);

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
