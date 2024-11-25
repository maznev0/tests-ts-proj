const express = require("express");
const cors = require("cors");
const http = require("http");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
