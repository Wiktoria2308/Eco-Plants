import PlaceholderPhoto from "../assets/images/placeholder-plant.png";
import { Card, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addToCart} from '../reducers/shoppingCartReducer'

const ProductsListCard = ({ product }) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleImageLoad = () => {
    setImageLoaded(true);
  }

  const handleClick = (e) => {
    e.preventDefault();
    const twoSlash = /\/.*\//.test(location.pathname )
    if(twoSlash){

      navigate(`${location.pathname}/${product.id}`)
    }
    else {
      let productType = product.type;
      if(productType.includes(" ")){
        productType = productType.replace(" ", "-")
     }
      navigate(`${location.pathname}/${productType}/${product.id}`)
    }
   
  }

  const handleAddToCart = (product) => {
    if(product.shopQuantity){
      dispatch(addToCart([product, 1])); 
    }
    else {
      product.shopQuantity = 1;
      dispatch(addToCart([product, 0]));
    }
  }

  return (

  <Col className="products-list-card-col" style={{maxWidth: '250px'}}>
      <Card className="products-list-card">
           {!isImageLoaded && (
           <Card.Img
              variant="top"
              src={PlaceholderPhoto}
              alt="Placeholder"
            />
        )}
        <Card.Img
          variant="top"
          src={product.photoURL}
          className={`card-photo ${isImageLoaded ? 'show' : 'hide'}`}
          alt="plant photo"
          onClick={handleClick}
          onLoad={handleImageLoad}
        />
        <Card.Body >
          <Card.Title onClick={handleClick}>{product.name}</Card.Title>
          <Card.Text>
           {product.price} kr
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        { product.quantity > 0 ? <button className='add-to-cart' onClick={()=>{handleAddToCart(product)}}>Add to Cart</button>  : null }
        { product.quantity === 0 ? <button className='add-to-cart disabled' disabled>Out of stock</button>  : null }

        </Card.Footer>
      </Card>
      </Col>

  );
};

export default ProductsListCard;
