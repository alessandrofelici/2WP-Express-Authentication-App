import { useEffect, useState } from "react";
import type { LoginRequest, JwtPayload } from "@shared/types";
import { jwtDecode } from "jwt-decode";
import { login } from "../services/loginService";
import { showContacts } from "../services/contactService";

export function useLogin() {
  const [jwt, setJwt] = useState<{token: string} | null>(null)
  const [contacts, setContacts] = useState([])
  // const { showNotification } = useNotification();

  const payload = jwt !== null ? jwtDecode<DecodedToken>(jwt.token) : null

  interface DecodedToken extends JwtPayload {
    username: string;
    name: string;
    id: string;
  }
  
  useEffect(() => {
    const JwtAccessToken = window.localStorage.getItem("JwtAccessToken");

    if (JwtAccessToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(JwtAccessToken);

        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          console.log("Token expired, removing from local storage");
          window.localStorage.removeItem("JwtAccessToken");
          return
        }

        setJwt({ token: JwtAccessToken });
      } catch (error) {
          console.error("Invalid token, removing from localStorage:", error);
          window.localStorage.removeItem("JwtAccessToken");
      }
    }
  }, [])
  
  useEffect(() => {
    if (jwt !== null) {
      console.log(jwt)
      const token = jwt.token

      // Switching between user logins was leaving extra contacts behind
      setContacts([])

      showContacts(token).then((response) => {
        setContacts(response.data.filter(
          // @ts-expect-error contact is real
          contact => contact.belongsTo.username === payload.username
        ))
      })
    }
  }, [jwt])

  const handleLogin = async ( username: string, password: string) => {

    const credentials: LoginRequest = {
      username,
      password,
    };

    await handleLoginBackend(credentials);
  };

  const handleLoginBackend = async (credentials: LoginRequest) => {
    try {
      const res = await login(credentials)
      setJwt(res);
      window.localStorage.setItem("JwtAccessToken", res.token);
    }
    catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  }

  return {
    payload,
    contacts,
    handleLogin
  }
}

export default useLogin