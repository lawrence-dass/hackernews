import React from 'react';

class List extends React.Component {
  render() {
    const { filteredList, onDismiss } = this.props;
    return (
      <h2>
        {filteredList.map(item => (
          <div key={item.objectId}>
            <span>
              <a href={item.url}> {item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => {
                  onDismiss(item.objectId);
                }}
              >
                Dismiss
              </button>
            </span>
          </div>
        ))}
      </h2>
    );
  }
}

export default List;
