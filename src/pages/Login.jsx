// Import Modules
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import Pages
import Stocks from "../pages/Stocks.jsx";

const API_URL = "http://131.181.190.87:3000"

export default function Login() {
  const[response, setResponse]= useState(null)

  // Get user responce from form.
  function submit(email, password){
    if ( email === '' && password === ''){
      setResponse('Enter your details to login')
    }
    else if ( email === '' && password !== ''){
      setResponse('Enter your email')
    }
    else if ( email !== '' && password === ''){
      setResponse('Enter your password')
    }
    else{
      setResponse(null)
      loginUser(email, password)
    }
  }

  function loginUser(email,password)
  {
    const url = `${API_URL}/user/login`

    fetch(url, {
      method: "POST",
      headers: { accept: "application/json", "Content-Type": "application/json"},
      body: JSON.stringify({email: email, password: password})
    })

    .then((res) => {
        if (!res.ok && res.status === 401){
            setResponse("Your email or password is incorrect. Make sure your details are correct and your account actually exists and try again.")
        }
        else {
            login(email,password)
            }
    })
  }    

  function login(email,password)
  {
    const url = `${API_URL}/user/login`
    fetch(url, {
        method: "POST",
        headers: { accept: "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({email: email, password: password})
      })
        .then((res) => res.json())
        .then((res) => {
        localStorage.setItem("token", res.token)
        window.location.href = '/Stocks'

    })
  }
    
  return (
      <section className="user">
      <div className="form__container">
        <Container className="user__content">
          <h2>Login</h2>
          <Router>
            <Switch>
                <Route exact path="/Stocks">
                    <Stocks/>
                </Route>
            </Switch>
        </Router>
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
            <Button>Submit</Button>
            <h5>Don't have an account?</h5> 
            <h6>Register <Link to="/Register">here</Link> to access exclusive features.</h6>
          </Form>
        </Container>
      </div>
    </section>
  );
}

