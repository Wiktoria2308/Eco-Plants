import { QuantityPicker } from 'react-qty-picker';
// import { GiWateringCan } from 'react-icons/gi';
import { MdHeight } from 'react-icons/md';
import { TbCircleHalfVertical } from 'react-icons/tb';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addToCart } from '../reducers/shoppingCartReducer'


const ProductCard = ({ data }) => {
    const [getValue, setValue] = useState(1);
    const dispatch = useDispatch();

  const getPickerValue = (value) =>{
    setValue(value);
}

const handleAddToCart = (product) => {
  if(product.shopQuantity){
    product.shopQuantity += getValue;
  }
  else {
    product.shopQuantity = getValue;
  }
  dispatch(addToCart(product));
}

return (
    <div className="product-card">
  
  <div className="description">
    <h2>{data.name}</h2>
    <h4>Type: {data.type}</h4>
    <h1>{data.price} kr</h1>
    <p className='product-description'>{data.description}</p>
    <div className='product-attributes'>
      <div className='product-attribute'>
        <MdHeight className='attribute-icon'/>
        <p>Height: <span className='product-attribute-data'>{data.height} cm</span></p>
      </div>
      <div className='product-attribute'>
        <TbCircleHalfVertical  className='attribute-icon'/>
        <p>Pot size: <span className='product-attribute-data'>{data.pot_size} cm</span></p>
      </div>
      <div className='product-attribute'>
        <TiWeatherPartlySunny  className='attribute-icon'/>
        <p>Location: <span className='product-attribute-data'>{data.location}</span></p>
      </div>
    
    </div>
    {data.quantity >= 5 ? <p className='stock-status stock-status-available'>Available</p> :null}
    {data.quantity >= 1 &&  data.quantity < 5 ? <p className='stock-status stock-status-few'>Few in stock</p> :null}
    {data.quantity == 0 ? <p className='stock-status stock-status-out'>Out of stock</p> :null}
    { data.quantity > 0 ? <QuantityPicker onChange={(value) => getPickerValue(value)} value={1} min={1} max={data.quantity}/> :null}
    { data.quantity > 0 ? <button className='add-card-button' onClick={()=>{handleAddToCart(data)}}>Add to Cart</button> :null}
    {/* <button>Wishlist</button> */}
  </div>
</div>

);

};

export default ProductCard