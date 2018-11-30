import React from 'react';

const Search = ({ value, onChange, children }) => (
  // children is received as props which was passed to Search as child text element
  <form>
    {children}
    <input value={value} type="text" onChange={onChange} />
  </form>
);

export default Search;
