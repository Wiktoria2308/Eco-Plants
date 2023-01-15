import PlaceholderPhoto from "../assets/images/placeholder-plant.png";
// import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { MdHeight } from 'react-icons/md';

const ProductsListCard = ({ product }) => {
  const [usePhotoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (product) {
      setPhotoUrl(product.photoURL);
    }
  });

  return (
    <>
      <Card className="products-list-card col-12 col-md-4">
        <Card.Img
          variant="top"
          src={usePhotoUrl || PlaceholderPhoto}
          className="card-photo"
          alt="plant photo"
        />
        <Card.Body className="card-body">
          <Card.Title className="card-title">{product.name}</Card.Title>
          <Card.Subtitle className="card-subtitle">  <MdHeight className='card-attribute-icon'/>{product.height} cm</Card.Subtitle>
          <Card.Text>
           {product.price} kr
          </Card.Text>
        </Card.Body>
        <Card.Footer className="card-footer"></Card.Footer>
      </Card>
    </>
  );
};

export default ProductsListCard;
