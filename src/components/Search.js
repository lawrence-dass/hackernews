import React, { Component } from 'react';

class Search extends Component {
  render() {
    // children is received as props which was passed to Search as child text element
    const { value, onChange, children } = this.props;
    return (
      <form>
        {children}
        <input value={value} type="text" onChange={onChange} />
      </form>
    );
  }
}

export default Search;
