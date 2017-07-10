// import React from 'react';
// import ReactDOM from 'react-dom';

import { Layout,Menu,Icon } from 'antd';
const {Sider}=Layout;
const SubMenu=Menu.SubMenu;
import './assets/style/index.css';
import Head from './class/Head/Head';
import Body from './class/Body/Body';
import Foot from './class/Foot/Foot';
import Side from './class/Side/Side';
import {BrowserRouter as Router} from 'react-router-dom';
//https://reacttraining.cn/web/api/StaticRouter/context-object


class App extends React.Component{
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
      <Router>
        <Layout style={{height:'100vh'}}>
        <Side
        collapsed={collapsed}
        onCollapse={onCollapse}
        mode={mode}
         />
         <Layout style={{height:'100vh'}}>
          <Head />
          <Body /> 
          <Foot />
         </Layout>
      </Layout>
      </Router>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));


