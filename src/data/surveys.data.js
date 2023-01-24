import db from "../firebase.config.js"
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  where,
  query,
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

  addSurveyQuestions = (id, questions) => {
    const q = collection(db, "surveys", id, "questions")
    return
  }

  // Get all surveys in database
  getAllSurveys = () => {
    console.log(surveysRef)
    return getDocs(surveysRef)
  }

  // Get user specific surveys
  getUserSurveys = (uid) => {
    return getDocs(query(surveysRef, where("uid", "==", uid)))
  }

  // Delete survey
  deleteSurvey = (id) => {
    const surveyDoc = doc(db, "surveys", id)
    return deleteDoc(surveyDoc)
  }
}
export default new SurveyData()
