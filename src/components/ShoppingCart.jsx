import BasicTable from '../components/BasicTable'
import { useMemo } from "react";
import Container from "react-bootstrap/Container";
import { Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { removeProduct } from '../reducers/shoppingCartReducer';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.shoppingCart.value)

    console.log(products);

    const columns = useMemo(() => {
		return [
			{
				Header: "Photo",
				accessor: "photoURL",
				Cell: (tableProps) => (
					<Image
						src={
							tableProps.row.original.photoURL ||
							"https://www.salisburyut.com/wp-content/uploads/2020/09/avatar-1-scaled.jpeg"
						}
						width={60}
					/>
				),
			},
			{
				Header: "Name",
				accessor: "name",
			},
			{
				Header: "Quantity",
				// accessor: "quantity",
			},
            {
				Header: "Price",
				accessor: "price",
			},
            {
				Header: "Total",
				// accessor: "total",
			},
			{
				Header: "Remove",
				Cell: ({ row: { original: product } }) => (
					<Button
						variant="primary"
						size="sm"
						onClick={() => dispatch( removeProduct(product) )}
					>
						Remove
					</Button>
				)
			},
		];
	}, []);

	return (
		<Container className="py-3 table-responsive">
			{products && <BasicTable columns={columns} data={products} />}
		</Container>
	);

}

export default ShoppingCart;