import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Input, Icon, Button, Popconfirm,message } from 'antd';
import './Citymanage.less';
import getJsonp from '../../assets/script/getJsonp.js';
import weatherCode from '../../assets/script/weatherCode.js';

class EditableCell extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: this.props.value,
    }
    this.handleChange=this.handleChange.bind(this);
    this.check=this.check.bind(this);
  }
  
  handleChange(e)  {
    const value = e.target.value;
    this.setState({ value });
  }
  check() {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  render() {
    const { value } = this.state;
    return (
      <div className="editable-cell">
            <div className="editable-cell-text-wrapper">
              {value || ' '}
            </div>
      </div>
    );
  }
}


class Citymanage extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'city',
      dataIndex: 'city',
      width: '30%',
    }, {
      title: 'weather',
      dataIndex: 'weather',
    }, {
      title: 'temp',
      dataIndex: 'temp',
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          this.state.dataSource.length > 1 ?
          (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
              <a href="#">Delete</a>
            </Popconfirm>
          ) : null
        );
      },
    }];

    this.state = {
      editing:false,
      val:'',
      dataSource: [{
        key: 0,
        city: '',
        weather: '',
        temp: '',
      }],
      // count: 0,
    };
    this.onDelete=this.onDelete.bind(this);
    this.handleAdd=this.handleAdd.bind(this);
    this.onEditEnter=this.onEditEnter.bind(this);
    this.textChange=this.textChange.bind(this);
    this.selectCity=this.selectCity.bind(this);
  }
  
  componentDidMount(){
    
    
    const {city}=this.props;
    
    if(JSON.parse(localStorage.getItem('dataSource'))){
    const dataSource=JSON.parse(localStorage.getItem('dataSource'));
      this.setState({
        dataSource,
      })
      
      return;
    }
    
    // if(JSON.parse(localStorage.getItem('anotherData'))){
    // const localData=JSON.parse(localStorage.getItem('anotherData'));
    //     if(JSON.parse(localStorage.getItem('savecity'))){
    //       city=JSON.parse(localStorage.getItem('savecity'));
    //     }
    // let {realtime}=localData.value[0];
    // let {sendibleTemp,wD,wS,weather}=realtime;
    // const newData = {
    //   key: '0',
    //   city: city,
    //   weather: weather,
    //   temp: sendibleTemp +'℃',
    // };
    // this.setState({
    //   dataSource: [newData],
    // });
    // 
    //   return;
    // }
    
    // let {count}=this.state;
    getJsonp(city,true).then((data) => {
      // if(JSON.parse(localStorage.getItem('savecity'))){
      //   city=JSON.parse(localStorage.getItem('savecity'));
      // }
      // console.log(data);
      let {realtime}=data.value[0];
      let {sendibleTemp,wD,wS,weather}=realtime;
      const newData = {
        key: 0,
        city: city,
        weather: weather,
        temp: sendibleTemp +'℃',
      };
      this.setState({
        dataSource: [newData]
      });
    })
  }

  onDelete  (index,e) {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    localStorage.setItem('dataSource',JSON.stringify([...dataSource]));
    this.setState({ dataSource });
  }
  handleAdd () {
    
    const {editing}=this.state;
    this.setState({
      editing:true
    })
  }
componentDidUpdate(){
  document.querySelector('.addcity-input').focus();
}
onEditEnter(e){
  
  if(e.keyCode===27){
    this.setState({
      editing:false,
    })
    return;
  }
  if(e.keyCode !== 13) return;
  const { val,dataSource,editing } = this.state;
   if(val===''){
     message.warning('The name of city can not be empty!');
     return;
   }
   
  
  getJsonp(val,true).then((data) => {
    let {realtime}=data.value[0];
    let {sendibleTemp,wD,wS,weather}=realtime;
    const newData = {
      key: new Date().getTime(),
      city: val,
      weather: weather,
      temp: sendibleTemp + '℃',
    };
    
    localStorage.setItem('dataSource',JSON.stringify([...dataSource, newData]));
    
    
    this.setState({
      dataSource: [...dataSource, newData],
    });
  })
  this.setState({
    val:'',
    editing:false,
  })
}
  textChange(e){
    this.setState({
      val:e.target.value
    })
  }
  selectCity(selectedRowKeys, selectedRows){
    let {city}=selectedRows[0];
    getJsonp(city,true).then((data) => {
      localStorage.setItem('savecity',JSON.stringify(city));
      localStorage.setItem('anotherData',JSON.stringify(data));
      getJsonp(city).then((data) => {
        localStorage.setItem('mainData',JSON.stringify(data));
      })
    })
  }
  render() {
    const { dataSource,editing,val } = this.state;
    const {textChange,handleAdd,onEditEnter,selectCity}=this;
    const columns = this.columns;
    const {city,changeCity,selectKey}=this.props;
    return (
      <div>
        <div className={editing?"add-container edit":"add-container"}>
        <Button className="editable-add-btn" onClick={handleAdd}>Add</Button>
        <Input size="large" placeholder="请输入城市名" className="addcity-input"
          value={val}
          onChange={textChange}
          onKeyDown={onEditEnter}
        />
        </div>
        <Table rowSelection={{
          type:'radio',
          selectedRowKeys:selectKey,
          onChange(selectedRowKeys, selectedRows){
              changeCity(selectedRowKeys,selectedRows);
            }
        }} showHeader={false} pagination={false} dataSource={dataSource} columns={columns} className="table-list" 
        onRowDoubleClick={(record, index, e) => {
          ;
        }}
        />
      </div>
    );
  }
}

export default Citymanage ;