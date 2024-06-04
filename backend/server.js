import express from 'express';
const app = express();
import cors from 'cors';
import routes from './routes.js'; 

const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});