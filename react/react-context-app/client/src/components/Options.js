import React from "react";

const Options = ({ name, updateItemCount }) => {
  return (
    <form>
      <input
        type="checkbox"
        id={`${name}`}
        onChange={(e) => updateItemCount(name, e.target.checked ? 1 : 0)}
      />{" "}
      <label htmlFor={`${name}`}>{name}</label>
    </form>
  );
};

export default Options;
