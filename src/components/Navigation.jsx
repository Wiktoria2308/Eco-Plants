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
import PlantsDropdown from '../components/PlantsDropdown';

const Navigation = () => {
	const { currentUser, userName, userPhotoUrl, isAdmin } = useAuthContext();
	const [navbar, setNavbar] = useState(false);
	//navbar scroll changeBackground function
  const changeBackground = () => {
    if (window.scrollY >= 97) {
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
		<Navbar variant="dark" expand="md" sticky="top" className={navbar ? "navbar active" : "navbar"}>
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
								<NavLink to="/edit_restaurants" className="dropdown-item ">
									Edit products
								</NavLink>
								<NavLink to="/create_restaurant" className="dropdown-item">
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
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
