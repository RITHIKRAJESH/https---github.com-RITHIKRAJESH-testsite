import React, { useEffect, useState } from 'react'
import AXIOS from 'axios'
import Navbaradmin from './navbar'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
export default function AdminViewProducts(){
    const [product,setProduct]=useState([])
    useEffect(()=>{
    AXIOS.get('http://localhost:9000/api/admin/viewproducts')
    .then((res)=>{
        console.log(res.data)
        setProduct(res.data)
    }).catch((err)=>{
        console.log(err)
    })
    },[])
   const navigate=useNavigate()
    const editProduct=(id)=>{
      navigate(`/admineditproduct/${id}`)
    }
    return(
        <>
        <Navbaradmin/>
        <h1>Available Products</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Description</th>
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody>
  {product.map((fruits,index)=>{
    return(
  <tr key={fruits._id}>
    <td>{index+1}</td>
      <td><img src={`http://localhost:9000/uploads/${fruits.Image}`} alt="" style={{width:"100px",height:"100"}} /></td>
      <td>{fruits.productName}</td>
     <td>{fruits.productPrice}</td>
     <td>{fruits.productDescription}</td>
      <td><Button variant="danger">Delete</Button></td>
      <td><Button variant="warning" onClick={()=>editProduct(fruits._id)}>Edit</Button></td>
  </tr>
    )
  })}
      </tbody>
    </Table>
        </>
    )
}