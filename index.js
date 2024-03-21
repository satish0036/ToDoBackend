import dotenv from 'dotenv';
import cors from "cors"
import  express  from 'express';
import bodyParser from 'body-parser';
import AuthRoutes from './routes/AuthRoutes.js';
import PostRoutes from './routes/PostRoutes.js';
const app = express();
const PORT = process.env.PORT || 8800;
dotenv.config();

app.use(cors({
  origin: ['http://localhost:3000','/', ],
  credentials: true,
}));

app.use(bodyParser.json());


app.use('/api/auth',AuthRoutes)
app.use('/api/post',PostRoutes)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
