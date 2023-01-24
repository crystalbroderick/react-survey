import { Form, Row, Col, Button } from "react-bootstrap/";

export default function Question({
  question,
  qNum,
  updateQuestion,
  updateQuestionOptions,
  handleDelete,
}) {
  function handleQuestion(e) {
    updateQuestion(question.id, e.target.name, e.target.value);
  }

  return (
    <>
      <Form.Group className="mb-3" controlId={`question` + qNum}>
        <Row>
          <Col sm={8}>
            <Form.Label className="h4 text-darkblue">
              Question {qNum}
            </Form.Label>
          </Col>
          <Col sm={4} className="d-flex justify-content-end mb-3">
            {" "}
            <Button onClick={(e) => handleDelete(question.id)}>Delete</Button>
          </Col>
        </Row>
        <Form.Control
          type="input"
          value={question.title}
          name="title"
          onChange={(e) => handleQuestion(e)}
        />
      </Form.Group>
      <Form.Group controlId="type-dropdown">
        <Form.Label className="text-darkblue ms-1 ">Response Type</Form.Label>
        <Form.Select
          value={question.type ? question.type : "Select response type"}
          aria-label="Response Type Drop Down"
          name="type"
          onChange={(e) => handleQuestion(e)}
        >
          <option>Response Type</option>
          <option value="rating">Rating</option>
          <option value="short">Short Text</option>
          <option value="long">Long Text Area</option>
        </Form.Select>
      </Form.Group>
    </>
  );
}
