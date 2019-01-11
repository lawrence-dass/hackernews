import React, { Component } from 'react';
import axios from 'axios';
import Search from './Search';
import List from './List';
import './App.css';
import Button from './Button';
import propTypes from 'prop-types';

import pageLoading from '../assets/images/post-loader.gif';

import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from '../constants';

const PageLoading = () => {
  return (
    <div>
      <img src={pageLoading} alt="page loading" />
    </div>
  );
};

const PostLoading = () => {
  return (
    <div>
      <img src={pageLoading} alt="post loading" />
    </div>
  );
};

const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <PostLoading /> : <Component {...rest} />;

const ButtonWithLoading = withLoading(Button);

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      lists: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
      sortKey: 'NONE'
    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  setSearchTopStories(list) {
    const { hits, page } = list;
    const { searchKey, lists } = this.state;
    const oldHits = lists && lists[searchKey] ? lists[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState(() => {
      return {
        lists: { ...lists, [searchKey]: { hits: updatedHits, page } },
        isLoading: false
      };
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState(() => {
      return { isLoading: true };
    });
    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(list => this._isMounted && this.setSearchTopStories(list.data))
      .catch(
        error =>
          this._isMounted &&
          this.setState(() => {
            return { error };
          })
      );
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.lists[searchTerm];
  }

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState(() => {
      return {
        searchKey: searchTerm
      };
    });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  onSort(sortKey) {
    this.setState(sortKey => {
      return {
        sortKey
      };
    });
  }

  render() {
    // object destructuring
    const {
      lists,
      searchKey,
      searchTerm,
      error,
      isLoading,
      sortKey
    } = this.state;
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
              <List
                sortKey={sortKey}
                onSort={this.onSort}
                list={list}
                onDismiss={this.onDismiss}
              />
              <div className="interactions">
                {isLoading ? (
                  <PageLoading />
                ) : (
                  <ButtonWithLoading
                    isLoading={isLoading}
                    onClick={() =>
                      this.fetchSearchTopStories(searchKey, page + 1)
                    }
                  >
                    More
                  </ButtonWithLoading>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Button.propTypes = {
  onClick: propTypes.func.isRequired,
  children: propTypes.node.isRequired
};

export default App;
