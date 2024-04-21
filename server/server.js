const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    process.env.MONGODB_URL.replace('<password>', process.env.MONGODB_PASSWORD)
  )
  .then(() => {
    console.log('DB connection established');
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    });
  });
