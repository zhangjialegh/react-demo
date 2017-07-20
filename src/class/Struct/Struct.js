import React from 'react';
import ReactDOM from 'react-dom';

import { Layout } from 'antd';
import Head from '../Head/Head';
import Body from '../Body/Body';
import Foot from '../Foot/Foot';
import Notification from '../Notification/Notification';
//https://reacttraining.cn/web/api/StaticRouter/context-object


class Struct extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const {city,changeCity,selectKey,outLoggedin}=this.props;
    return (
          <Layout style={{height:'100vh',overflowY:'auto'}}>
            <Notification 
            city={city}
            />
            <Head 
            city={city}
            changeCity={changeCity}
            outLoggedin={outLoggedin}
            />
            <Body 
            city={city}
            selectKey={selectKey}
            changeCity={changeCity}
            /> 
            {/* <Foot /> */}
          </Layout>
    );
  }
};
export default Struct;