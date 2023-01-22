import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import SignupForm from "../components/SignUpForm";

const SignupPage = () => {
	const [formValues, setFormValues] = useState();

	const { signup } = useAuthContext();
	

	useEffect(() => {
		if (!formValues) {
			return;
		}
			signup(
				formValues.email,
				formValues.password,
				formValues.name,
				formValues.photo
			);
		
	}, [formValues]);

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Sign Up</Card.Title>

							<SignupForm setFormValues={setFormValues}></SignupForm>
						</Card.Body>
					</Card>

					<div className="text-center mt-3">
						Already have an account? <Link to="/login">Log In</Link>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default SignupPage;
