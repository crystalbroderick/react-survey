import React, { useState } from "react"
import { Button, Col, Row, ButtonGroup, ToggleButton } from "react-bootstrap"

function Rating(q) {
  const [minValue, setMinValue] = useState(q.options.min_value)
  const [maxValue, setMaxValue] = useState(q.options.max_value)
  const [rating, setRating] = useState(0)
  const [checked, setChecked] = useState(false)
  const [radioValue, setRadioValue] = useState(1)

  console.log("value...", radioValue)
  return (
    <>
      <Col md="auto">{minValue}</Col>

      <Col md="auto">
        <ButtonGroup>
          {[1, 2, 3, 4, 5].map((rating, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="outline-primary"
              name="radio"
              value={rating}
              checked={radioValue == rating}
              onChange={(e) => setRadioValue(e.currentTarget.value)}>
              {rating}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Col>

      <Col md="auto">{maxValue}</Col>
    </>
  )
}

export default Rating
