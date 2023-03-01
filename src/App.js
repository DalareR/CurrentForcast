import "./App.css";
import Home from "./components/home";
import NavBar from "./components/navBar";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./components/createGlobalStyle.js";
import { lightTheme, darkTheme } from "./components/theme.js";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <div id="app-container">
        <NavBar theme={theme} setTheme={setTheme} />
        <Home theme={theme} />
      </div>
    </ThemeProvider>
  );
}

export default App;
