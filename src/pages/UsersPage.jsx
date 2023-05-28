import { useMemo } from "react";
import Container from "react-bootstrap/Container";
import SortableTable from "../components/SortableTable";
import useUsers from "../hooks/useUsers";
import { Image, Button } from "react-bootstrap";
import useMakeAdmin from "../hooks/useMakeAdmin";
import Placeholder from '../assets/images/Placeholder-user.png'

const UsersPage = () => {
	const { data } = useUsers();

	const makeAdmin = async (tableProps) => {
		useMakeAdmin(tableProps.row.original.id);
	};

	const columns = useMemo(() => {
		return [
			{
				Header: "Photo",
				accessor: "photoURL",
				sortType: (a) => {
					if (!a.original.photoURL) {
						return 1;
					} else {
						return -1;
					}
				},
				Cell: (tableProps) => (
					<Image
						src={
							tableProps.row.original.photoURL ||
							Placeholder
						}
						width={60}
						roundedCircle
					/>
				),
			},
			{
				Header: "Userame",
				accessor: "name",
			},
			{
				Header: "E-mail",
				accessor: "email",
			},
			{
				accessor: "isAdmin",
				sortType: (a) => {
					if (!a.original.isAdmin) {
						return 1;
					} else {
						return -1;
					}
				},
				Cell: (tableProps) =>
					!tableProps.row.original.isAdmin ? (
						<Button
							className="custom-button"
							onClick={() => {
								makeAdmin(tableProps);
							}}
						>
							{" "}
							Make Admin{" "}
						</Button>
					) : (
						<i>(admin)</i>
					),
			},
		];
	}, []);

	return (
		<Container className="py-3 table-container">
			{data ? <SortableTable columns={columns} data={data} /> : null}
		</Container>
	);
};

export default UsersPage;
