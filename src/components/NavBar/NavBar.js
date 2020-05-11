import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <div className="navigation-style">
      <Navbar bg="light" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link className="instruction-margin" href="/instruction">
              Instruction
            </Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="header">
        <h2 className="laradock-h2">
          LARADOCK <span>Generator</span>
        </h2>
        <p className="p-text-style">
          Quickly generate{" "}
          <span className="generator-underline"> Laradock </span>
        </p>
        <p>setup files for your project</p>
      </div>
    </div>
  );
};

export default NavBar;
