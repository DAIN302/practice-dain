import React, { useState } from "react";

export default function ControlledInput() {
  const [value, setValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    setSubmittedValue(value);
  }

  return (
    <div style={{marginLeft : '100px'}}>
      <h1>제어 컴포넌트</h1>
      <input type="text" value={value} onChange={handleChange} />
      <h5>State : {value}</h5>
      <button onClick={handleSubmit} type="button">전송</button>
      <p>전송된 값 : {submittedValue}</p>
    </div>
  );
}
