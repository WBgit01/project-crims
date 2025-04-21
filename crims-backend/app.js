const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const app = express();
const authenticateToken = require('./middleware/auth');
const crimeRoute = require('./routers/crime_router.js');
const humanResourceRoute = require('./routers/human_resource_router.js');
const transportResourceRoute = require('./routers/transport_resource_router.js');
const userRoute = require('./routers/user_router.js');

// Connect to the database
const { connectDB } = require('./config/db.js');
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/crime', crimeRoute);
app.use('/resources/people', humanResourceRoute);
app.use('/resources/transport', transportResourceRoute);
app.use('/users', userRoute);

const PORT = process.env.PORT || 8080;
app.get('/', (req,res) => {
  res.send("Connected");
});

app.get('/dashboard-data', authenticateToken, (req, res) => {
  res.json({ message: 'Secure dashboard data!', user: req.user });
});

app.listen(PORT, () => {
  console.log({
    message: `Server is running on port ${PORT}`,
  });
});
