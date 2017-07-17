import React from 'react';
import ReactDOM from 'react-dom';
import { Layout,Menu,Icon,Breadcrumb } from 'antd';
import Login from '../Login/Login';
import Regist from '../Regist/Regist';
import Main from '../Main/Main';
import Forecast from '../Forecast/Forecast';
import Hoursly from '../Hoursly/Hoursly';
import Lifenote from '../Lifenote/Lifenote';
import Citymanage from '../Citymanage/Citymanage';
import Todos from '../Todo/Todos';
import {Link,Route} from 'react-router-dom';
const {Content}=Layout;

class Body extends React.Component{

constructor(props){
    super(props)

}
    render(){
      const {city,changeCity,selectKey}=this.props;
        return (
              <Content style={{margin:'0 16px',overflow: 'initial',padding:'20px 0' }}>
               <Breadcrumb style={{margin:'12px 0'}}>
               <Breadcrumb.Item></Breadcrumb.Item>
               </Breadcrumb>
               <Breadcrumb ></Breadcrumb>
                 {/* <Route exact path="/" component={Login}></Route>
                 <Route path="/regist" component={Regist}></Route> */}
                 <Route path="/layout/main" render={() =><Main city={city} />}></Route> 
                 <Route path="/layout/forecast" render={() =><Forecast city={city} />}></Route>
                 <Route path="/layout/hoursly" render={() =><Hoursly city={city} />}></Route>
                 <Route path="/layout/lifenote" render={() =><Lifenote city={city} />}></Route>
                 <Route path="/layout/citymanage" render={() =><Citymanage city={city} selectKey={selectKey} changeCity={changeCity}/>}></Route>
                 <Route path="/layout/todo" render={() =><Todos />}></Route>
             </Content>
            
        );
    }
};


export default Body;