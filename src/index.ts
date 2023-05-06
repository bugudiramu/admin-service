import express, { Request, Response, Express } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from './db/dbConfig';
import authRoutes from './routes/authRoutes';

// * Loading Environment variables
dotenv.config();

const main = async () => {
  const app: Express = express();

  // * Defining Middlewares
  app.use(cors());

  // * Defining Routes
  app.get('/api', (req: Request, res: Response) => res.json({ message: 'success' }));
  app.use('/api', authRoutes);

  // * Defining DB Connection
  await connectToDB();

  const PORT = process.env.PORT;

  app.listen(PORT, (): void => console.log(`Listening on PORT: ${PORT}`));
};

main();
