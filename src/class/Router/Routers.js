import React from 'react';
import '../../assets/style/index.less';
import Layouter from '../Layout/Layout';
import Regist from '../Regist/Regist';
import Login from '../Login/Login';
import Notfound from '../Notfound/Notfound';

import {HashRouter as Router,Route,Switch,Redirect,IndexRoute} from 'react-router-dom';
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

    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() =>(login?(<Redirect from="/" to="/main" />):(<Redirect from="/" to="/login" />))} />
          <Route path="/regist" component={Regist}/>
          <Route path="/login" render={() =>(login?(<Redirect from="/" to="/main" />):(<Login loggedIn={loggedIn}/>))} />
          <Route path="/404" component={Notfound} />
          
          <Route path="/:id" render={(matchProps) => (
            login?(<Layouter city={city} {...matchProps} selectKey={selectKey} outLoggedin={outLoggedin} changeCity={changeCity}/>):(<Redirect to="/login"/>)
          )} />
        </Switch>
      </Router>
    );
  }
};
export default Routers;