import { useState } from 'react';

const Search = ({ type, placeholder, callback }) => {
  const [value, setValue] = useState("");
  const handleInputChange = e => {
    setValue(e.target.value);
  };
  return (
    <div className="input-group col-lg-4">
      <input
        value={value} onChange={handleInputChange}
        className="form-control"
        placeholder={placeholder}
        type={type}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => {
            callback(value)
          }}
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default Search