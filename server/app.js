const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Routes:
const userRoutes = require('./routes/user.routes');
const adRoutes = require('./routes/ad.routes');
const categoryRoutes = require('./routes/category.routes');
// Error class
const AppError = require('./utils/appError');

const app = express();

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// Routes:
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/ads', adRoutes);
app.use('/api/v1/category', categoryRoutes);

// Global Error Handling
app.all('*', (req, _, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`));
});

app.use((err, _, res, next) => {
  if (res.headersSent) {
    // If headers have already been sent, let Express handle the error
    return next(err);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).send({
    message: `Error: ${err.message}`,
    status: err.status,
  });
});

module.exports = app;
