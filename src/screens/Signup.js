

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 100px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', location: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch('https://mernappbackend-ur3t.onrender.com/createuser',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:credentials.name,
        email:credentials.email,
        location:credentials.location,
        password:credentials.password
      })
    })
    const json = await resp.json();
    console.log(json);
    if(!json.sucess)  alert('Enter Valid credentials')
    else navigate("/login")
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (<>
    <Container>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit}>
      <Input type="text" placeholder="Name" name='name' value={credentials.name} onChange={onChange}/>
        <Input type="text" placeholder="Email" name='email' value={credentials.email} onChange={onChange}/>
        <Input type="password" placeholder="Password" name='password' value={credentials.password}onChange={onChange}/>
        <Input type="text" placeholder="Location" name='location' value={credentials.location}onChange={onChange}/>
        <Button type="submit">SignUp</Button>
        <Button><Link to='/signup' className='text-white text-decoration-none'><div>New user</div></Link></Button>
      </Form>
    </Container>
    </>
  );
}

