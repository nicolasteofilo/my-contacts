const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  response.status(500).json({
    error: 'Internal server error',
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🔥 Sever started at http://localhost:${PORT}`));
