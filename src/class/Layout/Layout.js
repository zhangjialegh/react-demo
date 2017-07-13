import React from 'react';
import ReactDOM from 'react-dom';

import { Layout } from 'antd';
const {Sider}=Layout;
import './Layout.css';
import Struct from '../Struct/Struct';
import Side from '../Side/Side';
import {Route} from 'react-router-dom';




//https://reacttraining.cn/web/api/StaticRouter/context-object


class Layouter extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render(){
    const {city,changeCity,selectKey,outLoggedin}=this.props;
    return (
        <Layout style={{height:'100vh'}}>
          <Side />
          <Struct 
          outLoggedin={outLoggedin}  
          city={city}
          selectKey={selectKey}
          changeCity={changeCity}
          />
        </Layout>
    );
  }
};
export default Layouter;