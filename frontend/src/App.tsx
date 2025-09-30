import { useState } from 'react';
import axios from "axios";

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [jwt, setJwt] = useState(null)

  interface Credentials {
    username: string;
    password: string;
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const credentials: Credentials = {
      username,
      password,
    };

    await handleLoginBackend(credentials);
  };

  const handleLoginBackend = async (credentials: Credentials) => {
    const baseUrl = "/api/login";

    try {
      const res = await axios.post(baseUrl, credentials)
      const jwt = res.data

      setJwt(jwt);
    }
    catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input type="submit" value="Login"/>
        <input type="submit" value="Register"/>
      </form>
    </>
  )
}

export default App;