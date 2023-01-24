import { useRef, useState } from "react"
import { Form, Row, Col, Card, Container, Button } from "react-bootstrap/"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)

      await login(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError("Failed to sign in")
    }
    navigate("/surveys")
  }

  return (
    <section className="vh-100 bg-darkskyblue p-5">
      <Row className="d-flex justify-content-center align-items-center">
        <Card className="p-3" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert severity="error">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </section>
  )
}

export default Login
