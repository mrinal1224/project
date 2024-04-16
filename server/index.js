const express = require("express");
require('dotenv').config()

const mongoose = require("mongoose");

const app = express();

const PORT = 5003;

const userRoutes = require('./routes/userRoute')
const theatreRoutes = require('./routes/theatreRoutes')
const movieRoutes = require('./routes/movieRoutes')

mongoose
  .connect("mongodb+srv://mrinalbhattacharya:f3nBnwCYX9Sd9un1@cluster0.t4enktq.mongodb.net/BMS?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });


app.use(express.json())
app.use(express.urlencoded())

app.use('/api/users' , userRoutes )

app.use('/api/theatres' , theatreRoutes )
app.use('/api/movies' , movieRoutes )


app.listen(PORT, () => {
  console.log("Server Started");
});
