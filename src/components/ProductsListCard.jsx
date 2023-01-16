import PlaceholderPhoto from "../assets/images/placeholder-plant.png";
// import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { MdHeight } from 'react-icons/md';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addToCart } from '../reducers/shoppingCartReducer'

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
    navigate(`${location.pathname}/${product.id}`)
  }
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  return (

  <Col style={{maxWidth: '300px'}}>
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
          <Card.Subtitle>  <MdHeight className='card-height-icon'/><span className="product-height">{product.height} cm</span></Card.Subtitle>
          <Card.Text>
           {product.price} kr
          </Card.Text>
        </Card.Body>
        <Card.Footer> <button className='add-to-cart' onClick={()=>{handleAddToCart(product)}}>Add to Cart</button></Card.Footer>
      </Card>
      </Col>

  );
};

export default ProductsListCard;
