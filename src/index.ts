import express, { Request, Response, Express } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from './db/dbConfig';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import morgon from 'morgan';

// * Loading Environment variables
dotenv.config();

const main = async () => {
  const app: Express = express();

  // * Defining Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(morgon('dev'));

  // * Defining Routes
  app.get('/api', (req: Request, res: Response) => res.json({ message: 'success' }));
  app.use('/api', authRoutes);
  app.use('/api', categoryRoutes);
  app.use('/api', productRoutes);

  // * Defining DB Connection
  await connectToDB();

  const PORT = process.env.PORT;

  app.listen(PORT, (): void => console.log(`Listening on PORT: ${PORT}`));
};

main();
