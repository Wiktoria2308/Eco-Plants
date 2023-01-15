import { Row } from "react-bootstrap";
import ProductsListCard from "./ProductsListCard";

const ProductsList = ({ products }) => {
	return (
		<>
			<Row className="overflow-scroll">
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