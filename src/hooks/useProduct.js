import useStreamDocument from "./useStreamDocument";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const useProduct = () => {

	const getProduct = (id) => {
		return useStreamDocument("products", id);
	};

	const deleteProduct = async (id) => {
		const docRef = doc(db, "products", id);
		await deleteDoc(docRef);
	};

	return {
		getProduct,
		deleteProduct,
	};
};

export default useProduct;
