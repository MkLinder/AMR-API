require('dotenv').config();
const cors = require('cors');
const express = require('express');
const route = require('./routes');
const app = express();


app.use(express.json());
app.use(cors());
app.use(route);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: http://localhost:${process.env.PORT}`);
});