import React, { useState } from "react"
import { Form, Button, Stack, Row, Col } from "react-bootstrap"
import Question from "./Question"
import { useNavigate } from "react-router-dom"
import { useAuth, AuthContext } from "../context/AuthContext"
import { addDoc, Timestamp, collection } from "firebase/firestore"
import db from "../firebase.config.js"
import "firebase/firestore"
import SurveyData from "../data/surveys.data"

function EditorForm({
  survey,
  questions,
  handleAdd,
  handleInfoChange,
  updateQuestion,
  updateQuestionOptions,
  handleDelete,
  addSurvey,
}) {
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})

  // Validates fields before calling addSurvey
  const handleSubmit = async (e) => {
    e.preventDefault()
    const allErrors = {}
    // validation
    if (survey.title === "") {
      allErrors.title = "Please enter a title"
    }
    // checks for undefined, not all templates have descriptions
    if (survey.desc === "" || typeof survey.desc === "undefined") {
      allErrors.desc = "Please enter a description"
    }

    console.log(survey)
    const isEmpty = Object.keys(allErrors).length === 0
    if (!isEmpty) {
      setErrors(allErrors)
      setValidated(false)
    } else {
      setValidated(true)
      addSurvey()
    }
  }

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
            isInvalid={!!errors.title}
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
            isInvalid={!!errors.desc}
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
                handleDelete={handleDelete}></Question>
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
