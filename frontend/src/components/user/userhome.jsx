import React, { useEffect, useState } from 'react'
import AXIOS from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col, Container, Row} from 'react-bootstrap'
import Navbaruser from './userNavbar';
import {jwtDecode} from 'jwt-decode'

export default function Userhome() {
  const [product,setProduct]=useState([])
  const token=localStorage.getItem('token')
  // console.log(jwtDecode(token))
  const decode=jwtDecode(token)
  const userId=decode.id
  useEffect(()=>{
    AXIOS.get('http://localhost:9000/api/user/getProducts')
    .then((res)=>{
      console.log(res.data)
      setProduct(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const addtoCart=(productId)=>{
    // console.log(productId)
    // console.log(userId)
    AXIOS.post("http://localhost:9000/api/user/addcart",{productId,Quantity:1},
    {
      headers:{
        userId:userId
      }
    }
    ).then((res)=>{
      alert(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
   <>
   <Navbaruser/>
    <Container>
     <Row>
     {
      product.map((item)=>{
        return(
          <Col>
          <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`http://localhost:9000/uploads/${item.Image}`}  style={{height:"200px"}} />
      <Card.Body>
        <Card.Title>{item.productName}</Card.Title>
        <Card.Title>{item.productPrice}</Card.Title>
        <Card.Text>
       {item.productDescription}
        </Card.Text>
        <Button variant="primary" onClick={()=>addtoCart(item._id)}>Add to Cart</Button>
      </Card.Body>
    </Card>
          </Col>
        )
      })
    }
     </Row>
    </Container>
   </>
  )
}
