import React, { useState } from "react"
import { Form, Button, Stack, Row, Col } from "react-bootstrap"
import Question from "./Question"

function EditorForm({
  survey,
  questions,
  handleAdd,
  handleInfoChange,
  updateQuestion,
  updateQuestionOptions,
  handleDelete,
  handleSubmit,
}) {
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})

  return (
    <div>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title.ControlInput">
          <Form.Label>Survey Title</Form.Label>
          <Form.Control
            type="input"
            name="title"
            value={survey.title}
            onChange={handleInfoChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a title
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="description.ControlInput">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="input"
            name="desc"
            value={survey.desc || ""}
            onChange={handleInfoChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a description
          </Form.Control.Feedback>
        </Form.Group>
        <Stack gap={3}>
          {questions.map((question, i) => (
            <div className="bg-light border p-3" key={question.id}>
              <Question
                question={question}
                qNum={i + 1}
                updateQuestion={updateQuestion}
                updateQuestionOptions={updateQuestionOptions}
                handleDelete={handleDelete}
                errors={errors}></Question>
            </div>
          ))}
        </Stack>
        <Row className="mt-3">
          <Col>
            <Button variant="silverpink" size="lg" onClick={handleAdd}>
              + Add Question
            </Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              onSubmit={(e) => handleSubmit(e)}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default EditorForm
