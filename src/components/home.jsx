import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Card = styled.form`
  height: ${({ cityName }) => (cityName ? "auto" : 0)};
  min-width: 300px;
  min-height: ${({ cityName }) => (cityName ? "300px" : 0)};
  max-width: 400px;
  max-height: 400px;
  padding: ${({ cityName }) => (cityName ? "30px" : 0)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) =>
    theme === "light" ? "rgb(214, 214, 214)" : "rgb(35, 35, 35)"};
  border-radius: 10px;
  transition: all 0.5s ease;
`;

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
    const key = "ToFgXdvVA7Et8puwG3W4qffJ07HAssFh";
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
      <Card theme={theme} cityName={cityName} onSubmit={handleFormSubmit}>
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
      </Card>
    </div>
  );
}
