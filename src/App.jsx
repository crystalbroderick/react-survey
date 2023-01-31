import "./assets/custom.scss"
import { useState, useEffect } from "react"
import { Route, Routes, Outlet } from "react-router-dom"
import TemplateEditor from "./pages/TemplateEditor"
import SurveyEditor from "./pages/SurveyEditor"
import { AuthProvider } from "./context/AuthContext"
import { getAuth } from "firebase/auth"
import Login from "./pages/Login"
import Templates from "./pages/Templates"
import Surveys from "./pages/Surveys"
import Header from "./components/Header"
import Signup from "./pages/Signup"
import Survey from "./pages/Survey"

function App() {
  const auth = getAuth()
  const user = auth.currentUser
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const AppLayout = () => (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {/* nested routes rendered here */}
      <Outlet />
    </>
  )

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
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:id" element={<Survey />} />
          <Route element={<AppLayout />}>
            {/* Nested routes with header */}
            <Route path="/" element={<Surveys />} />
            <Route path="/template/:id" element={<TemplateEditor />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/surveys" element={<Surveys />} />
            <Route path="/survey/:id" element={<SurveyEditor />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>ERROR: Page not found!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
