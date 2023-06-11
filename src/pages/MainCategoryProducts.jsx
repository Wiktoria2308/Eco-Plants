import useAllCategoryProducts from "../hooks/useAllCategoryProducts";
import ProductsList from "../components/ProductsList";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const MainCategoryProducts = ({ name }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products, isLoading } = useAllCategoryProducts(name);

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="products-page-container">
      {isLoading && <LoadingSpinner />}

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar-input"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="no-products-text">No products found.</p>
      ) : (
        <ProductsList products={filteredProducts} />
      )}
    </div>
  );
};
export default MainCategoryProducts;
