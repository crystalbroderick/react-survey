import React, { useState } from "react";
import { Form, Button, Stack, Row, Col } from "react-bootstrap";
import Question from "./Question";
function EditorForm({
  survey,
  questions,
  handleAdd,
  handleInfoChange,
  updateQuestion,
  updateQuestionOptions,
  handleDelete,
}) {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const checkValidated = () => {
    const allErrors = {};
    if (survey.title === "") {
      allErrors.title = "Please enter a title";
    }
    if (survey.desc === "" || typeof survey.desc === "undefined") {
      allErrors.desc = "Please enter a description";
    }

    const isEmpty = Object.keys(allErrors).length === 0;
    if (!isEmpty) {
      setErrors(allErrors);
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkValidated();
    if (validated) {
      console.log("validated!");
    }
  };

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
                handleDelete={handleDelete}
              ></Question>
            </div>
          ))}
        </Stack>
        <Row>
          <Col>
            <Button variant="darkskyblue" className="mt-3" onClick={handleAdd}>
              Add Question
            </Button>
          </Col>
          <Col className="d-flex justify-content-end mt-3">
            <Button
              variant="honey"
              type="submit"
              onSubmit={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditorForm;
