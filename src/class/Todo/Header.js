import React, { Component } from 'react';

let propTypes = {
  textVal: PT.string,
  changeTextVal: PT.func,
  addOneItem: PT.func
}
const Header=function (props) {
   let {textVal, changeTextVal, addOneItem} = props;
    
    return (
      <header className="header">
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={textVal}
          onChange={changeTextVal}
          onKeyDown={addOneItem}
        />
      </header>
    );
}

Header.propTypes = propTypes;

export default Header;