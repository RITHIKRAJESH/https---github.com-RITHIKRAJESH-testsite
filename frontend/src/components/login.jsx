import React, { useState } from 'react'
import AXIOS from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Loginpage() {

    const [record,setRecord]=useState({
        username:"",
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setRecord({...record,[e.target.name]:e.target.value})
    }
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        // console.log(record)
        AXIOS.post("http://localhost:9000/api/user/userlogin",record)
        .then((res)=>{
           alert(res.data.msg)
           if(res.data.status == 200){
            localStorage.setItem("token",res.data.token)
            navigate("/userhome")
           }
        }).catch((err)=>{
            console.log(err)
            alert("User Login failed")
        })
    }

  return (
    <>
    <h1>Login Page</h1>
  <form onSubmit={handleSubmit}>
    <p><input type="email" name='email' placeholder='Enter the emailid' onChange={handleChange} /></p>
    <p><input type="password" name="password" placeholder='Enter the password' onChange={handleChange} /></p>
    <p><input type="submit" value={"Login"} /></p>
    <a href="/register">Register here?</a>
  </form>
    </>
  )
}
