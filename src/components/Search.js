import React from 'react';

const Search = ({ value, onSubmit, onChange, children }) => (
  // children is received as props which was passed to Search as child text element
  <form onSubmit={onSubmit}>
    <input value={value} type="text" onChange={onChange} />
    <button type="submit"> {children} </button>
  </form>
);

export default Search;
