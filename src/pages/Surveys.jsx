import React, { useState, useEffect } from "react"
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap"
import Search from "../components/Search"
import { useAuth } from "../context/AuthContext"
import SurveyData from "../data/surveys.data"
import EditorForm from "../components/EditorForm"
import { Link } from "react-router-dom"

function Surveys() {
  const [inputValue, setInputValue] = useState("")
  const [surveys, setSurveys] = useState([])
  const { currentUser } = useAuth()
  const uid = currentUser.uid

  async function deleteSurvey(id) {
    // Remove from database
    try {
      const newSurvey = await SurveyData.deleteSurvey(id)
    } catch {
      console.log("Error removing survey")
    }
    // Remove from survey list
    const newSurveyList = surveys.filter((item) => item.id !== id)
    setSurveys(newSurveyList)
  }

  useEffect(() => {
    const getSurveys = async () => {
      const data = await SurveyData.getUserSurveys(uid)
      setSurveys(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getSurveys()
  }, [uid])
  return (
    <Container className="p-3">
      <h1 className="page-title">Surveys</h1>
      <Search
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
      />
      <ListGroup className="p-2 ">
        {surveys
          ?.filter((elem) =>
            elem.title.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((survey) => (
            <ListGroup.Item
              key={survey.id}
              bg="neutral"
              className="p-3 shadow p-3 mb-5 rounded h-7">
              <Row>
                <Col>
                  <div className="fw-bold">{survey.title}</div>
                </Col>
                <Col md="auto">
                  Created: {survey.created.toDate().toDateString()}
                </Col>
                <Col
                  xs
                  lg="2"
                  className="d-flex justify-content-between align-items-end">
                  <Link
                    className="btn btn-helliogray text-white shadow-sm button-card"
                    to={`/survey/${survey.id}`}>
                    Edit
                  </Link>

                  <Button
                    variant="danger"
                    onClick={() => deleteSurvey(survey.id)}>
                    Delete
                  </Button>
                </Col>
              </Row>
              {survey.desc}{" "}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  )
}

export default Surveys
