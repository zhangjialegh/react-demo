
import { Layout,Menu,Icon,Breadcrumb } from 'antd';
import Login from '../Login/Login';
import Regist from '../Regist/Regist';
import Main from '../Main/Main';
import Forecast from '../Forecast/Forecast';
import Hoursly from '../Hoursly/Hoursly';
import Lifenote from '../Lifenote/Lifenote';
import Citymanage from '../Citymanage/Citymanage';
import Todos from '../Todo/Todos';
import Notfound from '../Notfound/Notfound';
import Proceed from '../Proceed/Proceed';
import {Link,Route,Redirect} from 'react-router-dom';
const {Content}=Layout;

class Body extends React.Component{

constructor(props){
    super(props)
 this.state={
   flag:'',
   todos:[]
 }
 this.updateTodos=this.updateTodos.bind(this);
}
updateTodos(todos){
  this.setState({
    todos
  })
}
    render(){
      const {city,changeCity,selectKey}=this.props;
      const {todos}=this.state;
      const {updateTodos}=this;
        return (
              <Content style={{margin:'10px 16px',position:'relative'}}>
                 <Route path="/main" render={() =><Main city={city} />}></Route> 
                 <Route path="/forecast" render={() =><Forecast city={city} />}></Route>
                 <Route path="/hoursly" render={() =><Hoursly city={city} />}></Route>
                 <Route path="/lifenote" render={() =><Lifenote city={city} />}></Route>
                 <Route path="/citymanage" render={() =><Citymanage city={city} selectKey={selectKey} changeCity={changeCity}/>}></Route>
                 <Route path="/todo" render={() =><Todos updateTodos={updateTodos}/>}></Route>
                 <Route path="/proceed" render={() => <Proceed todos={todos}/>}/>
             </Content>
            
        );
    }
};


export default Body;