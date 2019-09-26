import React from 'react';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';

import DanceFloorController from './components/DanceFloorController';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/dist/cyborg/bootstrap.css';
import 'typeface-major-mono-display';
import 'typeface-vt323';
import './App.css';
import CONFIG from './config';


function App() {
  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">DDF-GW1</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Form inline>
          <Button variant="outline-success">Reload</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    <Container>
      <DanceFloorController />
    </Container>
    </>
  );
}

export default App;

// For convenience of browser debugging, export our config into `window`.
window.DDF_CONFIG = CONFIG;