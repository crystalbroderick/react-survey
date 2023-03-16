import React from "react"
import { Container, Row, Col, FloatingLabel, Form } from "react-bootstrap"
import ResRating from "./ResRating"

// For Survey Questions - displays response type on the survey form
export default function ResQuestion({
  id,
  title,
  type,
  options,
  responseAnswer,
  answer,
}) {
  const displayResType = () => {
    switch (type) {
      case "long":
        return (
          <>
            <FloatingLabel
              controlid="textarea"
              label="Comments"
              className="ms-3">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={(e) => responseAnswer(id, e.target.value)}
              />
            </FloatingLabel>
          </>
        )
      case "short":
        return (
          <>
            <Form.Control
              as="input"
              controlid={`question${id}-short response`}
              placeholder="Enter short response here "
              onChange={(e) => responseAnswer(id, e.target.value)}
            />
          </>
        )
      case "rating":
        return (
          <>
            <ResRating
              qid={id}
              options={options}
              responseAnswer={responseAnswer}
              answer={answer ? answer : null}
            />
          </>
        )
    }
  }
  return (
    <Row className="m-3">
      <Form.Group className="mb-3" controlId={`question${id}`}>
        <Form.Label>
          <Col>
            <h4>{title}</h4>
          </Col>{" "}
        </Form.Label>
        <Row className="align-self-start">{displayResType()}</Row>
      </Form.Group>
    </Row>
  )
}
