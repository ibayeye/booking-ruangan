import React from "react";

const FormInputFile = ({
  label = "Upload File",
  name,
  onChange,
  accept = "*/*",
  multiple = false,
  required = false,
  disabled = false,
  className = "",
  placeholder = "Pilih file...",
  maxSize,
  allowedTypes,
  showFileInfo = true,
  value,
  error,
  helperText,
  ...props
}) => {
  const handleFileChange = (e) => {
    const files = e.target.files;
    const file = multiple ? files : files[0];

    if (maxSize && file) {
      const filesToCheck = multiple ? Array.from(files) : [file];
      const oversizedFiles = filesToCheck.filter(
        (f) => f.size > maxSize * 1024 * 1024
      );

      if (oversizedFiles.length > 0) {
        alert(`File terlalu besar! Maksimal ${maxSize}MB`);
        e.target.value = "";
        return;
      }
    }

    if (allowedTypes && file) {
      const filesToCheck = multiple ? Array.from(files) : [file];
      const invalidFiles = filesToCheck.filter(
        (f) => !allowedTypes.includes(f.type)
      );

      if (invalidFiles.length > 0) {
        alert(`Tipe file tidak diizinkan! Hanya: ${allowedTypes.join(", ")}`);
        e.target.value = ""; 
        return;
      }
    }

    if (onChange) {
      onChange({
        target: {
          name,
          value: file,
          files: files,
        },
      });
    }
  };

  const getFileInfo = () => {
    if (!value) return null;

    if (value instanceof File) {
      return (
        <div className="text-sm text-gray-600 mt-1">
          <span className="font-medium">{value.name}</span>
          <span className="ml-2">
            ({(value.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        </div>
      );
    }

    if (typeof value === "string" && value.startsWith("http")) {
      return (
        <div className="mt-2">
          <img
            src={value}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md border"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="form-control">
      <div className="fieldset">
        <legend className="fieldset-legend">
          {label}
          {/* {required && <span className="text-red-500 ml-1">*</span>} */}
        </legend>

        <input
          type="file"
          name={name}
          className={`file-input file-input-bordered w-full ${
            error ? "file-input-error border-red-500" : ""
          } ${disabled ? "file-input-disabled" : ""} ${className}`}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          {...props}
        />

        {showFileInfo && getFileInfo()}

        {helperText && (
          <div className="text-sm text-gray-500 mt-1">{helperText}</div>
        )}

        {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
      </div>
    </div>
  );
};

export default FormInputFile;
