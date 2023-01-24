import "./assets/custom.scss"
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import TemplateEditor from "./pages/TemplateEditor"
import { AuthProvider } from "./context/AuthContext"
import { getAuth } from "firebase/auth"
import Login from "./pages/Login"
import Templates from "./pages/Templates"
import Surveys from "./pages/Surveys"
import Header from "./components/Header"

function App() {
  const auth = getAuth()
  const user = auth.currentUser
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // check if user is logged in
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (window.location.pathname === "/login") {
          window.location = "surveys"
        }
        setIsLoggedIn(true)
        console.log("user logged in")
      } else {
        if (window.location.pathname === "/login") return // User on log in page, no change
        if (window.location.pathname !== "/login") {
          // redirect to log in
          window.location = "login"
        }
        setIsLoggedIn(false)
        console.log("user not logged in")
      }
    })
  }, [])
  return (
    <AuthProvider>
      <Header isLoggedIn={isLoggedIn}></Header>
      <Routes>
        <Route path="/" element={<Surveys />} />
        <Route path="/template/:id" element={<TemplateEditor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/surveys" element={<Surveys />} />
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
