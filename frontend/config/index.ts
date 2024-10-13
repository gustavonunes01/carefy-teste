import * as process from "process";

export const Config = {

  // NEXT_PUBLIC_API_URL = ROTA DO FRONT-END
  // BACK_API = Rota de backend

  API_URL: process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:3000/api/",
    BACK_API: process.env.BACK_API
    ? process.env.BACK_API
    : "http://127.0.0.1:8000/api/",
};
