import "./app.css"

import { GlobalProvider } from "./hooks/globalContext";
import { AuthProvider } from "./hooks/authContext";
import { CustomerProvider } from "./hooks/CustomerContext";
import { HomePage } from "./pages/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { BooksByCategoryPage } from "./pages/BooksByCategoryPage";
import { BooksByQueryPage } from "./pages/BooksByQueryPage";
import { CartPage } from "./pages/CartPage";
import { OrderConfirmedPage } from "./pages/OrderConfirmedPage";
import { CustomerPage } from "./pages/CustomerPage";
import { AdminPage } from "./pages/AdminPage";

function App() {
  return (
    <>
      <GlobalProvider>
        <CustomerProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/category/:category" element={<BooksByCategoryPage />} />
              <Route path="/search" element={<BooksByQueryPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/confirm" element={<OrderConfirmedPage />} />
              <Route path="/book/id/:id" element={<BookDetailsPage />} />
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
