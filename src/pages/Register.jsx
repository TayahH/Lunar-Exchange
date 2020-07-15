// Import Modules
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

export default function Register() {
  const[response, setResponse]= useState(null)

  // Get user response from form
  function submit(email, password){
    if ( email === '' && password === ''){
      setResponse('Enter your details to register')
    }
    else if ( email === '' && password !== ''){
      setResponse('Enter your email')
    }
    else if ( email !== '' && password === ''){
      setResponse('Enter a secure password')
    }
    else{
      setResponse(null)
      registerUser(email, password)
    }
  }

  const API_URL = "http://131.181.190.87:3000"

  function registerUser(email, password){
      const url = `${API_URL}/user/register`
  
      return fetch(url, {
        method: "POST",
        headers: { accept: "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({email: email, password: password})
      })

      .then(res => {
        if(!res.ok && res.status === 409){ 
          setResponse('That account already exists, try logging in')}
        else{setResponse('Your account has been created, try logging in')}})
      .then((res) => res.json())
      .then((res) => {
        console.log(res)})
      .catch(e => {console.log("User already exists")}) 
}

  return (
      <section className="user">
        <div className="form__container">
          <Container className="user__content">
            <h2>Register</h2>
            <Form className="form" onSubmit={event => {
                event.preventDefault();
                const email = (event.target.elements.email.value);
                const password = (event.target.elements.password.value);
                submit(email,password)}}
            >
              <Col>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="user@email.com"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="********"
                  />
                </FormGroup>
                {response != null ? <p>{response}</p> : null}
              </Col>
              <Button type="submit">Submit</Button>
              <h5>Already have an account?</h5> 
              <h6>Login <Link to="/login">here</Link> to explore exclusive features.</h6>
            </Form>
          </Container>
        </div>
      </section>
  );
}
