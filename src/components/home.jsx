import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home({ theme }) {
  const [cityInput, setCityInput] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityData, setCityData] = useState({
    temp: "-",
    condition: "",
    dayTime: "",
    icon: "",
  });
  const weatherIcon = `/images/icons/${cityData.icon}.svg`;

  function getCityKey(city) {
    const key = "aFw9vFGpUQeKudN09xAXiOIseNxG2moh";
    const cityKeyLink = axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`
      )
      .then((response) => {
        const locationName = response.data[0].LocalizedName;
        setCityName(locationName);
        axios
          .get(
            `http://dataservice.accuweather.com/currentconditions/v1/${response.data[0].Key}?apikey=${key}`
          )
          .then((response) => {
            const forecast = response.data[0];
            console.log(response);
            setCityData({
              location: cityInput,
              temp: forecast.Temperature.Imperial.Value,
              condition: forecast.WeatherText,
              dayTime: forecast.IsDayTime,
              icon: forecast.WeatherIcon,
            });
            setCityInput("");
          });
      });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    getCityKey(cityInput);
  }

  return (
    <div className="card-wrapper">
      <form
        className={theme === "light" ? "card" : "card card--dark"}
        onSubmit={handleFormSubmit}
      >
        <div className={cityName ? "card__info" : "hide"}>
          <h2 className="temperature">{cityData.temp} &#176;F</h2>
          <h3 className="location">{cityName}</h3>
          <div className="icon">
            <img src={weatherIcon} alt="" />
          </div>
          <h4 className="condition">{cityData.condition}</h4>
        </div>
        <input
          onKeyUp={(e) => setCityInput(e.target.value)}
          className={
            theme === "light" ? "card__input" : "card__input card__input--dark"
          }
          placeholder="Enter City Name"
        ></input>
      </form>
    </div>
  );
}
