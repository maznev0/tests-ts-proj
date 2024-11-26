import React, { useState, ChangeEvent } from "react";
import "./App.css"; // Файл стилей

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">React + TypeScript Input Display</h1>
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
