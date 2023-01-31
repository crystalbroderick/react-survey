import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SurveysData from "../data/surveys.data"
import { QuerySnapshot } from "firebase/firestore"
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
  }, [])
  return <div>Survey {survey.title} </div>
}

export default Survey
