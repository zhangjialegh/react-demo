// import React from 'react';
// import ReactDOM from 'react-dom';

import { Layout } from 'antd';
const {Sider}=Layout;
import './Layout.less';
import Struct from '../Struct/Struct';
import Side from '../Side/Side';
import {Route} from 'react-router-dom';




//https://reacttraining.cn/web/api/StaticRouter/context-object


class Layouter extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      collapsed:false,
      mode:'inline',
    }
    this.onCollapse=this.onCollapse.bind(this);
  }
  onCollapse(collapsed){
    this.setState({
      collapsed,
      mode:collapsed?'vertical':'inline',
    });
  }
  render(){
    let {collapsed,mode}=this.state;
    let {onCollapse}=this;
    return (
        <Layout style={{height:'100vh'}}>
          <Side
          collapsed={collapsed}
          onCollapse={onCollapse}
          mode={mode}
          />
          <Struct/>
        </Layout>
    );
  }
};
export default Layouter;