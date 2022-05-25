import React from "react";

function FormButton({ info }) {
  return (
    <button name={info.name} className={info.className}>
      {info.text}
    </button>
  );
}

export { FormButton };
