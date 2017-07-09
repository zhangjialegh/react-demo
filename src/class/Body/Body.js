import { Layout,Menu,Icon,Breadcrumb } from 'antd';
import Main from '../Main/Main';
import Forecast from '../Forecast/Forecast';
import Hoursly from '../Hoursly/Hoursly';
const {Content}=Layout;
class Body extends React.Component{

    
    render(){
        return (
            <Content style={{margin:'0 16px',overflow: 'initial' }}>
               <Breadcrumb style={{margin:'12px 0'}}>
               <Breadcrumb.Item>User</Breadcrumb.Item>
               <Breadcrumb.Item>Bill</Breadcrumb.Item>
               </Breadcrumb>
               <Main/>
                {/*<Forecast/> */}
               {/*<Hoursly />*/}
             </Content>
        );
    }
};


export default Body;