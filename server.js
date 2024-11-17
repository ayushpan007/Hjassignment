const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const connectDB = require('./config/db');
const { authorize } = require('./middleware/authMiddleware');
const { startGraphQlServer } = require('./config/graphqlServer.js');

const app = express();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    app.use(bodyParser.json());
    app.use(cors({
      origin: '*', 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    await startGraphQlServer(app);
    app.use(authorize);
    app.use('/', routes);
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Internal Server Error' });
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
})();
