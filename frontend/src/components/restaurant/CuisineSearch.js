import { useState } from 'react';

const CuisineSearch = ({ cuisines, callback }) => {

  const [searchCuisine, setSearchCuisine] = useState("")

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value
    setSearchCuisine(searchCuisine)
  }

  return (
    <div className="input-group col-lg-4 justify-content-between">
      <select onChange={onChangeSearchCuisine} className="flex-fill">
        {cuisines.map((cuisine, index) => {
          return (
            <option value={cuisine} key={index}> {cuisine.substr(0, 20)} </option>
          )
        })}
      </select>
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => {
            callback(searchCuisine)
          }}
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default CuisineSearch