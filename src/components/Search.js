import React from 'react';

// Search Input Component
const Search = ({ value, onChange, onSubmit, children }) => (
  <form className="header__search" onSubmit={onSubmit}>
    <label htmlFor="search"> Search</label>
    <input
      id="search"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search input..."
    />
    <button type="submit">{children}</button>
  </form>
);

export default Search;
