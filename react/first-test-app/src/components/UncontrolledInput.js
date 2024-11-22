import React, { useRef, useState } from "react";

export default function UncontrolledInput() {
  const inputRef = useRef();
  const [submittedValue, setSubmittedValue] = useState("");

  const handleSubmit = () => {
    if (inputRef.current) {
      setSubmittedValue(inputRef.current.value);
    }
  };

  return (
    <div style={{ marginLeft: "100px" }}>
      <h1>비제어 컴포넌트</h1>
      <input type="text" ref={inputRef} />
      <h5>Ref : {inputRef.current?.value}</h5>
      <button onClick={handleSubmit} type="button">
        전송
      </button>
      <p>전송된 값 : {submittedValue}</p>
    </div>
  );
};


