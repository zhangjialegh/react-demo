import React from 'react';
import QueueAnim from 'rc-queue-anim';
import './Proceed.less';
import {Icon} from 'antd';
class Proceed extends React.Component {
  constructor(props){
    super(props)
    this.todos=[];
  }
  componentWillMount(){
    if(localStorage.getItem('todos')){
      this.todos=JSON.parse(localStorage.getItem('todos'));
    }
  }
  render() {
    const todos=this.todos;
    let completed=[],active=[];
    let com=0,act=0;
    todos.forEach((item) => {
      if(item.done){
        com++;
        completed.push(<li key={item.id}><Icon type="tag-o" style={{paddingRight:10}} />{item.text}</li>)
      }else{
        act++;
        active.push(<li key={item.id}><Icon type="pushpin-o"  style={{paddingRight:10}} />{item.text}</li>)
      }
    })
    return(
      
    <div className="proceed-container" style={{backgroundImage:`url(${require('../../assets/imgs/bkboard.jpg')})`}}>
      <QueueAnim delay={300} className="demo-content">
        <div key="a" className="demo-thead proceed-finished">
          <p><Icon type="check-circle-o"/><span style={{paddingLeft:5}}>已完成</span> {com}</p>
          <ul>
            {completed}
          </ul>
        </div>
        <div key="b" className="demo-thead proceed-active">
          <p><Icon type="close-circle-o"/><span style={{paddingLeft:5}}>未完成</span> {act}</p>
          <ul>
            {active}
          </ul>
        </div>
       
       
      </QueueAnim>
    </div>
    )
  }
}

export default Proceed;