import { QuantityPicker } from 'react-qty-picker';

const ProductCard = ({ data }) => {

return (
    <div className="product-card">
  
  <div className="description">
    <h2>{data.name}</h2>
    <h4>{data.type}</h4>
    <h1>{data.price} kr</h1>
    <p>{data.description}</p>
    <QuantityPicker/>
    <button className='add-card-button'>Add to Cart</button>
    {/* <button>Wishlist</button> */}
  </div>
</div>

);

};

export default ProductCard