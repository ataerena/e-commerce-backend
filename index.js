const express = require('express');
const parser = require('body-parser');
const cors = require('cors');

const routes = require('./routers/index');

const server = express();
const port = process.env.PORT;

const corsConfig = {
    origin: "*",
    credentials: false
}

server.use(parser.json());
server.use(cors(corsConfig));

server.use(('/api', routes));

server.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});