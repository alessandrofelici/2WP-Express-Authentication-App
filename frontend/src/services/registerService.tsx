import type { RegisterRequest } from "@shared/types";
import axios from "axios";

const baseUrl = "/api/register";

export default {
  register: async (registerData: RegisterRequest) => {
    return axios.post(baseUrl, registerData)
  }
};