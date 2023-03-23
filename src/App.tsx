import "./app.css"

import { GlobalProvider } from "./hooks/globalContext";
import { AuthProvider } from "./hooks/authContext";
import { CustomerProvider } from "./hooks/CustomerContext";
import { HomePage } from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage";
import { BookDetailsPage } from "./pages/BookDetailsPage";

function App() {
  return (
    <>
      <GlobalProvider>
        <CustomerProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book" element={<BookDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </AuthProvider>
        </CustomerProvider>
      </GlobalProvider>
    </>
  )
}

export default App
