import useStreamDocument from "./useStreamDocument";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const useProduct = () => {

	const getProduct = (id) => {
		return useStreamDocument("products", id);
	};

	const updateProductQuantity = async (id, newQuantity) => {
		const productRef = doc(db, "products", id);
		await updateDoc(productRef, { quantity: newQuantity });
	  };

	const deleteProduct = async (id) => {
		const docRef = doc(db, "products", id);
		await deleteDoc(docRef);
	};

	return {
		getProduct,
		deleteProduct,
		updateProductQuantity,
	};
};

export default useProduct;
