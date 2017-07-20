import React, { Component } from 'react';

import './Todobase.less';
import './Todoindex.less';

import Header from './Header.js';
import ListWrap from './ListWrap.js';
import Footer from './Footer.js';
import {Route} from 'react-router-dom';
class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      textVal: '',
      view: 'all'
    };
    this.toggleItem = this.toggleItem.bind(this);
    this.changeTextVal = this.changeTextVal.bind(this);
    this.addOneItem = this.addOneItem.bind(this);
    this.deleteOneItem = this.deleteOneItem.bind(this);
    this.deleteAllCompleted = this.deleteAllCompleted.bind(this);
    this.toggleAllItem = this.toggleAllItem.bind(this);
    this.changeView = this.changeView.bind(this);
    this.saveEditVal = this.saveEditVal.bind(this);
  }
  componentWillMount(){
    
    if(localStorage.getItem('todos')){
      const todos=JSON.parse(localStorage.getItem('todos'));
      this.setState({todos:todos});
      let {updateTodos}=this.props;
      updateTodos(todos);
    }
  }
  // 修改增加内容的文本
  changeTextVal(e){
    this.setState({
      textVal: e.target.value
    })
  }
  // 增加一条
  addOneItem(e){
    if(e.keyCode !== 13) return;

    let {textVal, todos} = this.state;
    
    if(!(textVal = textVal.trim())) return;
    
    todos.push({
      id: Date.now(),
      text: textVal,
      done: false
    });
    
    this.setState({todos, textVal: ''})
    let {updateTodos}=this.props;
    updateTodos(todos);
  }
  // 删除一条
  deleteOneItem(todoItem){
    let {todos} = this.state;
    
    todos = todos.filter(todo => {
      return todo.id !== todoItem.id;
    });
    
    this.setState({todos});
    let {updateTodos}=this.props;
    updateTodos(todos);
  }
  // 切换完成和未完成
  toggleItem(todoItem){
    let {todos} = this.state;
    todos = todos.map(todo => {
      if(todo.id === todoItem.id){
        todo.done = !todo.done;
      }
      return todo;
    });
    this.setState({todos});
  }
  // 删除所有完成的todo
  deleteAllCompleted(){
    let {todos} = this.state;
    todos = todos.filter(todo => {
      return !todo.done
    });
    this.setState({todos});
    let {updateTodos}=this.props;
    updateTodos(todos);
  }
  // 全部选中或者取消选中的操作
  toggleAllItem(e){
    let {todos} = this.state;
    let {checked} = e.target;
    todos = todos.map(todo => {
      todo.done = checked;
      return todo;
    });
    this.setState({todos});
    let {updateTodos}=this.props;
    updateTodos(todos);
  }
  // 修改显示试图操作
  changeView(view){
    this.setState({view});
  }
  // 保存修改的值
  saveEditVal(todoItem, newText){
    let {todos} = this.state;
    todos = todos.map(todo => {
      if(todo.id === todoItem.id){
        todo.text = newText;
      }
      return todo;
    });
    this.setState({todos});
    let {updateTodos}=this.props;
    updateTodos(todos);
  }

  render() {
    let {todos, textVal, view} = this.state;
    
    let {toggleItem, changeTextVal, addOneItem, deleteOneItem, deleteAllCompleted, toggleAllItem, changeView, saveEditVal} = this;
    localStorage.setItem('todos',JSON.stringify(todos));
    let todoLen = todos.length;
    let showAbleLen = todoLen;
    let [todoWrap, footer] = [null, null];
    
    todos = todos.filter(todo => {
      if(todo.done) todoLen--;
      switch(view){
        case 'all':
          return true;
          break;
        case 'active':
          return !todo.done
          break;
        case 'completed':
          return todo.done
          break;
      }
    });
    
    
    if(showAbleLen){
      todoWrap = (
        <ListWrap
          todos={todos}
          toggleItem={toggleItem}
          deleteOneItem={deleteOneItem}
          todoLen={todoLen}
          toggleAllItem={toggleAllItem}
          saveEditVal={saveEditVal}
        />
      );
      footer = (
        <Footer
          todoLen={todoLen}
          showClearBtn={todoLen < showAbleLen ? true : false}
          deleteAllCompleted={deleteAllCompleted}
          view={view}
          changeView={changeView}
        />
      );
    }
    
    return (
      <div className="todoapp">
        <Header
          textVal={textVal}
          changeTextVal={changeTextVal}
          addOneItem={addOneItem}
        />
        {/* 如果是一个fasle值react都不会进行渲染 */}
        {todoWrap}
        {footer}
        
      </div>
    );
  }

}

export default Todos;