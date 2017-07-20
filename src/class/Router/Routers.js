import React from 'react';
import ReactDOM from 'react-dom';

import { notification } from 'antd';
// const {Sider}=Layout;
// const SubMenu=Menu.SubMenu;
import '../../assets/style/index.css';
import Layouter from '../Layout/Layout';
import Regist from '../Regist/Regist';
import Login from '../Login/Login';
import Notfound from '../Notfound/Notfound';
// import Page from './Page';
import {HashRouter as Router,Route,Switch,Redirect,IndexRoute} from 'react-router-dom';
// import {IndexRedirect} from 'react-router';
//https://reacttraining.cn/web/api/StaticRouter/context-object
class Routers extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      cityName:'北京',
      selectKey:[0],
      login:false,
    }
    this.changeCity=this.changeCity.bind(this);
    this.loggedIn=this.loggedIn.bind(this);
    this.outLoggedin=this.outLoggedin.bind(this);
  }
  componentWillMount(){
    if(localStorage.getItem('login')){
      const {login}=JSON.parse(localStorage.getItem('login'))
      if(localStorage.getItem('cityKey')){
        const {city,selectKey}=JSON.parse(localStorage.getItem('cityKey'))
        this.setState({
          cityName:city,
          login,
          selectKey
        })
        return;
      }
      this.setState({
        login
      })
    }
  }
  loggedIn(){
    this.setState({login:true});
    localStorage.setItem('login',JSON.stringify({login:true}))
  }
  outLoggedin(){
    this.setState({login:false});
    localStorage.setItem('login',JSON.stringify({login:false}))
  }
  changeCity(selectKey,obj){
    
    let {city}=obj[0];
    localStorage.setItem('cityKey',JSON.stringify({city,selectKey}));
    this.setState({
      cityName:city,
      selectKey
    })
  }
  render(){
    const {cityName,selectKey,login}=this.state;
    const {changeCity,addressprev,loggedIn,outLoggedin}=this;
    const city=cityName;
    console.log(city);
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() =>(login?(<Redirect from="/" to="/layout/main"/>):(<Login loggedIn={loggedIn}/>))} />
          {/* <Redirect from='/' to='/login' />
          <Route path='/login' render={() => <Login loggedIn={loggedIn} />} /> */}
          <Route path="/regist" component={Regist}/>
          <Route path="/layout/:id" render={() => (
            login?(<Layouter city={city} selectKey={selectKey} outLoggedin={outLoggedin} changeCity={changeCity}/>):(<Redirect to="/"/>)
          )} />
          {/* <Redirect to="/404" /> */}
          {/* <Route path='/404' component={Notfound} /> */}
          
          <Route path='/404' component={Notfound} />
          <Redirect from='*' to='/404' />
        </Switch>
      </Router>
    );
  }
};
export default Routers;