import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query } from "firebase/firestore";
import { db } from "../firebase";

const useAllProducts = () => {
	const queryRef = query(collection(db, "products"));

	const usersQuery = useFirestoreQueryData(["products"], queryRef, {
		idField: "id",
		subscribe: true,
	});
	return usersQuery;
};

export default useAllProducts;