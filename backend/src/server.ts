import express from 'express';
import routes from './routes';

import './database';

const app = express();
const port = 3333;

// Permite a utilização de request.body
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
