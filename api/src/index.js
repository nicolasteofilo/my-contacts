const express = require('express');
require('express-async-errors');

const { AppError } = require('./errors/AppError');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use(
  (err, request, response, next) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      message: `Internal server error - ${err.message}`,
    });
  },
);

const PORT = 3000;
app.listen(PORT, () => console.log(`🔥 Sever started at http://localhost:${PORT}`));
