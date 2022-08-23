import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap'

const Header = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Employee Management</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/addemployee">Add Employee</Nav.Link>
            <Nav.Link href="/addproject">Add Project</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
