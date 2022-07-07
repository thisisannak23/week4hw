import React, { useState } from "react";
import "./App.css";
import axios from "axios";

export default function CityTemp() {
  let [city, setCity] = useState(null);
  let [temperature, setTemperature] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [windspeed, setWindspeed] = useState(null);
  let [description, setDescription] = useState(null);

  function UpdateCity(event) {
    setCity(event.target.value);
  }

  function UpdateCurrent(response) {
    setTemperature(response.data.main.temp);
    setHumidity(response.data.main.humidity);
    setWindspeed(response.data.wind.speed);
    setDescription(response.data.weather[0].description);
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f9de746b9d23a9c915974277fc1710ae&units=metric`;
  axios.get(url).then(UpdateCurrent);

  function Response(event) {
    event.preventDefault();
    document.getElementById(
      "answer"
    ).innerHTML = `The current temperature in ${city} is ${Math.round(
      temperature
    )}° Celsius.
        The humidity is ${Math.round(humidity)}%. The windspeed is ${Math.round(
      windspeed
    )} mph. Right now, ${city} has ${description}.`; 
  }
  return (
    <form onSubmit={Response}>
      <div id="answer"></div>

      <div>
        <input
          type="search"
          className="city"
          autoComplete="off"
          placeholder="Enter City"
          onChange={UpdateCity}
        />
      </div>

      <div>
        <input type="submit" id="submit" className="btn"></input>
      </div>
    </form>
  );
}
