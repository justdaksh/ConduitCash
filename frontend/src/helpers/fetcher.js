import axios from "axios";

export const fetcher = url => axios.get(url, {
    headers: {
      Authorization: localStorage.getItem("token") || null,
    }
  }).then(res => res.data);