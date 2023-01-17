import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Title from "../assets/images/Eco-plants.png";
import { Link } from "react-router-dom";

const ShoppingCartNavigation = () => {
return(
    <Navbar expand="md">
     <Container className="justify-content-center text-center">
     <Navbar.Brand as={Link} to="/" className="nav-brand col-9 col-md-6">
					<img className="brand-title" src={Title} alt="brand-title" />
	</Navbar.Brand>
     </Container>
    </Navbar>
)
}

export default ShoppingCartNavigation;