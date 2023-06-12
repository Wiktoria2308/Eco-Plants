import Carousel from 'react-bootstrap/Carousel';
import Image1 from '../assets/images/plant.png';
import Image2 from '../assets/images/plant2.png';
import Image3 from '../assets/images/plant3.png'

function CarouselPlants() {
    return (
      <Carousel fade controls={false} interval={3000} indicators={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image1}
            alt="First slide"
     
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image2}
            alt="Second slide"

          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Image3}
            alt="Third slide"

          />
        </Carousel.Item>
      </Carousel>
    );
  }
  
  export default CarouselPlants;