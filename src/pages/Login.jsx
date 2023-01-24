import { useRef, useState } from "react"
import { Form, Row, Col, Card, Container } from "react-bootstrap/"
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
    setLoading(false)
    navigate("/templates")
  }

  return (
    <section className="vh-100 bg-darkskyblue p-5">
      <Row className="d-flex justify-content-center align-items-center">
        <Card className="p-3" style={{ maxWidth: "400px" }}>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center mb-3 pb-1">
              <h1>Survey Creator</h1>
            </div>

            <h5 className="fw-normal " style={{ letterSpacing: "1px" }}>
              Sign into your account
            </h5>

            <div className="form-outline mb-4">
              <Form.Group controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </div>

            <div className="form-outline mb-4">
              <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
            </div>

            <div className="pt-1 mb-4">
              <button className="btn btn-dark btn-lg btn-block" type="submit">
                Login
              </button>
            </div>
          </Form>
        </Card>
      </Row>
    </section>
  )
}

export default Login
