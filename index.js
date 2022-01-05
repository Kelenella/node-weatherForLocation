const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const axios = require("axios").default;

const app = express();

const PORT = process.env.PORT || 8080;

// http://api.weatherbit.io/v2.0/current?key=0c3ff6a230224f1b8554fd508218dbf8&lat=46.486970&lon=30.712561
const thirdPartyBaseUrl = "http://api.weatherbit.io/v2.0/current";
const thirdPartyApiKey = process.env.WEATHER_API_KEY;

const queryURL = `${thirdPartyBaseUrl}?key=${thirdPartyApiKey}&lat=46.486970&lon=30.712561`;
app.get("/api/weather", async (req, res) => {
  try {
    const response = await axios.get(queryURL).then((response) => {
      const weatherData = response.data;
      // const { station } = weatherData;
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
