require('dotenv').config();
const express = require('express');
const app = express();
const crimeRoute = require('./routers/crime_router.js');
const humanResourceRoute = require('./routers/human_resource_router.js');
const transportResourceRoute = require('./routers/transport_resource_router.js');

// Connect to the database
const { connectDB } = require('./config/db');
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/crime', crimeRoute);
app.use('/resources/people', humanResourceRoute);
app.use('/resources/transport', transportResourceRoute);

const PORT = process.env.PORT || 8080;
app.get('/', (req,res) => {
  res.send("Connected");
});

app.listen(PORT, () => {
  console.log({
    message: `Server is running on port ${PORT}`,
  });
});
