import { toast } from "react-toastify";

import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.response.use((value) => {
  if (
    value.data &&
    typeof value.data === "object" &&
    "type" in value.data &&
    value.data.type == "error" &&
    "messages" in value.data &&
    Array.isArray(value.data.messages) &&
    (!("interceptable" in value.data) || value.data.interceptable)
  ) {
    for (const error of value.data.messages) {
      toast.error(error);
    }
  }

  return value;
});

export default api;
