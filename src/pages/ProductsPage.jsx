import useProducts from "../hooks/useProducts";
import ProductsList from "../components/ProductsList";

import LoadingSpinner from "../components/LoadingSpinner";

const ProductsPage = () => {
 

    const {data:products, isLoading} = useProducts();


    return (
        <div className="products-page-container">

         {isLoading && <LoadingSpinner />}
           
         <ProductsList products={products}/> 
               
    </div>
    )
    
};
export default ProductsPage;