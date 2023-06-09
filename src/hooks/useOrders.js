import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const useOrders = () => {
  const { currentUser, isAdmin } = useAuthContext();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getQueryRef = () => {
      const colRef = collection(db, "orders");
      let queryRef = query(colRef, orderBy("created"));

      if (!isAdmin) {
        queryRef = query(colRef, where("email", "==", currentUser.email), orderBy("created"));
      }

      return queryRef;
    };

    const queryRef = getQueryRef();

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      setIsLoading(true);

      const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setData(orders);
      setIsLoading(false);
      setIsError(false);
    }, (error) => {
      setIsLoading(false);
      setIsError(true);
      console.error("Error fetching orders:", error);
    });

    return () => unsubscribe();
  }, [currentUser, isAdmin]);

  return { data, isLoading, isError };
};

export default useOrders;
