
import { Layout } from 'antd';
import './Layout.less';
import Side from '../Side/Side';
import Head from '../Head/Head';
import Foot from '../Foot/Foot';
import Notification from '../Notification/Notification';
import Main from '../Main/Main';
import Forecast from '../Forecast/Forecast';
import Hoursly from '../Hoursly/Hoursly';
import Lifenote from '../Lifenote/Lifenote';
import Citymanage from '../Citymanage/Citymanage';
import Todos from '../Todo/Todos';
import Notfound from '../Notfound/Notfound';
import Proceed from '../Proceed/Proceed';
import {Route,Redirect,Switch} from 'react-router-dom';

const {Content}=Layout;

class Layouter extends React.Component{
  constructor(props) {
    super(props);
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
    const {city,changeCity,selectKey,outLoggedin}=this.props;
    const {todos}=this.state;
    const {updateTodos}=this;
    return (
        <Layout style={{height:'100vh'}}>
          <Side match={this.props.match}/>
          <Layout style={{height:'100vh',overflowY:'auto'}}>
            <Notification 
            city={city}
            />
            <Head 
            city={city}
            changeCity={changeCity}
            outLoggedin={outLoggedin}
            />
            <Content style={{margin:'10px 16px',position:'relative'}}>
              <Switch>
                <Route path="/main" render={() =><Main city={city} />}></Route> 
                <Route path="/forecast" render={() =><Forecast city={city} />}></Route>
                <Route path="/hoursly" render={() =><Hoursly city={city} />}></Route>
                <Route path="/lifenote" render={() =><Lifenote city={city} />}></Route>
                <Route path="/citymanage" render={() =><Citymanage city={city} selectKey={selectKey} changeCity={changeCity}/>}></Route>
                <Route path="/todo" render={() =><Todos updateTodos={updateTodos}/>}></Route>
                <Route path="/proceed" render={() => <Proceed todos={todos}/>}/>
                <Redirect from={`${this.props.match.url}`} to="/404" />
              </Switch>
           </Content>
            {/* <Foot /> */}
          </Layout>
        </Layout>
    );
  }
};
export default Layouter;