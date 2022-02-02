import React from "react";

const Input = ({ label, name, value, type, onChange, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        className="form-control"
        id={name}
      />
      {error && <div className="alert alert-danger"> {error} </div>}
    </div>
  );
};

export default Input;
