import React from 'react';
import ReactDOM from 'react-dom';
import { notification } from 'antd';
import './Notification.less';
import getJsonp from '../../assets/script/getJsonp';

class Notification extends React.Component {
  constructor(props){
    super(props)
    this.state={
      city:'',
    }
    this.popNotification=this.popNotification.bind(this);
  }
  
  popNotification(city){
    getJsonp(city).then((data) => {
      const {alerts}=data;
      if(alerts.length>0){
        notification['warning']({
          message:alerts[0].title,
          description:alerts[0].detail,
          duration:null
        })
      }
    })
  }
  componentWillMount(){
   const {city}=this.props;
   setTimeout(() => {
     this.popNotification(city);
   },500)
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.city !== nextProps.city){
      this.popNotification(nextProps.city);
    }
  }
  render() {
    return(
      <div></div>
    )  
  }
}
export default Notification;
