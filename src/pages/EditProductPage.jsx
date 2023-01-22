import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import EditProductForm from "../components/EditProductForm";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";

const EditProductPage = () => {
    const { id } = useParams();

	const { getProduct } = useProduct();
	const { data } = getProduct(id);

	return (
		<Container className="py-3 center-y">
			<Row>
				{data && (
					<>
						<Col md={{ span: 6, offset: 3 }}>
							<EditProductForm product={data} />
						</Col>
					</>
				)}
			</Row>
		</Container>
	);
};
export default EditProductPage;