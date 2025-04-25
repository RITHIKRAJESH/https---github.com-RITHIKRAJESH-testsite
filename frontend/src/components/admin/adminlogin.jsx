import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [admin,setAdmin]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setAdmin({...admin,[e.target.name]:e.target.value})
    }
    
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(admin.email == "admin@gmail.com" && admin.password == "admin@123"){
            alert("login successfull")
            navigate("/adminhome")
        }else{
            alert("Invalid credentials")
        }
    }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AdminLogin;