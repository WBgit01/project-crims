//npm install or npm i express

require('dotenv').config();
const express = require('express');
const app = express();
const crimeRoute = require('./routers/crime_router.js');
const resourceRoute = require('./routers/resource_router.js');

// Connect to the database
const { connectDB } = require('./config/db');
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/crime', crimeRoute);
app.use('/resources', resourceRoute);

const PORT = process.env.PORT || 8080;
app.get('/', (req,res) => {
  res.send("Tangina mo!");
});

app.listen(PORT, () => {
  console.log({
    message: `Server is running on port ${PORT}`,
  });
});
