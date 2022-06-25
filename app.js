require('@babel/register');
require('dotenv').config();

const express = require('express');

const expressConfig = require('./config/express');

const registerRouter = require('./routes/register');

const app = express();
const PORT = process.env.PORT || 4000;

expressConfig(app);

app.use('/register', registerRouter);

app.listen(PORT, () => {
    console.log(`server started PORT: ${PORT}`);
});