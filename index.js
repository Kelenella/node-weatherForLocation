const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const axios = require("axios").default;
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(cors());

const PORT = process.env.PORT || 8080;

const thirdPartyBaseUrl = "http://api.weatherbit.io/v2.0/current";
const thirdPartyApiKey = process.env.WEATHER_API_KEY;

const queryURL = `${thirdPartyBaseUrl}?key=${thirdPartyApiKey}&lat=4.486970&lon=-30.712561`;
app.get("/api/weather", async (req, res) => {
  try {
    const response = await axios.get(queryURL).then((response) => {
      const weatherData = response.data;
      console.log(weatherData);
      res.json(weatherData);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error at server launch:", err);
  }
  console.log(`Server works at port ${PORT}!`);
});
