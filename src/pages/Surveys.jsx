import React, { useState, useEffect } from "react"
import {
  Container,
  ListGroup,
  OverlayTrigger,
  Tooltip,
  Row,
  Col,
  Button,
} from "react-bootstrap"
import Search from "../components/Search"
import { useAuth } from "../context/AuthContext"
import SurveyData from "../data/surveys.data"
import { Link } from "react-router-dom"
import { BiLinkExternal, BiTrash, BiEdit } from "react-icons/bi"
function Surveys() {
  const [inputValue, setInputValue] = useState("")
  const [surveys, setSurveys] = useState([])
  const { currentUser } = useAuth()
  const uid = currentUser.uid

  async function deleteSurvey(id) {
    // Remove from database
    try {
      const newSurvey = await SurveyData.deleteSurvey(id)
    } catch (e) {
      console.log("Error removing survey", e)
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
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={`tooltip-edit`}>Edit Survey</Tooltip>
                    }>
                    <Link to={`/survey/${survey.id}`}>
                      <BiEdit className="surveyitem-icon"></BiEdit>
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={`tooltip-openURL`}>
                        Open Survey in Browser
                      </Tooltip>
                    }>
                    <Link to={`/feedback/${survey.id}`}>
                      <BiLinkExternal
                        alt="open survey in browser"
                        className="surveyitem-icon"
                      />
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={`tooltip-delete`}>Delete Survey</Tooltip>
                    }>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteSurvey(survey.id)}>
                      <BiTrash
                        className="surveyitem-icon"
                        style={{ height: "20px", width: "20px" }}
                      />
                    </Button>
                  </OverlayTrigger>
                </Col>
              </Row>
              <Row>
                <Col>{survey.desc} </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  )
}

export default Surveys
