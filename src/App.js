import React, { Component } from 'react';
import Search from './components/Search';
import List from './components/List';
import './App.css';
import Button from './components/Button';

// const list = [
//   {
//     title: 'React',
//     url: 'https://reactjs.org',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectId: 0
//   },
//   {
//     title: 'Redux',
//     url: 'https://redux.org/',
//     author: ['Dan Abramov', 'Andrew Clark'],
//     num_comments: 2,
//     points: 5,
//     objectId: 1
//   }
// ];

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '12';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null
    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(list) {
    const { hits, page } = list;
    const { searchKey, lists } = this.state;
    const oldHits = lists && lists[searchKey] ? lists[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState(() => {
      return { lists: { ...lists, [searchKey]: { hits: updatedHits, page } } };
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    console.log('fetchSearchTopStories triggered');

    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(response => response.json())
      .then(list => this.setSearchTopStories(list))
      .catch(error =>
        this.setState(() => {
          return { error };
        })
      );
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.lists[searchTerm];
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState(() => {
      return {
        searchKey: searchTerm
      };
    });
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchSubmit(event) {
    event.preventDefault();
    console.log('onSearchSubmit triggered.');
    const { searchTerm } = this.state;
    this.setState(() => {
      return {
        searchKey: searchTerm
      };
    });

    if (this.needsToSearchTopStories(searchTerm)) {
      console.log(searchTerm);
      this.fetchSearchTopStories(searchTerm);
    }
  }

  onDismiss(id) {
    const { lists, searchKey } = this.state;
    const { hits, page } = lists[searchKey];
    const isNotId = item => item.objectID !== id;
    const newList = hits.filter(isNotId);
    this.setState(() => {
      return {
        lists: {
          ...lists,
          [searchKey]: { hits: newList, page }
        }
      };
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    // object destructuring
    const { lists, searchKey, searchTerm, error } = this.state;
    console.log(this.state);
    const page = (lists && lists[searchKey] && lists[searchKey].page) || 0;
    const list = (lists && lists[searchKey] && lists[searchKey].hits) || [];
    // if no data in list, return null
    // if (!list) {
    //   return null;
    // }

    // filtering the list based on search input and then mapping over it to render filtered list (refactored and removed , to ensure server side fitlering)
    // const filteredList = list.hits.filter(item => {
    //   return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    // });

    return (
      <div className="page">
        <div className="interactions">
          {/* Search only handles the search term event */}
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            {/* Passing Search text as child to this component which can be access from this.props in Search component */}
            Search
          </Search>
          {error ? (
            <p>
              Something went wrong. Possible issue with URL or type of search,
              please try again or report the issue.
            </p>
          ) : (
            <div>
              <List list={list} onDismiss={this.onDismiss} />
              <div className="interactions">
                <Button
                  onClick={() =>
                    this.fetchSearchTopStories(searchKey, page + 1)
                  }
                >
                  More
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
