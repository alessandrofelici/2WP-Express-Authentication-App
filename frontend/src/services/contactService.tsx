import axios from "axios";

const contactUrl = '/api/contacts';

export const showContacts = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }

  return axios.get(contactUrl, config)
}
