import { useRef, useState } from "react"
import { Alert, Form, Row, Card, Button } from "react-bootstrap/"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [validated, setValidated] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    signIn()
  }

  async function signIn() {
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError("Failed to log in")
      setValidated(false)
    }
    setLoading(false)
  }

  return (
    <div className="vh-100 bg-offwhite  p-5">
      <Row className="d-flex justify-content-center align-items-center">
        <Card className="p-3" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form validated={validated} onSubmit={handleSubmit}>
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

            <div className="w-100 text-center mt-2">
              Need an account? <Link to="/signup">Sign Up</Link>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </div>
  )
}

export default Login
