import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavDropdown, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Title from "../assets/images/Eco-plants.png";
import Avatar from "../assets/images/avatar.jpeg"
import { useState, useEffect } from "react";
import { SlArrowDown } from 'react-icons/sl';
import {TiShoppingCart} from 'react-icons/ti';
import PlantsDropdown from '../components/PlantsDropdown';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux'
import ShoppingCartNavigation from "./ShoppingCartNavigation";

const Navigation = () => {
	const { currentUser, userName, userPhotoUrl, isAdmin } = useAuthContext();
	const [navbar, setNavbar] = useState(false);
	const products = useSelector(state => state.shoppingCart.value);
	const [productsCart, setProductsCart] = useState(null);

	const pathname = window.location.pathname;

	const sumProducts = (products) => {
	// const products = useSelector(state => state.shoppingCart.value)
	if(products){
		const result = products.map(function(product) {return product.shopQuantity;})
		
		if(result){
			const sum = result.reduce((partialSum, a) => partialSum + a, 0);
			setProductsCart(sum);
		}
	}
	}

	useEffect(()=> {
	sumProducts(products);
	},[products])

	
	//navbar scroll changeBackground function
  const changeBackground = () => {
    if (window.scrollY >= 47) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  useEffect(() => {
    changeBackground()
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground)
  })

	return (
		<>
		{ pathname !== "/shopping-cart" ? <Navbar expand="md" sticky="top" className={navbar ? "navbar active" : "navbar"}>
		<Container className="justify-content-end ">
			<Navbar.Brand as={Link} to="/" className="nav-brand col-9 col-md-6">
				<img className="brand-title" src={Title} alt="brand-title" />
			</Navbar.Brand>

			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" className="nav-links">
				<Nav className="ms-auto align-items-end">

				<PlantsDropdown />

				<Nav.Link className="nav-color accessories-link" as={NavLink} to="/accessories">
						Accessories
					</Nav.Link>

					{!currentUser && !isAdmin && (
						<>
							<Nav.Link className="nav-color line-style line-style-link" as={NavLink} to="/login">
								Login/Signup
							</Nav.Link>
						</>
					)}
					
					{currentUser && !isAdmin && (
						<>
							<NavDropdown
								className="nav-color line-style line-style-link profile-dropdown"
								title={
									<>
										<Image
											src={
												userPhotoUrl ||
												Avatar
											}
											className="image-avatar"
											height={30}
											width={30}
											fluid
											roundedCircle
										/>{" "}
										<span className="nav-color user-name">{userName}</span>
										<SlArrowDown className="arrow-down"/>
									</>
								}
							>
								<NavLink to="/update-profile" className="dropdown-item">
									Update Profile
								</NavLink>
								<NavDropdown.Divider />
								<NavLink to="/logout" className="dropdown-item">
									Log Out
								</NavLink>
							</NavDropdown>
						</>
					)}

					{isAdmin && (
						<NavDropdown
							className="nav-color line-style line-style-link profile-dropdown"
							title={
								<>
									<Image
										src={
											userPhotoUrl ||
											Avatar
										}
										className="image-avatar"
										height={30}
										width={30}
										fluid
										roundedCircle
									/>{" "}
									<span className="nav-color user-name">{userName}</span>
									<SlArrowDown className="arrow-down"/>
								</>
							}
						>
							<NavLink to="/users" className="dropdown-item">
								Users
							</NavLink>
							<NavDropdown.Divider />
							<NavLink to="/edit_products" className="dropdown-item ">
								Edit products
							</NavLink>
							<NavLink to="/create_product" className="dropdown-item">
								Create product
							</NavLink>
							<NavDropdown.Divider />
							<NavLink to="/update-profile" className="dropdown-item">
								Update Profile
							</NavLink>
							<NavLink to="/logout" className="dropdown-item">
								Log Out
							</NavLink>
						</NavDropdown>
					)}
						<NavLink to="/shopping-cart" className="shopping-cart-link">
					   <TiShoppingCart className="shopping-cart-icon"/>
					   {productsCart ? <Badge className="shopping-cart-badge" pill>{productsCart}</Badge> :null}
					   </NavLink>
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar> : <ShoppingCartNavigation />}
	</>
	);
};

export default Navigation;
