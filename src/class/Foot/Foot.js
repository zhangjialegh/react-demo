import React from 'react';
import ReactDOM from 'react-dom';
import { Layout,Menu,Icon,Breadcrumb } from 'antd';
const {Footer}=Layout;
class Foot extends React.Component{
    render(){
        return (
            <Footer style={{textAlign:'center'}}>
               Ant Design &copy;2016 Created by Ant UED
           </Footer>
        );
    }
};


export default Foot;