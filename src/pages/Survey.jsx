import React from "react"

function Survey() {
  const { id } = useParams()

  useEffect(() => {
    var getDoc = SurveysData.getSurvey(id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!")
        } else {
          console.log("Document data:", doc.data())
        }
      })
      .catch((err) => {
        console.log("Error getting document", err)
      })
  }, [])
  return <div>Survey</div>
}

export default Survey
