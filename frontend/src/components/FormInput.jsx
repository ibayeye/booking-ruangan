import React from "react";

const FormInput = ({
  label,
  type,
  name,
  value,
  defaultValue,
  placeholder,
  onChange,
  style,
  disabled,
  readOnly,
  required,
}) => {
  return (
    <div className="form-control">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">{label}</legend>
        <input
          className="input w-full"
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          style={style}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
        />
      </fieldset>
    </div>
  );
};

export default FormInput;
