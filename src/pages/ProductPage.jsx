import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import PlaceholderPhoto from "../assets/images/placeholder-plant.png";
import { useState, useEffect } from "react";

const ProductPage = () => {
    const { id } = useParams();
	const { getProduct } = useProduct();
	const { data } = getProduct(id);
   
    const [usePhotoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {

    if(data) {
        setPhotoUrl(data.photoURL);
    }

    })

return (
    <div className="product-page">
    <div className="product-card-container">
    <div className="plant-photo">
        <img src={
	        usePhotoUrl ||
            PlaceholderPhoto
        }
        className="plant-photo"
		alt="plant photo"
        >

        </img>
    </div>
    <ProductCard data={data}/>
    </div>
    </div>
)

};
export default ProductPage;