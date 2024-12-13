import React, { useState, ChangeEvent } from "react";
import "./App.css";
import Parser from "../tests/Parser";
import Compiler from "../tests/Compiler";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setInputValue(value);
  };
  const handleClick = () => {
    const parser = new Parser();
    if (parser.parse(inputValue)) {
      const output = Compiler.getResult();
      setResult(output.toString());
    } else {
      setResult("Ошибка: Некорректное выражение");
    }
  };

  return (
    <div className="container">
      <h1 className="title">React + TypeScript Input Parser</h1>
      <input
        type="text"
        className="input-box"
        placeholder="Введите выражение (например, 1+2+3)"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="but" onClick={handleClick}>
        get result
      </button>
      <p className="output-text">Результат: {result}</p>
    </div>
  );
};

export default App;
