import { useState, useEffect } from 'react';
import { jwtDecode, type JwtPayload } from "jwt-decode";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [jwt, setJwt] = useState<{token: string} | null>(null)
  const [contacts, setContacts] = useState([])

  const payload = jwt !== null ? jwtDecode<DecodedToken>(jwt.token) : null

  useEffect(() => {
    if (jwt !== null) {
      console.log(jwt)
      const contactUrl = '/api/contacts';
      const token = jwt.token

      const config = {
        headers: { Authorization: `Bearer ${token}`}
      }

      axios.get(contactUrl, config).then((response) => {
        setContacts(response.data.filter(
          // @ts-expect-error contact is real
          contact => contact.belongsTo.username === payload.username
        ))
      })
    }
  }, [jwt])

  interface Credentials {
    username: string;
    password: string;
  }

  interface Contact {
    name: string;
    number: string;
  }

  interface DecodedToken extends JwtPayload {
  username: string;
  name: string;
  id: string;
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
      </form>

      <input type="submit" value="Register"/>

      {jwt !== null && (
        <div>
          <h2>Your Contacts</h2>
          {contacts.map((contact: Contact) => (
            <div key={contact.name}>
              {contact.name} {contact.number}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default App;