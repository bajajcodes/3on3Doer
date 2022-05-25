import "./FormInput.styles.css";
import { useState } from "react";

function FormInput({ info }) {
  const { value = "" } = info;
  const [inputValue, setInputValue] = useState("");
  function onChangeHandler(event) {
    const value = event.target.value;
    setInputValue(value);
  }
  return (
    <label className="form-input">
      <span>{info.labelText}</span>
      <span
        className="material-icons-outlined"
        onClick={() => info.onIconClick()}
      >
        {info.icon}
      </span>{" "}
      <input
        type={info.type}
        minLength={info.minLength}
        placeholder={info.placeholder}
        name={info.name}
        value={value || inputValue}
        onChange={(e) => onChangeHandler(e)}
        required
      />
    </label>
  );
}

export { FormInput };
