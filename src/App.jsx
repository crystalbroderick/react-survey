import "./assets/custom.scss"
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import TemplateEditor from "./pages/TemplateEditor"
import { AuthProvider } from "./context/AuthContext"
import { getAuth } from "firebase/auth"
import Login from "./pages/Login"
import Templates from "./pages/Templates"

function App() {
  const auth = getAuth()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // check if user is logged in
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid
        if (window.location.pathname === "/login") {
          window.location = "dashboard"
        }
        setIsLoggedIn(true)
      } else {
        if (window.location.pathname === "/login") return // User on log in page, no change
        if (window.location.pathname !== "/login") {
          // redirect to log in
          window.location = "login"
        }
        setIsLoggedIn(false)
      }
    })
  }, [])
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Templates />} />
        <Route path="/template/:id" element={<TemplateEditor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/templates" element={<Templates />} />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>ERROR: Page not found!</p>
            </main>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
