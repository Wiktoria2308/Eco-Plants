
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
            const colRef = collection(db, "products")
            let fixType = type.charAt(0).toUpperCase() + type.slice(1);
            if(fixType.includes("-")){
               fixType = fixType.replace("-", " ")
            }
            if(fixType.includes('Vegetable') || fixType.includes('Herbs') ||fixType.includes('Flower')){
            fixType = fixType + " seeds"
            }

            const queryRef = query(colRef, where("type", "==", fixType))
    
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
        }, [type])

        return {
            data,
            isLoading,
        }


}

export default useProducts;