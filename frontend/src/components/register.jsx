import React, { useState } from 'react'
import AXIOS from 'axios'
export default function Registerpage() {
    const [record,setRecord]=useState({
        username:"",
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setRecord({...record,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        // console.log(record)
        AXIOS.post("http://localhost:9000/api/user/registeruser",record)
        .then((res)=>{
            console.log(res.data)
            alert("User resgistered successfully")  
        }).catch((err)=>{
            console.log(err)
            alert("User registration failed")
        })
    }


  return (
  <>
  <h1>Registration Page</h1>
  <form onSubmit={handleSubmit}>
    <p><input type="text" name="username" placeholder='Enter user name' onChange={handleChange} /></p>
    <p><input type="email" name='email' placeholder='Enter the emailid' onChange={handleChange} /></p>
    <p><input type="password" name="password" placeholder='Enter the password' onChange={handleChange} /></p>
    <p><input type="submit" value={"Register"} /></p>
  </form>
  </>
  )
}
