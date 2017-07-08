import React from 'react';
import ReactDOM from 'react-dom';

import { Row,Col,Slider } from 'antd';
import Picker from './class/Picker';
import './assets/style/index.css';
//https://reacttraining.cn/web/api/StaticRouter/context-object


class App extends React.Component {
  constructor(props) {
    super(props);
    this.gutters={};
    this.colCounts={};
      this.state={
        gutterKey:1,
        colCountKey:2,
      };
      [8, 16, 24, 32, 40, 48].forEach((item,i) => {
        this.gutters[i]=item;
      });
      [2, 3, 4, 6, 8, 12].forEach((item,i) => {
        this.colCounts[i]=item;
      });
      this.onGutterChange=this.onGutterChange.bind(this);
      this.onColCountChange=this.onColCountChange.bind(this);
    }
onGutterChange(gutterKey){
this.setState({gutterKey});
}


onColCountChange(colCountKey){
 this.setState({colCountKey});
}

  render(){
       const {gutterKey,colCountKey}=this.state;
       const cols=[];
       const colCount=this.colCounts[colCountKey];
       let colCode=``;
       for (var i = 0; i < colCount; i++) {
         cols.push(
           <Col lg={{span:6}} md={{span:12}} key={i.toString()}>
           <div className="colff">
             Column
           </div>  
           </Col>
         );
         colCode +=`<Col span={${24/colCount}}/>\n`;
        }
    return (
     <div>
       <div style={{marginBottom:16}}>
         <span style={{marginRight:6}}>Gutter (px)</span>
         <div style={{width:'50%'}}>
           <Slider
           min={0}
           max={Object.keys(this.gutters).length - 1}
           value={gutterKey}
           onChange={this.onGutterChange}
           marks={this.gutters}
           step={null}/>
         </div>
         <span style={{marginRight:6}}>Column Count:</span>
         <div style={{width:'50%'}}>
           <Slider
           min={0}
           max={Object.keys(this.colCounts).length-1}
           value={colCountKey}
           onChange={this.onColCountChange}
           marks={this.colCounts}
           step={null} />
         </div>
       </div>
       <Row gutter={this.gutters[gutterKey]}>{cols}</Row>
 
     </div>
    );
  }
};

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

if(module.hot){
  module.hot.accept();
}

