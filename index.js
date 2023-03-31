require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const urlRouter = require('./routes/url');

const app = express();

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/', urlRouter)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})