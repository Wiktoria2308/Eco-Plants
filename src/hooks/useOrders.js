import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const useOrders = () => {
  const { currentUser } = useAuthContext();
  const { isAdmin } = useAuthContext();

  if(isAdmin) {
    const colRef = query(collection(db, "orders"));

    const queryRef = query(colRef, orderBy("created"));
  
    const usersQuery = useFirestoreQueryData(["orders"], queryRef, {
      idField: "id",
      subscribe: true,
    });
  
    return usersQuery;
  }
  else {
    const colRef = query(collection(db, "orders"));

    const queryRef = query(colRef, where("email", "==", currentUser.email), orderBy("created"));
  
    const usersQuery = useFirestoreQueryData(["orders"], queryRef, {
      idField: "id",
      subscribe: true,
    });
  
    return usersQuery;
  };
  }
  


export default useOrders;
