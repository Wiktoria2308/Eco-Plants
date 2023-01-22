import useAllProducts from "../hooks/useAllProducts";
import ProductsList from "../components/ProductsList"

const AllProductsPage = () => {

    const {data: products}= useAllProducts();

    return (
        <>
        <div className="products-page-container">
           
       { products && <ProductsList products={products}/>}
               
    </div>
    </>
    )

}

export default AllProductsPage;