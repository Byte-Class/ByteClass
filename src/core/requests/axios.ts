import axios from "axios";

export const requests = axios.create({
  baseURL: "http://localhost:3001",
});
