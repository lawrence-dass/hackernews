import React, { Component } from 'react';
import classNames from 'classnames';
import { sortBy } from 'lodash';

// Local imports
import Button from './Button';
import sortArrows from '../assets/icons/select-arrows.svg';

// sorting function
const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
  const sortClass = classNames('button-inline', {
    'button-active': sortKey === activeSortKey
  });

  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
    </Button>
  );
};

// object of function for sorting
const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse()
};

class Table extends Component {
  constructor(props) {
    super(props);
    // table component state
    this.state = {
      sortKey: 'NONE',
      isSortReverse: false
    };

    this.onSort = this.onSort.bind(this);
  }

  // sort trigger
  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const { list, onDismiss } = this.props;

    const { sortKey, isSortReverse } = this.state;
    // const for sorted list with sort function
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <span>
            <Sort
              sortKey={'TITLE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Title <img src={sortArrows} alt="sort" />
            </Sort>
          </span>
          <span>
            <Sort
              sortKey={'AUTHOR'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Author <img src={sortArrows} alt="sort" />
            </Sort>
          </span>
          <span>
            <Sort
              sortKey={'COMMENTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Comments <img src={sortArrows} alt="sort" />
            </Sort>
          </span>
          <span>
            <Sort
              sortKey={'POINTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Points <img src={sortArrows} alt="sort" />
            </Sort>
          </span>
          <span>Archive</span>
        </div>
        {reverseSortedList.map(item => (
          <div key={Math.random(item.objectID)} className="table-row">
            <span>
              <a className="post-title" href={item.url}>
                {item.title || 'N/A'}
              </a>
            </span>
            <span>{item.author || 'N/A'}</span>
            <span>{item.num_comments || 'N/A'}</span>
            <span>{item.points || 'N/A'}</span>
            <span>
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-inline post-dismiss"
              >
                Dismiss
              </Button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Table;
