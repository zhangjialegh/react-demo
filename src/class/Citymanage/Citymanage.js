import React from 'react';
import { Table, Input, Button, Popconfirm,message } from 'antd';
import './Citymanage.less';
import  {getJsonp,cityIds} from '../../assets/script/base.js';

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
  }
  
  componentWillMount(){
    const {city}=this.props;
    if(localStorage.getItem('dataSource')){
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
  
  let { val,dataSource,editing } = this.state;
    val=val.trim();
   if(val ===''){
     message.warning('The name of city can not be empty!');
     return;
   }
   if(val===this.props.city){
     message.warning('The city is existent!');
     return;
   }
   if(localStorage.getItem('dataSource')){
     const dataSource=JSON.parse(localStorage.getItem('dataSource'));
     
     for(let item of dataSource){
       if(val===item.city){
         message.warning('The city is existent!');
         return;
       }
     }
   }
   let flag=false,cityid;
   cityIds.forEach((item,i) => {
     let {countyname,areaid}=item;
     if(val===countyname){
      cityid=areaid;
      flag=true;
     }
   })

if(!flag) {
  message.warning('The city is invalid!');
  return;
}
  
  getJsonp(cityid,true).then((data) => {
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
  render() {
    const { dataSource,editing,val } = this.state;
    const {textChange,handleAdd,onEditEnter}=this;
    const columns = this.columns;
    const {city,changeCity,selectKey}=this.props;
    return (
      <div>
        <div className={editing?"add-container edit-city":"add-container"}>
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