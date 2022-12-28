import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

const useEditPhotos = (id) => {
	const collectionRef = collection(db, "products_images");

	const queryRef = query(collectionRef, where("product_id", "==", id));

	const photosQuery = useFirestoreQueryData(
		["products_images_edit", { product: id }],
		queryRef,
		{
			idField: "id",
			subscribe: true,
		}
	);

	return photosQuery;
};

export default useEditPhotos;
