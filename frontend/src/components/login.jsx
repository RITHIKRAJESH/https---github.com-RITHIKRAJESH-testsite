import React, { useState } from 'react';
import AXIOS from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [record, setRecord] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    AXIOS.post(`http://localhost:9000/api/user/userlogin`, record)
      .then((res) => {
        alert(res.data.msg);
        if (res.data.status === 200){
          localStorage.setItem("token",res.data.token)
          navigate('/userhome');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('User Login failed');
      });
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(to right, #6a11cb, #2575fc);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .login-container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }
        .login-container h1 {
          text-align: center;
          color: #4f46e5;
          margin-bottom: 24px;
        }
        .login-container input[type="email"],
        .login-container input[type="password"] {
          width: 100%;
          padding: 10px 14px;
          margin-bottom: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
        }
        .login-container input[type="submit"] {
          width: 100%;
          padding: 12px;
          background-color: #4f46e5;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .login-container input[type="submit"]:hover {
          background-color: #4338ca;
        }
        .login-container a {
          display: block;
          text-align: center;
          margin-top: 16px;
          color: #4f46e5;
          text-decoration: none;
        }
        .login-container a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter the email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter the password"
            onChange={handleChange}
            required
          />
          <input type="submit" value="Login" />
          <a href="/register">Register here?</a>
        </form>
      </div>
    </>
  );
}
