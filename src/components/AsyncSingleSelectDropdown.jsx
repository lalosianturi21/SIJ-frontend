import { AsyncPaginate } from "react-select-async-paginate";
import { components } from "react-select";

const customStyles = {
  control: (base, state) => ({
    ...base,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: state.isFocused ? "#4FC3F7" : "#D1D5DB", // Tailwind: blue-300 or gray-300
    boxShadow: state.isFocused ? "0 0 0 1px #4FC3F7" : "none",
    borderRadius: "0.5rem", // rounded-lg
    backgroundColor: "#fff",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      borderColor: "#4FC3F7",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9CA3AF", // Tailwind's gray-400
  }),
  menu: (base) => ({
    ...base,
    zIndex: 50,
  }),
  singleValue: (base) => ({
    ...base,
    color: "#111827", // Tailwind's gray-900
  }),
  input: (base) => ({
    ...base,
    color: "#111827",
  }),
};

const AsyncSingleSelectDropdown = ({
  defaultValue = null,
  loadOptions,
  onChange,
  placeholder = "Pilih opsi...",
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <AsyncPaginate
        defaultValue={defaultValue}
        placeholder={placeholder}
        defaultOptions
        isClearable
        loadOptions={loadOptions}
        className="z-20"
        styles={customStyles}
        onChange={onChange}
        additional={{ page: 1 }}
      />
    </div>
  );
};

export default AsyncSingleSelectDropdown;
