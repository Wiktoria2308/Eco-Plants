import PlaceholderPhoto from "../assets/images/placeholder-plant.png";
import { Card, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { MdHeight } from 'react-icons/md';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addToCart} from '../reducers/shoppingCartReducer'

const ProductsListCard = ({ product }) => {
  const [usePhotoUrl, setPhotoUrl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      setPhotoUrl(product.photoURL);
    }
  });

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

  <Col className="products-list-card-col" style={{maxWidth: '300px'}}>
      <Card className="products-list-card">
        <Card.Img
          variant="top"
          src={usePhotoUrl || PlaceholderPhoto}
          className="card-photo"
          alt="plant photo"
          onClick={handleClick}
        />
        <Card.Body >
          <Card.Title onClick={handleClick}>{product.name}</Card.Title>
          { product.height !== "" ?<Card.Subtitle> 
        <MdHeight className='card-height-icon'/>
         <span className="product-height">{product.height} cm</span> 
             </Card.Subtitle> : null}
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
