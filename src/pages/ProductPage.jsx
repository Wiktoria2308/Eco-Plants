import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import usePhotos from "../hooks/usePhotos";
import PlaceholderPhoto from "../assets/images/placeholder-plant.png";

const ProductPage = () => {
    const { id } = useParams();
	const { getProduct } = useProduct();
	const { data } = getProduct(id);
	const { data: photos } = usePhotos(id);


return (
    <>
    <div class="plant-photo">
        <img src={
			photos && photos.length ? photos[0].url : PlaceholderPhoto
		}
        className="plant-photo"
		alt="plant photo"
        >

        </img>
    </div>
    <ProductCard data={data}/>
    </>
)

};
export default ProductPage;