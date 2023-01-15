import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

const usePhotos = (id) => {
	const collectionRef = collection(db, "products_photos");

	const queryRef = query(
		collectionRef,
		where("product_id", "==", id)
	);

	const photosQuery = useFirestoreQueryData(
		["restaurants_images", { restaurant: id }],
		queryRef,
		{
			idField: "id",
			subscribe: true,
		}
	);

	return photosQuery;
};

export default usePhotos;
