import useAllProducts from "../hooks/useAllProducts";
import { useMemo } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import SortableTable from "../components/SortableTable";
import useProduct from "../hooks/useProduct";

const EditProductsPage = () => {

    const {data} = useAllProducts();

	const { deleteProduct } = useProduct();

	const columns = useMemo(() => {
		return [
			{
				Header: "#",
				accessor: "index",
				Cell: (row) => {
					return <div>{row.row.index + 1}</div>;
				},
			},
			{
				Header: "Name",
				accessor: "name",
			},
            {
				Header: "Category",
				accessor: "category",
			},
			{
				Header: "Type",
				accessor: "type",
			},
			{
				Header: "Price (SEK)",
				accessor: "price",
			},
			{
				Header: "Quantity",
				accessor: "quantity",
			},
			
			{
				accessor: "edit",
				id: "id",
				value: "id",
				Cell: (row) => {
					return (
						<ButtonGroup>
							<Button
								className="custom-button"
								as={Link}
								to={`/edit_products/${row.data[row.row.index].id}`}
							>
								{" "}
								Edit{" "}
							</Button>
							<Button
								variant="danger"
								onClick={() => deleteProduct(row.data[row.row.index].id)}
							>
								{" "}
								Delete{" "}
							</Button>
						</ButtonGroup>
					);
				},
			},
		];
	}, []);

	return (
		<Container className="py-3 table-container">
			{data && <SortableTable columns={columns} data={data} filterField={'name'} />}
		</Container>
	);
};
export default EditProductsPage;