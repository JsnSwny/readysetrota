import React, { useState } from "react";

const SearchField = ({
  placeholder,
  setFilteredObjects,
  objs,
  filterField,
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="search-field flex-container--align-center">
      <i class="fas fa-search"></i>
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setFilteredObjects(
            objs.filter((item) =>
              item[filterField]
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            )
          );
        }}
      />
    </div>
  );
};

export default SearchField;
