import { AsyncPaginate } from "react-select-async-paginate";

const AsyncSingleSelectDropdown = ({
  defaultValue = null,
  loadOptions,
  onChange,
  placeholder,
}) => {
  return (
    <AsyncPaginate
      defaultValue={defaultValue}
      placeholder={placeholder}
      defaultOptions
      isClearable // ✅ agar bisa dihapus
      loadOptions={loadOptions}
      className="relative z-20 asyncpaginate"
      onChange={onChange}
      additional={{ page: 1 }}
    />
  );
};

export default AsyncSingleSelectDropdown;
