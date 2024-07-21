import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import connectDB from './config/database';
import config from './config/default';
import swaggerSpec from './config/swagger';
import errorHandler from './middlewares/errorMiddleware';

import productRoutes from './routes/productRoutes';
import salesRoutes from './routes/saleRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
