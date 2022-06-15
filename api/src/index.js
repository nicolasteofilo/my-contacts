const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.json({ message: "Hello Word" });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🔥 Sever started at http://localhost:${PORT}`)
);
