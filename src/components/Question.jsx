import { Form, Row, Col, Button, Image } from "react-bootstrap/"
import deleteIcon from "../assets/trashcan.png"
export default function Question({
  question,
  qNum,
  updateQuestion,
  updateQuestionOptions,
  handleDelete,
}) {
  function handleQuestion(e) {
    updateQuestion(question.id, e.target.name, e.target.value)
  }

  return (
    <>
      <Form.Group className="mb-3" controlId={`question` + qNum}>
        <Row className="mb-3" xs={2}>
          <Col md={4}>
            <Form.Label className="h4 text-darkblue mt-2">
              Question {qNum}
            </Form.Label>
          </Col>
          <Col
            md={{ span: 4, offset: 4 }}
            className="d-flex justify-content-end">
            {" "}
            <Button variant="light" onClick={(e) => handleDelete(question.id)}>
              <Image
                src={deleteIcon}
                alt="delete"
                style={{ height: "1.5em", width: "1.5em" }}
              />
            </Button>
          </Col>
        </Row>
        <Form.Control
          type="input"
          value={question.title}
          name="title"
          onChange={(e) => handleQuestion(e)}
          required
        />
      </Form.Group>
      <Form.Group controlId="type-dropdown">
        <Form.Label className="text-darkblue ms-1 ">Response Type</Form.Label>
        <Form.Select
          value={question.type}
          aria-label="Response Type Drop Down"
          name="type"
          onChange={(e) => handleQuestion(e)}
          required>
          <option value="rating">Rating</option>
          <option value="short">Short Text</option>
          <option value="long">Long Text Area</option>
        </Form.Select>
      </Form.Group>
    </>
  )
}
