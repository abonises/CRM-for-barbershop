import allowedOrigins from './allowedOrigins';
import cors from "cors";

const corsOptions: cors.CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    if (allowedOrigins.indexOf(origin || '') !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

export default corsOptions;