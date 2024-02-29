const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");

const routes = require('./routers/index');

const server = express();
const port = process.env.PORT;

const corsConfig = {
    origin: "*",
    credentials: false
}

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: ["tr","en"],
    backend: {
      loadPath: "./locales/{{lng}}.json",
    },
  });

server.use(parser.json());
server.use(cors(corsConfig));
server.use(middleware.handle(i18next));

server.use(('/api', routes));

server.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});