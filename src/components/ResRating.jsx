import React, { useState } from "react"
import { Col } from "react-bootstrap"
import Rating from "react-rating"
function ResRating({ qid, options, responseAnswer, answer }) {
  const [rating, setRating] = useState("")
  const handleChange = (value) => {
    setRating(value)
    responseAnswer(qid, value)
  }
  return (
    <>
      <Col md="auto">{options.min_value}</Col>

      <Col md="auto">
        <Rating
          stop={5}
          value={rating}
          initialRating={answer}
          onClick={handleChange}></Rating>
      </Col>

      <Col md="auto">{options.max_value}</Col>
    </>
  )
}

export default ResRating
