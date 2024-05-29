// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
require('express-async-errors')
import express, { Express, Request, Response } from "express";
import path from "path";
import {logEvents, logger} from './middleware/logger';
import errorHandler from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
const app: Express = express();
import cors from 'cors';
import mongoose from "mongoose";
import corsOptions from './config/corsOptions'
import connectDB from './config/dbConn';
import rootRoutes from './routes/root';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import reviewRoutes from "./routes/reviewRoutes";
import authRoutes from "./routes/authRoutes";
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', rootRoutes)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/orders', orderRoutes)
app.use('/reviews', reviewRoutes)

app.all('*', (req: Request, res: Response) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})