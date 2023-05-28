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
import { useEffect} from "react";
import { changeTotal } from '../reducers/totalPrice'
import OrderShoppingCart from '../components/OrderShoppingCart'

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.shoppingCart.value)
	const total = useSelector(state => state.total.balance)

    const addMoreProducts = (product, value) => {
    // sent two parameters to reducer product object and value to change
    dispatch(changeQuantity([product, value]));    
    }

	const changeTotalPrice = (products) => {
		if(products){
			const result = products.map(function(product) {return product.total;})
			
			if(result){
				const sum = result.reduce((partialSum, a) => partialSum + a, 0);
				dispatch(changeTotal(sum));
			}
		}
		}
	
		useEffect(()=> {
	    changeTotalPrice(products);
		},[products])


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
		<Container className="py-3">
			{products.length !== 0 ? <BasicTable columns={columns} data={products} /> :null}
            {products.length === 0 ? <EmptyShopingCart /> :null}
			{products.length !== 0 ? <OrderShoppingCart total={total} />:null}
		</Container>
	);

}

export default ShoppingCart;