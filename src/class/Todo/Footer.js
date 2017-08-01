import React, { Component } from 'react';

let propTypes = {
  todoLen: PT.number,
  showClearBtn: PT.bool,
  deleteAllCompleted: PT.func,
  view: PT.oneOf(['all', 'active', 'completed']),
  changeView: PT.func
}
const Footer =function (props) {
  let {todoLen, showClearBtn, deleteAllCompleted, view, changeView} = props;

    let clearBtn = null;
    
    if(showClearBtn){
      clearBtn = (
        <button
          className="clear-completed"
          onClick={deleteAllCompleted}
        >Clear completed</button>
      );
    }
    
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{todoLen}</strong>
          {' '}
          item
          {' '}
          left
        </span>
        <ul className="filters">
          <li>
            <a 
              href="#/todo"
              className={view === 'all' ? 'selected' : ''}
              onClick={() => {
                changeView('all')
              }}
            >All</a>
          </li>
          <li>
            <a 
              href="#/todo/active"
              className={view === 'active' ? 'selected' : ''}
              onClick={() => {
                changeView('active')
              }}
            >Active</a>
          </li>
          <li>
            <a 
              href="#/todo/completed"
              className={view === 'completed' ? 'selected' : ''}
              onClick={() => {
                changeView('completed')
              }}
            >completed</a>
          </li>
        </ul>
        {clearBtn}
      </footer>
    );
}


Footer.propTypes = propTypes;

export default Footer;