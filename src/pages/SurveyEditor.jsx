import React, { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import EditorForm from "../components/EditorForm"
import SurveyData from "../data/surveys.data"
import { useId } from "react"
import { Container, Alert } from "react-bootstrap"

function SurveyEditor() {
  const { id } = useParams()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [survey, setSurvey] = useState({ title: " ", desc: " " })
  const randomId = useId()
  const [newId, setNewId] = useState(randomId)
  const navigate = useNavigate()
  const [error, setError] = useState("")

  function handleInfoChange(e) {
    const { name, value } = e.target
    setSurvey((curr) => {
      return { ...curr, [name]: value }
    })
  }

  const handleAdd = () => {
    const newQuestion = questions.concat({ id: newId, title: "" })
    setNewId((prev) => prev + 1)
    setQuestions(newQuestion)
  }
  // update question title / type state
  function updateQuestion(id, name, value) {
    const item = questions.find((x) => x.id === id)
    const updatedItem = { ...item, [name]: value }
    const newQuestion = [...questions]
    newQuestion.splice(questions.indexOf(item), 1, updatedItem)
    setQuestions(newQuestion)
  }
  // update question response options.
  const updateQuestionOptions = (id, name, value) => {
    const item = questions.find((x) => x.id === id)
    const updatedItem = {
      ...item,
      options: { ...item.options, [name]: value },
    }
    const newQuestion = [...questions]
    newQuestion.splice(questions.indexOf(item), 1, updatedItem)
    setQuestions(newQuestion)
  }
  // Remove question
  const handleDelete = (id) => {
    const newQuestions = questions.filter((item) => item.id !== id)
    setQuestions(newQuestions)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    //To do: update to database
    navigate("/surveys")
  }

  async function getSurvey() {
    try {
      const getSurveyInfo = SurveyData.getSurvey(id).then((docSnap) =>
        setSurvey({ title: docSnap.data().title, desc: docSnap.data().desc })
      )

      const getQuestions = SurveyData.getSurveyQuestions(id).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))

          setQuestions(newData)
          setLoading(false)
        }
      )
      const [info, q] = await Promise.all([getSurveyInfo, getQuestions])
    } catch (e) {
      setError("Error loading survey")
    }
  }

  useEffect(() => {
    getSurvey()
  }, [id])
  return (
    <Container className="p-3">
      <h1 className="page-title">Survey Editor</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && (
        <EditorForm
          survey={survey}
          questions={questions}
          handleAdd={handleAdd}
          handleInfoChange={handleInfoChange}
          updateQuestion={updateQuestion}
          updateQuestionOptions={updateQuestionOptions}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
        />
      )}
    </Container>
  )
}

export default SurveyEditor
