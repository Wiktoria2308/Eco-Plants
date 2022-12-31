import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavDropdown, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Title from "../assets/images/Eco-plants.png";
import Avatar from "../assets/images/avatar.jpeg"

const Navigation = () => {
	const { currentUser, userName, userPhotoUrl, isAdmin } = useAuthContext();

	return (
		<Navbar variant="dark" expand="md" className="navbar">
			<Container className="justify-content-end ">
				<Navbar.Brand as={Link} to="/" className="nav-brand col-9 col-md-6">
					<img className="brand-title" src={Title} alt="brand-title" />
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="nav-links">
					<Nav className="ms-auto align-items-end">
						<Nav.Link className="nav-color line-style line-style-link" as={NavLink} to="/products">
							Products
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
									className="nav-color"
									title={
										<>
											<Image
												src={
													userPhotoUrl ||
													Avatar
												}
												height={30}
												width={30}
												fluid
												roundedCircle
											/>{" "}
											<span className="nav-color">{userName}</span>
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
								className="nav-color"
								title={
									<>
										<Image
											src={
												userPhotoUrl ||
												Avatar
											}
											height={30}
											width={30}
											fluid
											roundedCircle
										/>{" "}
										<span className="nav-color">{userName}</span>
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
