import useAllCategoryProducts from "../hooks/useAllCategoryProducts";
import ProductsList from "../components/ProductsList";

import LoadingSpinner from "../components/LoadingSpinner";

const GardenPlantsPage = () => {
 

    const {data:products, isLoading} = useAllCategoryProducts('Garden plants');


    return (
        <div className="products-page-container">

         {isLoading && <LoadingSpinner />}
           
         <ProductsList products={products}/> 
               
    </div>
    )
    
};
export default GardenPlantsPage;