import React from 'react';

class Search extends React.Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }
  render() {
    const { value, onSubmit, onChange, children } = this.props;
    return (
      // children is received as props which was passed to Search as child text element
      <form onSubmit={onSubmit}>
        <input
          value={value}
          type="text"
          onChange={onChange}
          ref={el => (this.input = el)}
        />
        <button type="submit"> {children} </button>
      </form>
    );
  }
}

export default Search;
