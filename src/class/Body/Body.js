import { Layout,Menu,Icon,Breadcrumb } from 'antd';
import Main from '../Main/Main';
import Forecast from '../Forecast/Forecast';
import Hoursly from '../Hoursly/Hoursly';
import {Link,Route} from 'react-router-dom';
const {Content}=Layout;
import Lifenote from '../Lifenote/Lifenote';
// const routes={
//     User:['首页']
// }
class Body extends React.Component{

constructor(props){
    super(props)
}
    render(){
        //  let lists=
        return (
              <Content style={{margin:'0 16px',overflow: 'initial' }}>
               <Breadcrumb style={{margin:'12px 0'}}>
               <Breadcrumb.Item>User</Breadcrumb.Item>
               <Breadcrumb.Item><Link to="/"></Link></Breadcrumb.Item>
               </Breadcrumb>
               <Breadcrumb ></Breadcrumb>
               <Route exact path="/" component={Main}></Route> 
               <Route path="/forecast" component={Forecast}></Route>
               <Route path="/hoursly" component={Hoursly}></Route>
               <Route path="/lifenote" component={Lifenote}></Route>
             </Content>
            
        );
    }
};


export default Body;