const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
connectToMongo();
