import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useAllCategoryProducts = (category) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const colRef = collection(db, "products");
    const queryRef = query(colRef, where("category", "==", category));

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      setIsLoading(true);

      const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setData(products);
      setIsLoading(false);
      setIsError(false);
    }, (error) => {
      setIsLoading(false);
      setIsError(true);
      console.error("Error fetching category products:", error);
    });

    return () => unsubscribe();
  }, [category]);

  return { data, isLoading, isError };
};

export default useAllCategoryProducts;
