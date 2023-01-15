import { Row } from "react-bootstrap";
import ProductsListCard from "./ProductsListCard";

const ProductsList = ({ products }) => {
	return (
		<>
			<Row className="overflow-scroll row-with-products" s={1} xs={1} md={3} lg={3}>
				{products &&
					products.map((product, index) => (
						<ProductsListCard
							key={index}
							product={product}
						></ProductsListCard>
					))}
			</Row>
		</>
	);
};

export default ProductsList;