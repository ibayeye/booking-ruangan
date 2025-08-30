import React, { useEffect, useRef } from "react";
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";

const FormDateInput = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  style,
}) => {
  const myDatepicker = useRef(null);

  useEffect(() => {
    const picker = new Pikaday({
      field: myDatepicker.current,
      format: "YYYY-MM-DD",
      onSelect: (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        onChange &&
          onChange({
            target: {
              name,
              value: formattedDate, 
            },
          });
      },
    });

    if (value) {
      const dateValue = new Date(value);
      if (!isNaN(dateValue.getTime())) {
        picker.setDate(dateValue, true);
      }
    }

    return () => picker.destroy();
  }, [name, onChange, value]);

  return (
    <div className="form-control">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">{label}</legend>
        <input
          className="input input-bordered w-full"
          ref={myDatepicker}
          type="text"
          name={name}
          value={value}
          placeholder={placeholder || "YYYY-MM-DD"}
          style={style}
          readOnly
        />
      </fieldset>
    </div>
  );
};

export default FormDateInput;
