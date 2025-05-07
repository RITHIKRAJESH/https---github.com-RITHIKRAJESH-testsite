import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import AXIOS from 'axios'
import { useParams } from 'react-router-dom';

export default function Admineditproduct() {
    const params=useParams()
    console.log("productid:",params.id)
    const [product,setProduct]=useState({})
    useEffect(()=>{
        AXIOS.get('http://localhost:9000/api/admin/editproduct',{headers:{id:params.id}})
        .then((res)=>{
            console.log(res.data)
            setProduct(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const [Image,setImage]=useState(null)
    
        const handleChange =(e)=>{
             setProduct({...product,[e.target.name]:e.target.value})
        }
    
        const handleImage=(e)=>{
            setImage(e.target.files[0])
        }
        const handleSubmit=(e)=>{
            e.preventDefault()
            const formdata =new FormData()
            formdata.append("productName",product.productName)
            formdata.append("productPrice",product.productPrice)
            formdata.append("productDescription",product.productDescription)
            formdata.append("productQuantity",product.productQuantity)
            if(Image){
                formdata.append("Image",Image)
            }
            AXIOS.put(`http://localhost:9000/api/admin/updateproduct/${params.id}`,formdata,{
                headers:{
                    "Content-Type":"multipart/formdata"
                }
            }).then((res)=>{
                alert(res.data.message)
            }).catch((err)=>{
                console.log(err)
            })
        }
  return (
   <>
   <h1>Edit Product</h1>
    <Form noValidate onSubmit={handleSubmit}>
             <Row className="mb-3">
               <Form.Group
                 as={Col}
                 md="4"
                 controlId="validationFormik101"
                 className="position-relative"
               >
                 <Form.Label>Product name</Form.Label>
                 <Form.Control
                   type="text"
                   name="productName"
                   value={product.productName}
                   onChange={handleChange}
                 />
                 <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
               </Form.Group>
               <Form.Group
                 as={Col}
                 md="4"
                 controlId="validationFormik102"
                 className="position-relative"
               >
                 <Form.Label>Price</Form.Label>
                 <Form.Control
                   type="text"
                   name="productPrice"
                   value={product.productPrice}
                   onChange={handleChange}
                 />
   
                 <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
               </Form.Group>
               
             </Row>
             <Row className="mb-3">
               <Form.Group
                 as={Col}
                 md="6"
                 controlId="validationFormik103"
                 className="position-relative"
               >
                 <Form.Label>Description</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="productDescription"
                   name="productDescription"
                   value={product.productDescription}
                   onChange={handleChange}
                 />
   
                 {/* <Form.Control.Feedback type="invalid" tooltip>
                   {errors.city}
                 </Form.Control.Feedback> */}
               </Form.Group>
   
               <Form.Group
                 as={Col}
                 md="4"
                 controlId="validationFormik105"
                 className="position-relative"
               >
                 <Form.Label>Quantity</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="productQuantity"
                   name="productQuantity"
                   value={product.productQuantity}
                   onChange={handleChange}
                 />
   
                 {/* <Form.Control.Feedback type="invalid" tooltip>
                   {errors.zip}
                 </Form.Control.Feedback> */}
               </Form.Group>
             </Row>
             <Form.Group className="position-relative mb-3">
               <Form.Label>File</Form.Label>
               <Form.Control
                 type="file"
                 required
                 name="Image"
                 onChange={handleImage}
               />
               {/* <Form.Control.Feedback type="invalid" tooltip>
                 {errors.file}
               </Form.Control.Feedback> */}
             </Form.Group>
            
             <Button type="submit">Submit form</Button>
           </Form>
   </>
  )
}
