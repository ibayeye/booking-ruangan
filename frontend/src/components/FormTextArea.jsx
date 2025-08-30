import React from "react";

const FormTextArea = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  style,
}) => {
  return (
    <div className="form-control">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">{label}</legend>
        <textarea
          className="textarea h-24 w-full"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={style}
        ></textarea>
      </fieldset>
    </div>
  );
};

export default FormTextArea;
