import React, { useState, useEffect } from 'react';
import Navbaruser from './userNavbar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function Orderpage() {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const token = jwtDecode(localStorage.getItem('token'));
    axios
      .get('http://localhost:9000/api/user/vieworders', {
        headers: {
          id: token.id,
        },
      })
      .then((res) => {
        setOrder(Array.isArray(res.data) ? res.data : [res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
console.log(order)
  return (
    <>
      <Navbaruser />
      <div style={{ padding: '20px' }}>
        <h1>Orders</h1>
        {order.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          order.map((ord) => (
            <div key={ord._id} style={{ border: '1px solid #ccc', borderRadius: '10px', marginBottom: '20px', padding: '15px' }}>
              <h3>Order ID: {ord._id}</h3>
              <p><strong>Address:</strong> {ord.address}</p>
              <p><strong>Payment:</strong> {ord.payment}</p>
              <p><strong>Status:</strong> {ord.status}</p>
              <p><strong>Total Amount:</strong> ₹{ord.totalAmount}</p>
              <h4>Products:</h4>
              {ord.cartId.product.map((prod) => (
                <div key={prod._id} style={{ marginBottom: '10px', paddingLeft: '15px' }}>
                  <p><strong>Product Name:</strong> {prod.productId.productName}</p>
                  <p><strong>Description:</strong> {prod.productId.productDescription}</p>
                  <p><strong>Price:</strong> ₹{prod.productId.productPrice}</p>
                  <p><strong>Quantity:</strong> {prod.quantity}</p>
                  <img
                    src={`http://localhost:9000/uploads/${prod.productId.Image}`}
                    alt={prod.productId.productName}
                    width="100"
                  />
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
}
