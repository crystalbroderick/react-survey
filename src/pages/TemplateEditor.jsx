import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import EditorForm from "../components/EditorForm"
import TemplateData from "../data/templates.data"
import { useId } from "react"
import { Container } from "react-bootstrap"
import { useAuth, AuthContext } from "../context/AuthContext"
import { addDoc, Timestamp, collection } from "firebase/firestore"
import db from "../firebase.config.js"
import "firebase/firestore"

function TemplateEditor() {
  const { id } = useParams()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [survey, setSurvey] = useState({})
  const randomId = useId()
  const [newId, setNewId] = useState(randomId)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

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

  // Add new user survey to database
  async function handleSubmit(e) {
    e.preventDefault()
    const surveysRef = collection(db, "surveys")
    const newSurvey = {
      title: survey.title,
      desc: survey.desc,
      uid: currentUser.uid,
      created: Timestamp.now(),
    }
    // create new survey
    const docRef = await addDoc(surveysRef, newSurvey)

    await Promise.all(
      questions.map(async (doc) => {
        const questionsRef = collection(db, "surveys", docRef.id, "questions")
        const ref = addDoc(questionsRef, {
          title: doc.title,
          type: doc.type,
          options: doc.options || "",
        })
      }),
      navigate("/surveys")
    )
  }

  useEffect(() => {
    const getTemplateInfo = async () => {
      const docSnap = await TemplateData.getTemplate(id)
      if (docSnap.exists()) {
        setSurvey({ title: docSnap.data().title, desc: docSnap.data().desc })
      } else {
        console.log("No such document!")
      }
    }
    const getQuestions = async () => {
      const querySnapshot = await TemplateData.getTemplateQuestions(id)
      querySnapshot.forEach((doc) => {
        setQuestions(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      })
      setLoading(false)
    }
    getTemplateInfo()
    getQuestions()
  }, [id])
  return (
    <Container className="p-3">
      <h1 className="page-title">Create a New Survey</h1>
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

export default TemplateEditor
