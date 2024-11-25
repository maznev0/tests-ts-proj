import React, { useState } from "react";
import "./App.css"; // Файл стилей

const App = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">React Input Display</h1>
      <input
        type="text"
        className="input-box"
        placeholder="Введите текст"
        value={inputValue}
        onChange={handleInputChange}
      />
      <p className="output-text">Вы ввели: {inputValue}</p>
    </div>
  );
};

export default App;
