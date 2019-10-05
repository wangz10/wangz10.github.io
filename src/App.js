import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Navbar,
  Jumbotron,
  Button
} from 'react-bootstrap'
import Scrollspy from 'react-scrollspy'

import logo from './logo.svg'
import './App.css'

// individual sections
import About from './about'

const rootElem = document.getElementById('root')

// navbar with scrollspy
const navbar = (
  <Navbar fixed="top" bg="primary" variant="dark">
    <Navbar.Brand href="#">Zichen Wang, PhD</Navbar.Brand>
    <Scrollspy
      items={['section-1', 'section-2', 'section-3', 'section-4', 'section-5']}
      offset={-56}
      currentClassName="nav-item active"
      className="navbar-nav"
    >
      <li className="nav-item active">
        <a className="nav-link" href="#section-1">
          About
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#section-2">
          Resume
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#section-3">
          Projects
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#section-4">
          Publications
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#section-5">
          Misc.
        </a>
      </li>
    </Scrollspy>
  </Navbar>
)

function App () {
  return (
    <div>
      {navbar}
      <About />
      <Container fluid={true}>
        <Row id="section-1" className="justify-content-md-center">
          <Col md={10}>Sec 1</Col>
        </Row>
        <Row id="section-2" className="justify-content-md-center">
          <Col md={10}>Sec 2</Col>
        </Row>
        <Row id="section-3" className="justify-content-md-center">
          <Col md={10}>Sec 3</Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
