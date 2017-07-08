import React from 'react';
import ReactDOM from 'react-dom';

import { Affix,Button } from 'antd';
import './assets/style/index.css';

//https://reacttraining.cn/web/api/StaticRouter/context-object

class Demo extends React.Component{
  render(){
    return (
      <div className="scrollable-container" ref={(node) => {
        this.container=node;
      }}>
        <div className="background">
          <Affix target={() => 
            this.container
          }>
          <Button type="primary">
            Fixed at the top
          </Button>
          </Affix>
        </div>
      </div>
    );
  }
};


ReactDOM.render(
    <Demo />,
  document.getElementById('root')
);

if(module.hot){
  module.hot.accept();
}

