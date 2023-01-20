import useAllCategoryProducts from "../hooks/useAllCategoryProducts";
import ProductsList from "../components/ProductsList";

import LoadingSpinner from "../components/LoadingSpinner";

const AccessoriesPage = () => {
 

    const {data:products, isLoading} = useAllCategoryProducts('Accessories');


    return (
        <div className="products-page-container">

         {isLoading && <LoadingSpinner />}
           
         <ProductsList products={products}/> 
               
    </div>
    )
    
};
export default AccessoriesPage;