const express = require("express");

const mongoose = require("mongoose");

const app = express();

const PORT = 5003;

const userRoutes = require('./routes/userRoute')

mongoose
  .connect("mongodb+srv://mrinalbhattacharya:9q4dH9oukh2Yk1pM@cluster0.ywjxjga.mongodb.net/BMS?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });


app.use(express.json())
app.use(express.urlencoded())

app.use('/api/users' , userRoutes )

app.listen(PORT, () => {
  console.log("Server Started");
});
