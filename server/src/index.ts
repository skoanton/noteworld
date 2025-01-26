import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import notesRoutes from './routes/notes.routes';
import { authenticate } from './middleware/middleware';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/notes', authenticate, notesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});