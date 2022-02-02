import React, { useState } from "react";
import Input from "./Input";
import Joi from "joi-browser";

const Form = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const option = { abortEarly: false };
    const result = Joi.validate(data, schema, option);
    if (!result.error) return null;
    const error = {};
    for (let item of result.error.details) error[item.path[0]] = item.message;
    return error;
  };

  const validateProperty = ({ name, value }) => {
    const { error } = Joi.validate({ [name]: value }, { [name]: schema[name] });
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate() || {});
    if (validate()) return;
    console.log("!Submited");
  };

  const handleChange = ({ target: input }) => {
    const errorsClone = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errorsClone[input.name] = errorMessage;
    else delete errorsClone[input.name];
    const dataClone = { ...data };
    dataClone[input.name] = input.value;
    setData(dataClone);
    setErrors(errorsClone);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={data.username}
        onChange={handleChange}
        label={"Username"}
        name={"username"}
        type={"text"}
        error={errors.username}
      />
      <Input
        value={data.password}
        onChange={handleChange}
        label={"Password"}
        name={"password"}
        type={"password"}
        error={errors.password}
      />
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Form;
