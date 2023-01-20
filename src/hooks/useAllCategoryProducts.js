
import {
	collection,
	onSnapshot,
	query,
    where
} from 'firebase/firestore'
import { db } from '../firebase'
import { useState, useEffect } from "react";


const useAllCategoryProducts = (category) => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true)


         useEffect(() => {
            const colRef = collection(db, "products")
            const queryRef = query(colRef, where("category", "==", category))
    
       
            const unsubscribe = onSnapshot(queryRef, (snapshot) => {
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
        }, [])

        return {
            data,
            isLoading,
        }


}

export default useAllCategoryProducts;