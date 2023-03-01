import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const ThemeButton = styled.div`
  position: absolute;
  top: 0;
  left: ${({ theme }) => (theme === "light" ? 0 : "50%")};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => (theme === "light" ? "orange" : "red")};
  transition: all 0.5s ease;
`;

export default function NavBar({ theme, setTheme }) {
  return (
    <div id="navBar-Container">
      <h3 className="navBar__title">Current Forcast.</h3>
      <div
        className="theme__toggle-container"
        onClick={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
      >
        <FontAwesomeIcon icon={faSun} />
        <div
          className={
            theme === "light"
              ? "theme__toggler"
              : "theme__toggler theme__toggler--dark"
          }
        >
          <ThemeButton theme={theme} />
        </div>
        <FontAwesomeIcon icon={faMoon} />
      </div>
    </div>
  );
}
