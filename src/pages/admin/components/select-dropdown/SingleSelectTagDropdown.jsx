import AsyncSelect from "react-select/async";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#1f1f1f', // warna background input
    color: 'white',             // warna teks input (tidak selalu cukup, lihat input/singleValue)
    borderColor: state.isFocused ? '#2684FF' : '#444',
    boxShadow: state.isFocused ? '0 0 0 1px #2684FF' : null,
  }),
  input: (provided) => ({
    ...provided,
    color: 'white', // warna teks yang diketik
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white', // warna teks nilai yang dipilih
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#333', // background untuk tag
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white', // warna teks di tag
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white', // warna ikon X di tag
    ':hover': {
      backgroundColor: '#555',
      color: 'red',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#1f1f1f', // warna dropdown
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#333' : '#1f1f1f',
    color: 'white',
    ':active': {
      backgroundColor: '#444',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#ccc', // placeholder color
  }),
};


const SingleSelectTagDropdown = ({
  value = null,
  loadOptions,
  onChange,
}) => {
  return (
    <AsyncSelect
      value={value}
      defaultOptions
      isClearable
      loadOptions={loadOptions}
      onChange={onChange}
      className="relative"
      styles={customStyles} // tambahkan ini
    />
  );
};

export default SingleSelectTagDropdown;
