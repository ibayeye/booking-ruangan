import React from "react";

const Dropdown = ({ label, items = [], onSelect, value }) => {
  return (
    <div className="form-control">
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-md">{label}</legend>
        <div className="dropdown w-full">
          <div
            tabIndex={0}
            role="button"
            className="input w-full flex justify-between items-center cursor-pointer"
          >
            {value || "Pilih opsi"}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box w-full p-2 shadow-sm max-h-60 overflow-auto"
          >
            {items.length > 0 ? (
              items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(item)}
                    className="text-left w-full"
                  >
                    {item.name}
                  </button>
                </li>
              ))
            ) : (
              <li>
                <span className="opacity-50">Tidak ada data</span>
              </li>
            )}
          </ul>
        </div>
      </fieldset>
    </div>
  );
};

export default Dropdown;
