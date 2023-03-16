import db from "../firebase.config.js"
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  where,
  query,
  getDoc,
} from "firebase/firestore"

const surveysRef = collection(db, "surveys")

class SurveyData {
  // add to all surveys - includes user id
  addSurvey = (newSurvey) => {
    return addDoc(surveysRef, newSurvey)
  }

  addSurveyQuestions = (question, surveyId) => {
    const questionsRef = collection(db, "surveys", surveyId, "questions")
    return addDoc(questionsRef, question)
  }

  // addSurveyQuestions = (id, questions) => {
  //   const q = collection(db, "surveys", id, "questions")
  //   return
  // }

  // Get all surveys in database
  getAllSurveys = () => {
    return getDocs(surveysRef)
  }

  getSurvey = (id) => {
    const surveyDoc = doc(db, "surveys", id)
    return getDoc(surveyDoc)
  }

  // Get user specific surveys
  getUserSurveys = (uid) => {
    return getDocs(query(surveysRef, where("uid", "==", uid)))
  }

  getSurveyQuestions = (id) => {
    const q = collection(db, "surveys", id, "questions")
    return getDocs(q)
  }

  // Delete survey - doesn't delete questions subcollection through app
  deleteSurvey = (id) => {
    const surveyDoc = doc(db, "surveys", id)
    return deleteDoc(surveyDoc)
  }

  // Add survey respondees responses
  addResponse = (surveyId, questionId, answer) => {
    const responsesRef = collection(
      db,
      "surveys",
      surveyId,
      "questions",
      questionId,
      "responses"
    )
    return addDoc(responsesRef, answer)
  }
}
export default new SurveyData()
