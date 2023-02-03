import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import SurveysData from "../data/surveys.data"
import ResQuestion from "../components/ResQuestion"
import { Container, Row, Form, Button, Col } from "react-bootstrap"
function Survey() {
  const { id } = useParams()
  const [questions, setQuestions] = useState([])
  const [survey, setSurvey] = useState([])

  async function getSurvey() {
    try {
      const infoPromise = SurveysData.getSurvey(id).then((docSnap) =>
        setSurvey({ title: docSnap.data().title, desc: docSnap.data().desc })
      )
      const qPromise = SurveysData.getSurveyQuestions(id).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          setQuestions(newData)
        }
      )
      const [info, q] = await Promise.all([infoPromise, qPromise])
    } catch (e) {
      console.log("Error loading survey:", e)
    }
  }

  useEffect(() => {
    getSurvey()
  }, [id])
  return (
    <Container fluid className="vh-100 bg-offwhite">
      <Row className="text-center bg-space text-white vw-100 shadow p-4">
        <h2 className="p-4">{survey.title}</h2>
        <span>{survey.desc}</span>
      </Row>{" "}
      <Container fluid="md">
        <Form>
          {questions.map((q, idx) => (
            <Row key={q.id} className="m-3">
              <ResQuestion idx={idx + 1} {...q}></ResQuestion>
            </Row>
          ))}{" "}
          <Row className="">
            <Col>
              <Button
                variant="primary"
                type="submit"
                className="float-end m-3 shadow hover-underline-animation">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  )
}

export default Survey
