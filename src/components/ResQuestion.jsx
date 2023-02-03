import React from "react"
import { Container, Row, Col, FloatingLabel, Form } from "react-bootstrap"
import Rating from "./Rating"

// For Survey Questions - displays response type on the survey form
function ResQuestion(q) {
  return (
    <>
      <Form.Group className="mb-3" controlId={`question${q.idx}`}>
        <Form.Label>
          <Col>
            <h4> {q.title}</h4>
          </Col>{" "}
        </Form.Label>

        <Row className="align-self-start">{q.options && <Rating {...q} />}</Row>
        {q.type === "short" && (
          <>
            <Form.Control
              fullWidth
              controlId={`question${q.idx}-short response`}
              placeholder="Enter short response here"
            />
          </>
        )}
        {q.type === "long" && (
          <>
            <FloatingLabel
              controlId="textarea"
              label="Comments"
              className="ms-3">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </>
        )}
      </Form.Group>
    </>
  )
}

export default ResQuestion
