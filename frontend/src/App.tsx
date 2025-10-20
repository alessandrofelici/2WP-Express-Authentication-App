import LoginForm from './components/login';
import ContactDisplay from './components/ContactDisplay';
import { useLogin } from './hooks/useLogin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from './components/register';

function App() {
  const { payload, contacts, handleLogin, handleLogout } = useLogin();

  return (
    <Router>
      <Routes>
        <Route path="" element={
          <>
            <h1>Login</h1>
            <LoginForm handleLogin={handleLogin}/>
            {payload !== null && (
              <ContactDisplay contacts={contacts} username={payload.username} />
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        } />
        <Route path="register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;