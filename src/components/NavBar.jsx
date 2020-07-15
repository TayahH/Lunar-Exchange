// Import Modules
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"))
  
  // Check login status
  function checkStatus(){
    if (token === null){
      return(
        <div>
          <NavItem>
            <Link to="/Login">Login</Link> 
          </NavItem>
          <NavItem>
            <Link to="/Register">Register</Link>
          </NavItem>
        </div>
      )}
    else{
      return(
        <div>
          <NavItem>
            <Link to="/" onClick={() => {logout()}}>Logout</Link>
          </NavItem>
        </div>
      )
    }
  }

  // Logout User
  function logout(){
    localStorage.removeItem("token"); 
    setToken(localStorage.getItem("token")); 
    window.location.reload()
  }
  
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Nav>
      <Navbar color="light" light expand='sm' fixed="top">
      <Nav>
        <img src="img/logo.png" width="40px" height="40px" alt=""/>
        <NavbarBrand href="/"><h3>Lunar Exchange</h3></NavbarBrand>
      </Nav>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/Stocks">Stocks</Link>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            {checkStatus()}
          </Nav>
        </Collapse>
      </Navbar>
    </Nav>
  );
}


export default NavBar;
