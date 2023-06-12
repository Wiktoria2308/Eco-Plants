import useAllCategoryProducts from "../hooks/useAllCategoryProducts";
import ProductsList from "../components/ProductsList";
import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FcCheckmark } from 'react-icons/fc';

const MainCategoryProducts = ({ name }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("Sort by");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: products, isLoading } = useAllCategoryProducts(name);

  const filteredProducts = products
    ?.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "lowest-price") {
        return a.price - b.price;
      } else if (sortOrder === "highest-price") {
        return b.price - a.price;
      }
      return 0;
    });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="products-page-container">

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar-input"
        />
      </div>

      <div className="dropdown-wrapper" ref={dropdownRef}>
        <div className={`dropdown ${dropdownOpen ? "open" : ""}`}>
          <button className="dropdown-btn" onClick={toggleDropdown}>
            Sort by {dropdownOpen ? <SlArrowUp className="sort-arrow-up" /> : <SlArrowDown className="sort-arrow-down" />}
          </button>
          <div className="dropdown-content">
            <div className="dropdown-content-whiteline"></div>
            <label
              className={`dropdown-option ${sortOrder === "lowest-price" ? "selected" : ""}`}
              onClick={() => handleSortOrder({ target: { value: "lowest-price" } })}
            >
              <span className="option-text">Lowest price</span>
              {sortOrder === "lowest-price" && <FcCheckmark className="dropdown-checkmark" />}
            </label>
            <label
              className={`dropdown-option ${sortOrder === "highest-price" ? "selected" : ""}`}
              onClick={() => handleSortOrder({ target: { value: "highest-price" } })}
            >
              <span className="option-text">Highest price</span>
              {sortOrder === "highest-price" && <FcCheckmark className="dropdown-checkmark" />}
            </label>
          </div>
        </div>
      </div>

      {isLoading && <LoadingSpinner />}

      {filteredProducts.length === 0 ? (
        <p className="no-products-text">No products found.</p>
      ) : (
        <ProductsList products={filteredProducts} />
      )}
    </div>
  );
};

export default MainCategoryProducts;
