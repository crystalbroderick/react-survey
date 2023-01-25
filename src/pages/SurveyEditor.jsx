import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import EditorForm from "../components/EditorForm"
import SurveyData from "../data/surveys.data"
import { useId } from "react"
import { Container } from "react-bootstrap"

function SurveyEditor() {
  const { id } = useParams()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [survey, setSurvey] = useState({})
  const randomId = useId()
  const [newId, setNewId] = useState(randomId)

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
    console.log("submitted ;)")
    alert("submitted!!!")
  }

  useEffect(() => {
    const getSurveyInfo = async () => {
      const docSnap = await SurveyData.getSurvey(id)
      if (docSnap.exists()) {
        setSurvey({ title: docSnap.data().title, desc: docSnap.data().desc })
      } else {
        console.log("No such document!")
      }
    }
    const getQuestions = async () => {
      const querySnapshot = await SurveyData.getSurveyQuestions(id)
      querySnapshot.forEach((doc) => {
        setQuestions(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      })
      setLoading(false)
    }
    getSurveyInfo()
    getQuestions()
  }, [id])
  return (
    <Container>
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
