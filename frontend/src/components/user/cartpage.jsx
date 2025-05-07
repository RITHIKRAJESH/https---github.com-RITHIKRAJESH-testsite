import React, { useState } from 'react'
import Navbaruser from './userNavbar'
import { useEffect } from 'react'
import AXIOS from 'axios'
import {jwtDecode} from 'jwt-decode'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
export default function Cartpage() {
  
  const [cart,setCart]=useState([])
  const [payment,setPayment]=useState("")
  const [address,setAddress]=useState("")
  const [cartId,setCartId]=useState("")

  useEffect(()=>{
     const token=jwtDecode(localStorage.getItem('token'))
     console.log(token)
     AXIOS.get("http://localhost:9000/api/user/viewcartbyid",{headers:{
      id:token.id
     }}).then((res)=>{
      // console.log(res.data)
      setCart(res.data.product)
      setCartId(res.data._id)
     }).catch((err)=>{
      console.log(err)
     })
  },[])
  console.log("cart",cart)
  console.log(cartId)
  const totalAmount = cart.reduce((sum,item)=>{
    return sum + item.quantity *item.productId.productPrice},0)

    const token=jwtDecode(localStorage.getItem('token'))
    const handleSubmit=(e)=>{
      e.preventDefault()
      console.log(address,payment)
      AXIOS.post("http://localhost:9000/api/user/addorder",{
        cartId,
        address,
        payment,
        totalAmount
      },
    {headers:{
      userId:token.id
    }}).then((res)=>{
      alert(res.data.message)
    }).catch((err)=>{
      console.log(err)
    })
    }

  return (
 <>
 <Navbaruser/>
 <h1>Cart Page</h1>
 {
  cart.length >0 ?( <> <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Product</th>
      <th>Product Name</th>
      <th>Quantity</th>
      <th>Totalprice</th>
    </tr>
  </thead>
  <tbody>
    {cart.map((items,index)=>{
      return(
        <tr key={items._id}>
          <td>{index+1}</td>
          <td><img src={`http://localhost:9000/uploads/${items.productId.Image}`} alt="" style={{height:"100px",width:"100px"}} /></td>
          <td>{items.productId.productName}</td>
          <td>{items.quantity}</td>
          <td>{items.quantity * items.productId.productPrice}</td>
        </tr>
      )
    })}
  </tbody>
</Table>

<h2>TotalAmount : Rs.{totalAmount}</h2>

<Form onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Enter Delivery address</Form.Label>
    <Form.Control as="textarea" rows={3} name="deliveryaddress" onChange={(e)=>setAddress(e.target.value)} />
  </Form.Group>
  <Form.Check
        inline
        label="COD"
        name="payment"
        type='radio'
        value={"COD"}
        onChange={(e)=>setPayment(e.target.value)}
      />
      <Form.Check
        inline
        label="Online Payment"
        name="payment"
         type='radio'
         value={"Online paymenmt"}
         onChange={(e)=>setPayment(e.target.value)}
      />

  <Button variant="primary" type='submit'>
  Place Order
  </Button>
</Form></>):(
<h1>Your cart is empty</h1>
 )}
 </>
  )
}
