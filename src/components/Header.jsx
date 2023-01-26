import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { Nav, Button, Container, Navbar } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import formicon from "../assets/mono-kdb-form.svg"

function Header({ isLoggedIn }) {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  async function handleLogout() {
    try {
      await logout()
    } catch {
      console.log("failed to sign out")
    }
    navigate("/login")
  }
  return (
    <Navbar bg="almond" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          {" "}
          <img src={formicon} alt="form" className="header-icon" />
          Survey Creator
        </Navbar.Brand>
        {isLoggedIn && currentUser ? (
          <Nav className="justify-content-end">
            <Nav.Link as={Link} to="/surveys">
              Surveys
            </Nav.Link>{" "}
            <Nav.Link as={Link} to="/templates">
              Templates
            </Nav.Link>{" "}
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav className="justify-content-end">
            <Button
              onClick={() => {
                navigate("/login")
              }}>
              Login
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
}

export default Header
