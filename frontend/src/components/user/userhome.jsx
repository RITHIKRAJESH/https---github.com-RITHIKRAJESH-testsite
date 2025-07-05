import React, { useEffect, useState } from 'react';
import AXIOS from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Container, Row } from 'react-bootstrap';
import Navbaruser from './userNavbar';


export default function Userhome() {
  const [product, setProduct] = useState([]);
  
  const userId = "12345678";
  const token=localStorage.getItem('token')

  useEffect(() => {
    AXIOS.get('http://localhost:9000/api/user/getProducts',{headers:{token:token}})
      .then((res) => {
        console.log(res.data.msg)
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addtoCart = (productId) => {
    AXIOS.post(
      'http://localhost:9000/api/user/addcart',
      { productId, Quantity: 1 },
      { headers: { userId: userId } }
    )
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <style>{`
        .product-container {
          margin-top: 40px;
        }

        .product-card {
          width: 100%;
          max-width: 280px;
          margin: 10px auto;
          border: none;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .product-image {
          height: 200px;
          object-fit: cover;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        .card-text {
          font-size: 0.95rem;
          color: #666;
        }

        .add-button {
          width: 100%;
          background: #4f46e5;
          border: none;
          transition: background 0.3s ease;
        }

        .add-button:hover {
          background: #4338ca;
        }

        @media (min-width: 768px) {
          .product-col {
            display: flex;
            justify-content: center;
          }
        }
      `}</style>

      <Navbaruser />
      <Container className="product-container">
        <Row>
          {product.map((item) => (
            <Col key={item._id} xs={12} sm={6} md={4} lg={3} className="product-col">
              <Card className="product-card">
                <Card.Img
                  variant="top"
                  src={`http://localhost:9000/uploads/${item.Image}`}
                  className="product-image"
                />
                <Card.Body>
                  <Card.Title>{item.productName}</Card.Title>
                  <Card.Title>₹ {item.productPrice}</Card.Title>
                  <Card.Text>{item.productDescription}</Card.Text>
                  <Button className="add-button" onClick={() => addtoCart(item._id)}>
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
