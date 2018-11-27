import React, { Component } from 'react';
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
  render() {
    return (
      <div className="App">
        <h2>
          {list.map(item => (
            <div key={item.objectId}>
              <span>
                <a href={item.url}> {item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </div>
          ))}
        </h2>
      </div>
    );
  }
}

export default App;
