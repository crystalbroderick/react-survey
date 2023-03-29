import React, { useState, useEffect } from "react"
import { Col, Row, Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import "firebase/firestore"
import TemplateData from "../data/templates.data"

function Templates() {
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    const getTemplates = async () => {
      try {
        const data = await TemplateData.getAllTemplates()
        setTemplates(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      } catch (e) {
        console.log("Error loading templates ", e)
      }
    }
    getTemplates()
  }, [])
  return (
    <Container className="p-3">
      <h1 className="page-title">Templates</h1>

      <Row xs={1} md={3} className="g-3">
        {templates.map((template) => (
          <Col key={template.id}>
            <Card
              bg="almond"
              className="shadow p-3 mb-5 rounded h-75 "
              key={template.id}>
              <Card.Body>
                <Card.Title>{template.title}</Card.Title>
                <Card.Text>{template.desc ? template.desc : null}</Card.Text>
              </Card.Body>{" "}
              <div className="d-flex justify-content-end align-items-end">
                <Link
                  className="btn btn-helliogray text-white shadow-sm button-card"
                  to={`/template/${template.id}`}
                  state={{
                    title: template.title,
                    id: template.id,
                    desc: template.desc,
                  }}>
                  Use Template
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Templates
