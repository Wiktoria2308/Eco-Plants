import BasicTable from '../components/BasicTable'
import { useMemo } from "react";
import Container from "react-bootstrap/Container";
import { Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { removeProduct } from '../reducers/shoppingCartReducer';
import { QuantityPicker } from 'react-qty-picker';
import PlaceholderPhoto from "../assets/images/placeholder-plant.png";
import { changeQuantity } from '../reducers/shoppingCartReducer'
import { ImBin } from 'react-icons/im';
import EmptyShopingCart from '../components/EmptyShopingCart'
// import {useState} from "react";

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.shoppingCart.value)

	console.log(products)

    const addMoreProducts = (product, value) => {
    // sent two parameters to reducer product object and value to change
    dispatch(changeQuantity([product, value]));    
    }

    const columns = useMemo(() => {
		return [
			{
				Header: "Photo",
				accessor: "photoURL",
				Cell: (tableProps) => (
					<Image
						src={
							tableProps.row.original.photoURL ||
							<PlaceholderPhoto />
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
				accessor: "shopQuantity",
                Cell: ({ row: { original: product } }) => (
                    <QuantityPicker onChange={(value) => addMoreProducts(product, value)} value={product.shopQuantity} min={1} max={product.quantity}/>
                )
			},
            {
				Header: "Price (SEK)",
				accessor: "price",
			},
            {
				Header: "Total (SEK)",
				accessor: "total",
				// Cell: ({ row }) => `${row.original.shopQuantity * row.original.price}`,
				
				Footer: info => {
					// Only calculate total visits if rows change
					const total = useMemo(
					  () =>
						info.rows.reduce((sum, row) => row.values.total + sum, 0),
					  [info.rows]
					)
					return <>Total: {total}</>
				  },
			},
			{
				Header: "Remove",
				Cell: ({ row: { original: product } }) => (
					<Button
						className='remove-product-button'
						size="sm"
						onClick={() => dispatch( removeProduct(product) )}
					>
						<ImBin className="trash-bin" />
					</Button>
				)
			},
		];
	}, []);

	return (
		<Container className="py-3 table-responsive">
			{products.length !== 0 ? <BasicTable columns={columns} data={products} /> :null}
            {products.length === 0 ? <EmptyShopingCart /> :null}
		</Container>
	);

}

export default ShoppingCart;