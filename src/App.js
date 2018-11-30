import React, { Component } from 'react';
import Search from './components/Search';
import List from './components/List';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectId: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.org/',
    author: ['Dan Abramov', 'Andrew Clark'],
    num_comments: 2,
    points: 5,
    objectId: 1
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list, searchTerm: '' };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectId !== id;
    const newList = this.state.list.filter(isNotId);
    this.setState(() => {
      return {
        list: newList
      };
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    // object destructuring
    const { list, searchTerm } = this.state;

    // filtering the list based on search input and then mapping over it to render filtered list
    const filteredList = list.filter(item => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
      <div className="page">
        <div className="interactions">
          {/* Search only handles the search term event */}
          <Search value={searchTerm} onChange={this.onSearchChange}>
            {/* Passing Search text as child to this component which can be access from this.props in Search component */}
            Search:
          </Search>
          <List filteredList={filteredList} onDismiss={this.onDismiss} />
        </div>
      </div>
    );
  }
}

export default App;
