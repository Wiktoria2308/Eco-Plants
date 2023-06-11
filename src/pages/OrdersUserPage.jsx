import useOrders from "../hooks/useOrders";
import SortableTable from "../components/SortableTable";
import Container from "react-bootstrap/Container";
import { useState } from "react";

const OrdersUserPage = () => {

  const { data, isLoading, isError } = useOrders();

  const [expandedOrders, setExpandedOrders] = useState([]);

  const toggleOrder = (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter((id) => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };

  const renderProductDetails = (products) => {
    return (
      <div className="products-container">
        {products.map((product, index) => (
          <div className="product-item" key={index}>
            <p>
              <span className="product-details">Product number:</span> {product.id}
            </p>
            <p>
              <span className="product-details">Name:</span> {product.name}
            </p>
            <p><span className="product-details">Quantity:</span> {product.quantity}</p>
            <p><span className="product-details">Total sum:</span> {product.total_sum}</p>
            {index !== products.length - 1 && <hr className="separator" />}
          </div>
        ))}
      </div>
    );
  };

  const getButtonText = (orderId) => {
    return expandedOrders.includes(orderId) ? "Hide Products" : "Show Products";
  };

  const columns = [
    {
      Header: "Order",
      accessor: (row, index) => `Order ${index + 1}`,
      Cell: ({ value }) => <span>{value}</span>,
    },
    {
      Header: "Date",
      accessor: (row) =>
        new Date(row.created.seconds * 1000).toLocaleString("pl-PL"),
      Cell: ({ value }) => <span>{value}</span>,
    },
    {
      Header: "Total Price",
      accessor: "total_price",
      Cell: ({ value }) => <span>{value}</span>,
    },
    {
      Header: "Products",
      accessor: "products",
      Cell: ({ value }) => (
        <div className="products-cell">
          <button className="toggle-button" onClick={() => toggleOrder(value)}>
            {getButtonText(value)}
          </button>
          {expandedOrders.includes(value) && (
            <div className="products-scroll-container">
              {renderProductDetails(value)}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="orders-page-container">
      {isLoading ? <div>Loading orders...</div> : null}
      {isError ? <div>Error loading orders.</div> : null}
      {data && data.length > 0 ? (
        <Container className="py-3 table-container">
          <SortableTable columns={columns} data={data} filterField={null} />
        </Container>
      ) : null}
      {data === undefined || data.length === 0 ? (
        <div className="no-orders">You have no orders yet.</div>
      ) : null}
    </div>
  );
};

export default OrdersUserPage;
