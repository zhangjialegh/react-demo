import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import './Citymanage.less';
import getJsonp from '../../assets/script/getJsonp.js';
import weatherCode from '../../assets/script/weatherCode.js';

class EditableCell extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: this.props.value,
      editable: false,
    }
    this.handleChange=this.handleChange.bind(this);
    this.check=this.check.bind(this);
    this.edit=this.edit.bind(this);
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
  edit ()  {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
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
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'name')}
        />
      ),
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
      city:'北京',
      editing:false,
      val:'',
      dataSource: [{
        key: '-1',
        city: '',
        weather: '',
        temp: '',
      }],
      count: 0,
    };
    this.onCellChange=this.onCellChange.bind(this);
    this.onDelete=this.onDelete.bind(this);
    this.handleAdd=this.handleAdd.bind(this);
    this.onEditEnter=this.onEditEnter.bind(this);
    this.textChange=this.textChange.bind(this);
    this.changeCity=this.changeCity.bind(this);
  }
  
  componentDidMount(){
    
    
    if(JSON.parse(localStorage.getItem('dataSource'))){
    const dataSource=JSON.parse(localStorage.getItem('dataSource'));
      this.setState({
        dataSource,
        count:dataSource.length
      })
      
      return;
    }
    
    if(JSON.parse(localStorage.getItem('anotherData'))){
    const localData=JSON.parse(localStorage.getItem('anotherData'));
        if(JSON.parse(localStorage.getItem('savecity'))){
          city=JSON.parse(localStorage.getItem('savecity'));
        }
    let {realtime}=localData.value[0];
    let {sendibleTemp,wD,wS,weather}=realtime;
    const newData = {
      key: '0',
      city: city,
      weather: weather,
      temp: sendibleTemp +'℃',
    };
    console.log([newData]);
    this.setState({
      dataSource: [newData],
      count: 1,
    });
    
      return;
    }
    
    let {city,count}=this.state;
    getJsonp(city,true).then((data) => {
      if(JSON.parse(localStorage.getItem('savecity'))){
        city=JSON.parse(localStorage.getItem('savecity'));
      }
      // console.log(data);
      let {realtime}=data.value[0];
      let {sendibleTemp,wD,wS,weather}=realtime;
      const newData = {
        key: count,
        city: city,
        weather: weather,
        temp: sendibleTemp +'℃',
      };
      console.log([newData]);
      this.setState({
        dataSource: [newData],
        count: count + 1,
      });
    })
  }
  onCellChange  (index, key)  {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }
  onDelete  (index) {
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

onEditEnter(e){
  if(e.keyCode !== 13 && e.keyCode !== 27) return;
  let {val} = this.state;
  const { count, dataSource,editing } = this.state;

  getJsonp(val,true).then((data) => {
    console.log(data);
    let {realtime}=data.value[0];
    let {sendibleTemp,wD,wS,weather}=realtime;
    const newData = {
      key: count,
      city: val,
      weather: weather,
      temp: sendibleTemp + '℃',
    };
    
    localStorage.setItem('dataSource',JSON.stringify([...dataSource, newData]));
    
    
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
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
  changeCity(record, index, e){
    let {city}=record;
    getJsonp(city,true).then((data) => {
      localStorage.setItem('savecity',JSON.stringify(city));
      localStorage.setItem('anotherData',JSON.stringify(data));
      getJsonp(city).then((data) => {
        console.log(data);
        localStorage.setItem('mainData',JSON.stringify(data));
      })
    })
  }
  render() {
    const { dataSource,editing,val } = this.state;
    const {textChange,handleAdd,onEditEnter,changeCity}=this;
    const columns = this.columns;
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
        <Table showHeader={false} pagination={false} dataSource={dataSource} columns={columns} className="table-list" 
        onRowClick={(record, index, e) => {
          changeCity(record, index, e);
        }}
        />
      </div>
    );
  }
}

export default Citymanage ;