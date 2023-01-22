import useOrders from "../hooks/useOrders";


const OrdersList = (admin) => {

    const { data } = useOrders();

    let ifArray = Array.isArray(data);

    if(ifArray){
        ifArray = data;
    }

    return (
       <>
   { admin.admin === "true" ? <div className="orders-page-container">
       {data ? data.map((order, index) => (
          <div key={index} className="orders-page">
            <p>Order {index  + 1}:</p>
            <p>User: {order.email}</p>
            <p>Date: {new Date(order.created.seconds * 1000).toLocaleString('pl-PL')}</p>
            <p>Total price: {order.total_price}</p>
            <ol> <span>Products:</span>
                { order.products.map((product, index) => (
                   <li key={index}>
                    <p>Product number: {product.id}</p>
                    <p>Name: {product.name}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Total sum: {product.total_sum}</p>
                   </li>
                ))}
            </ol>
          </div>
        )) : null }
        { data === undefined || ifArray.length === 0 ? <div className="no-orders">You have no orders yet.</div> : null}

         </div> : null}


       {admin.admin === "false" ? <div className="orders-page-container">
       {data ? data.map((order, index) => (
          <div key={index} className="orders-page">
            <p>Order {index  + 1}:</p>
            <p>Date: {new Date(order.created.seconds * 1000).toLocaleString('pl-PL')}</p>
            <p>Total price: {order.total_price}</p>
            <ol> <span>Products:</span>
                { order.products.map((product, index) => (
                   <li key={index}>
                    <p>Product number: {product.id}</p>
                    <p>Name: {product.name}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Total sum: {product.total_sum}</p>
                   </li>
                ))}
            </ol>
          </div>
        )) : null } 
        { data === undefined || ifArray.length === 0 ? <div className="no-orders">You have no orders yet.</div> : null}
        </div>  : null}

       </>

    )
}

export default OrdersList;