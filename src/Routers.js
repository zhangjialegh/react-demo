import React from 'react';
import ReactDOM from 'react-dom';

// import { Layout,Menu,Icon } from 'antd';
// const {Sider}=Layout;
// const SubMenu=Menu.SubMenu;
import './assets/style/index.css';
import Layouter from './class/Layout/Layout';
import Regist from './class/Regist/Regist';
import Login from './class/Login/Login';
import Page from './Page';
import {BrowserRouter as Router,Route,IndexRedirect,Switch} from 'react-router-dom';
// import {IndexRedirect} from 'react-router';
//https://reacttraining.cn/web/api/StaticRouter/context-object
class Routers extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <Router>
        <Switch>
        {/* <Route exact path="/" component={Page}></Route> */}
          <Route exact path='/' component={Login}/>
          <Route path="/regist" component={Regist}/>
          <Route path="/layout" component={Layouter} />
        </Switch>
      </Router>
    );
  }
};
export default Routers;