import CreateProductForm from "../components/CreateProductForm";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const CreateProductPage = () => {

return (
	<div className="py-3 center-y create-product-page">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<CreateProductForm />
				</Col>
			</Row>
		</div>
)


};
export default CreateProductPage;