import React, { useEffect, useState } from 'react'
import Navbaradmin from './navbar'
import AXIOS from 'axios'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
export default function Adminviewuser() {
    const [user,setUser]=useState([])
    useEffect(()=>{
     AXIOS.get("http://localhost:9000/api/admin/adminviewusers")
     .then((res)=>{
        console.log(res.data)
        setUser(res.data)
     }).catch((err)=>{
        console.log(err)
     })
    },[])

    const deleteUser=(id)=>{
console.log("userId",id)
AXIOS.delete("http://localhost:9000/api/admin/userdelete",{headers:{userid:id}})
.then((res)=>{
    alert(res.data)
}).catch((err)=>{
    alert(err)
})
    }
  return (
   <>
   <Navbaradmin/>
   <h1>Users</h1>
   <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {user.map((customer,index)=>{
        return (
            <tr key={customer._id}>
            <td>{index+1}</td>
            <td>{customer.Username}</td>
            <td>{customer.Email}</td>
            <td><Button variant="danger" onClick={()=>deleteUser(customer._id)}>Delete</Button></td>
          </tr>
        )
      })}
      </tbody>
    </Table>
   </>
  )
}
