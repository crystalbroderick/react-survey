import './assets/custom.scss'
import { Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Templates from './pages/templates'
function App() {

  return (
    <Container>
     <Routes>
      <Route path='/' element={<Templates/>}/>
      <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>ERROR: Page not found!</p>
                </main>
              }
            />
     </Routes>
    </Container>
  )
}

export default App
