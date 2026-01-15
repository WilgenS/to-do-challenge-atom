import cors from "cors";

export const allowedOrigins = [
  "https://to-do-challenge-atom.web.app",
  "https://to-do-challenge-atom.firebaseapp.com",
  "http://localhost:4200",
];

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    console.log('Origin received:', origin); // Agrega esta línea
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  credentials: false,
};
