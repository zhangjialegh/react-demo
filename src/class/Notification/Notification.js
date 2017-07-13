import React from 'react';
import ReactDOM from 'react-dom';
import { notification } from 'antd';
import './Notification.css';
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
  componentDidMount(){
   const {city}=this.props;
   this.popNotification(city);
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
