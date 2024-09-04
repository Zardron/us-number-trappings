import React, { useEffect, useState } from "react";
import { TiTimes } from "react-icons/ti";
import US_FLAG from "./assets/united-states.png";

const App = () => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue.length === 14) {
      return setInputValue("+1 " + inputValue.toString());
    }
  }, [inputValue]);

  const getFormattedInputValue = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    let res = "";

    if (digits.length > 0) {
      res = `${digits.slice(0, 3)}`;
    }

    if (digits.length >= 4) {
      res = `(${res}) ${digits.slice(3, 6)}`;
    }

    if (digits.length >= 7) {
      res += `-${digits.slice(6)}`;
    }

    return res;
  };

  const handleSetInputValue = (event) => {
    const { value } = event.target;

    const formattedInputValue = getFormattedInputValue(value);
    setInputValue(formattedInputValue);
  };

  function preventBackspace(e) {
    var evt = e || window.event;
    if (evt) {
      var keyCode = evt.charCode || evt.keyCode;
      if (keyCode === 8) {
        if (evt.preventDefault) {
          evt.preventDefault();
        } else {
          evt.returnValue = false;
        }
      }
    }
  }

  const handleClearInput = () => {
    setInputValue("");
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="mt-32 flex flex-col justify-center">
        <div className="relative w-96 flex items-center justify-center">
          <img
            src={US_FLAG}
            alt=""
            className="w-12 h-[44px] px-2 border-2 rounded-tl-lg rounded-bl-lg"
          />
          <input
            type="text"
            value={inputValue}
            onChange={handleSetInputValue}
            placeholder="Contact Number"
            className="w-full border-t-2 border-r-2 border-b-2 py-2 px-4 rounded-tr-lg rounded-br-lg focus:outline-none placeholder:text-gray-400"
            readOnly={inputValue.length === 17 && true}
            onKeyDown={inputValue.length === 17 ? preventBackspace : () => {}}
          />
          {inputValue.length === 17 && (
            <div
              className="cursor-pointer absolute top-3 right-4"
              onClick={handleClearInput}
            >
              <TiTimes size={20} />
            </div>
          )}
        </div>
        <span className="mt-2">
          Contact Number: <span className="font-bold">{inputValue}</span>
        </span>
      </div>
    </div>
  );
};

export default App;
