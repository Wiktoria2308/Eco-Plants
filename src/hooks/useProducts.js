
import {
	collection,
	onSnapshot,
	query,
    where
} from 'firebase/firestore'
import { db } from '../firebase'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


const useProducts = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true)
    const { type } = useParams();


         useEffect(() => {
            // get reference to collection
            const colRef = collection(db, "products")
            const fixType = type.charAt(0).toUpperCase() + type.slice(1);
            const queryRef = query(colRef, where("type", "==", fixType))
    
            // subscribe to changes in collection
            const unsubscribe = onSnapshot(queryRef, (snapshot) => {
                // got me a new snapshot 🤳🏻
                const docs = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    }
                })
    
                setData(docs)
                setLoading(false)
            })
    
            return unsubscribe
        }, [type])

        return {
            data,
            isLoading,
        }


}

export default useProducts;