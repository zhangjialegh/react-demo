// import React from 'react';
// import ReactDOM from 'react-dom';

import { Layout } from 'antd';
// import './assets/style/index.css';
import Head from '../Head/Head';
import Body from '../Body/Body';
import Foot from '../Foot/Foot';

//https://reacttraining.cn/web/api/StaticRouter/context-object


class Struct extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
          <Layout style={{height:'100vh'}}>
            <Head />
            <Body /> 
            <Foot />
          </Layout>
    );
  }
};
export default Struct;