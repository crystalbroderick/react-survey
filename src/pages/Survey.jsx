import React, { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import SurveysData from "../data/surveys.data"
import ResQuestion from "../components/ResQuestion"
import { Container, Row, Form, Button, Col, Alert } from "react-bootstrap"

function Survey() {
  const { id } = useParams()
  const [questions, setQuestions] = useState([])
  const [survey, setSurvey] = useState([])
  const [error, setError] = useState("")
  const [totalQuestions, setTotalQuestions] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
          setTotalQuestions(newData.length)
          setLoading(false)
        }
      )
      const [info, q] = await Promise.all([infoPromise, qPromise])
    } catch (e) {
      console.log("Error loading survey:", e)
    }
  }

  //Verify all option questions are answered
  function getAnswerCount() {
    let counter = 0
    for (const obj of questions) {
      if (typeof obj["answer"] !== "undefined") {
        counter += 1
      }
    }
    return counter
  }

  const responseAnswer = (idx, ans) => {
    const item = questions.find((x) => x.id === idx)
    const updatedItem = { ...item, answer: ans }
    const newQuestionAnswer = [...questions]
    newQuestionAnswer.splice(questions.indexOf(item), 1, updatedItem)
    setQuestions(newQuestionAnswer)
  }

  // Add response to database
  async function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    const answerCount = getAnswerCount()

    if (totalQuestions === answerCount) {
      try {
        setError("")
        await Promise.all(
          questions.map(async (doc) => {
            //const questionsRef = collection(db, "surveys", doc.id, "questions")
            const resAns = { response: doc.answer }
            const responses = SurveysData.addResponse(id, doc.id, resAns)
            console.log("form submitted!")
          })
        )
        navigate("/submitted")
      } catch (e) {
        console.log("error submitting survey responses,", e)
      }
    } else {
      setError("Please answer all questions!")
    }
  }

  useEffect(() => {
    getSurvey()
  }, [id])
  return (
    <>
      {!loading && (
        <Container fluid className="vh-100 bg-offwhite">
          <Row className="text-center bg-space text-white vw-100 shadow p-4">
            <h2 className="p-4">{survey.title}</h2>
            <span>{survey.desc}</span>
          </Row>
          <Container fluid="md">
            {error && (
              <Alert variant="danger" className="m-3">
                {error}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              {questions.map((q, idx) => (
                <ResQuestion
                  key={q.id}
                  id={q.id}
                  title={q.title}
                  type={q.type}
                  options={q.options ? q.options : null}
                  responseAnswer={responseAnswer}
                  answer={q.answer ? q.answer : null}></ResQuestion>
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
      )}
    </>
  )
}

export default Survey
