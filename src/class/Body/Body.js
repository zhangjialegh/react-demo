import { Layout,Menu,Icon,Breadcrumb } from 'antd';
import Login from '../Login/Login';
import Regist from '../Regist/Regist';
import Main from '../Main/Main';
import Forecast from '../Forecast/Forecast';
import Hoursly from '../Hoursly/Hoursly';
import Lifenote from '../Lifenote/Lifenote';
import Citymanage from '../Citymanage/Citymanage';

import {Link,Route} from 'react-router-dom';
const {Content}=Layout;

class Body extends React.Component{

constructor(props){
    super(props)

}
    render(){
        return (
              <Content style={{margin:'0 16px',overflow: 'initial' }}>
               <Breadcrumb style={{margin:'12px 0'}}>
               <Breadcrumb.Item>User</Breadcrumb.Item>
               </Breadcrumb>
               <Breadcrumb ></Breadcrumb>
                 {/* <Route exact path="/" component={Login}></Route>
                 <Route path="/regist" component={Regist}></Route> */}
                 <Route path="/layout/main" component={Main}></Route> 
                 <Route path="/layout/forecast" component={Forecast}></Route>
                 <Route path="/layout/hoursly" component={Hoursly}></Route>
                 <Route path="/layout/lifenote" component={Lifenote}></Route>
                 <Route path="/layout/citymanage" component={Citymanage}></Route>
             </Content>
            
        );
    }
};


export default Body;