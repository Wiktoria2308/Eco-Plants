
import Carousel from '../components/CarouselPlants'


const HomePage = () => {
  return (
    <div className="homepage">
      <div className="home-header-container">
        <div className="home-heading-container">
          <h1>Find your favourite plant</h1>
          <p>In our eco friendly online store</p>
          <div className="btn-container">
            <button className="button-shop-now">
              <span className="text">Shop Now</span>
              <div className="icon-container">
                <div className="icon icon--left">
                  <svg>
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </div>
                <div className="icon icon--right">
                  <svg>
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="home-image-container">
            <Carousel />
        </div>
        <svg style={{ display: "none" }}>
          <symbol id="arrow-right" viewBox="0 0 20 10">
            <path d="M14.84 0l-1.08 1.06 3.3 3.2H0v1.49h17.05l-3.3 3.2L14.84 10 20 5l-5.16-5z"></path>
          </symbol>
        </svg>
      </div>
    </div>
  );
};

export default HomePage;
