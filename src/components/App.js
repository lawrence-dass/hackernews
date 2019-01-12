import React, { Component } from 'react';
import axios from 'axios';

// Local imports
import Search from './Search';
import Table from './Table';
import Button from './Button';
import pageLoading from '../assets/images/post-loader.gif';
import bulb from '../assets/icons/lightbulb.svg';
import './App.scss';
import {
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from '../constants';

// function for caching hits with search keys
const updateSearchTopStoriesState = (hits, page) => prevState => {
  const { searchKey, results } = prevState;
  // checks if the result exits or not
  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  // creating updateHits with old and new hits
  const updatedHits = [...oldHits, ...hits];

  // return object with udpated hits and setting loading to false
  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: '',
      error: null,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false
    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  // function to chekc wheather API call needs to made or not
  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  // updating the state with updated hits
  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  // function to make API call
  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });

    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  // intial fetching of the top stories
  fetchInitialTopStories(page = 0) {
    this.setState({ isLoading: true });
    axios(
      `${PATH_BASE}${PATH_SEARCH}?tags=story&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchInitialTopStories();
  }

  // updating state with search input
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // search submit after a check
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  // post dismiss function
  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  render() {
    const { searchTerm, results, searchKey, error, isLoading } = this.state;

    // setting up page value
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;

    // setting up hits
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <div className="header">
            <div className="header__logo">
              <img src={bulb} alt="" /> Hacker News Project
            </div>
            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}
            >
              Search
            </Search>
          </div>
        </div>
        {error ? (
          <div className="interactions">
            <p>Something went wrong.</p>
          </div>
        ) : (
          <Table list={list} onDismiss={this.onDismiss} />
        )}
        <div className="interactions">
          <ButtonWithLoading
            className="more-btn"
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>

        {!isLoading && (
          <footer>
            Created By{' '}
            <a
              href="https://lawrenced.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lawrence
            </a>
          </footer>
        )}
      </div>
    );
  }
}

// loading component
const Loading = () => (
  <div>
    <img src={pageLoading} alt="page/post loading " />
  </div>
);

// HOC for condition rendering of button
const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component {...rest} />;

// Button component
const ButtonWithLoading = withLoading(Button);

export default App;
