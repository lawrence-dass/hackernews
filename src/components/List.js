import React from 'react';
import Button from './Button';
import propTypes from 'prop-types';
import { sortBy } from 'lodash';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse()
};

const List = ({ list, sortKey, onSort, onDismiss }) => (
  <div className="list">
    {SORTS[sortKey](list).map(item => (
      <div key={item.objectID} className="list-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}> {item.title || 'No Title'}</a>
        </span>
        <span style={{ width: '30%' }}>{item.author}</span>
        <span style={{ width: '10%' }}>{item.num_comments}</span>
        <span style={{ width: '10%' }}>{item.points}</span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => {
              onDismiss(item.objectID);
            }}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

Button.propTypes = {
  onClick: propTypes.func.isRequired,
  className: propTypes.string,
  children: propTypes.node.isRequired
};

export default List;
