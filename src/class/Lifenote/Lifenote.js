import React from 'react';
import ReactDOM from 'react-dom';
import { Card,Input,Row,Col,Switch } from 'antd';
import './Lifenote.css';
import getJsonp from '../../assets/script/getJsonp';

class Lifenote extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            city:'北京',
            checked:false,
            value:'',
            indexesData:{
                pp:'',
                gm:'',
                xc:'',
                ct:'',
                uv:'',
                yd:'',
            },
            realtimeData:{
              sD:'',
              wD:'',
              wS:'',
              weather:'',
              temp:'',
            }
        }
        this.renderData=this.renderData.bind(this);
        this.switchChange=this.switchChange.bind(this);
    }

    componentWillMount(){
      const {city}=this.props;
      
      // if(localStorage.getItem('anotherData')){
      //     const localData=JSON.parse(localStorage.getItem('anotherData'));
      //       
      //       if(JSON.parse(localStorage.getItem('savecity'))){
      //         console.log('读取到本地数据了anotherData');
      //         city=JSON.parse(localStorage.getItem('savecity'));
      //       }
      //       
      //       
      //       let {indexes,realtime}=localData.value[0];
      //       this.renderData(city,indexes,realtime);
      //       return;
      //      }
      
      
          //  if(JSON.parse(localStorage.getItem('savecity'))){
          //    console.log('读取到本地数据了anotherData');
          //    city=JSON.parse(localStorage.getItem('savecity'));
          //  }
          //  
           
       getJsonp(city,true).then((data) => {
          //  console.log(data);
          // localStorage.setItem('anotherData',JSON.stringify(data));

           let {indexes,realtime}=data.value[0];
           this.renderData(city,indexes,realtime);
       })
    }
    renderData(city,indexes,realtime){
    //   let {indexesData,realtimeData}=this.state;
      
      //-----------生活小贴士--------------------
      let pp,gm,xc,ct,uv,yd;
       pp={
           content:indexes[0].content,
           level:indexes[0].level,
           name:indexes[0].name,
       }
       gm={
           content:indexes[1].content,
           level:indexes[1].level,
           name:indexes[1].name,
       }
       xc={
           content:indexes[2].content,
           level:indexes[2].level,
           name:indexes[2].name,
       }
       ct={
           content:indexes[3].content,
           level:indexes[3].level,
           name:indexes[3].name,
       }
       uv={
           content:indexes[4].content,
           level:indexes[4].level,
           name:indexes[4].name,
       }
       yd={
           content:indexes[5].content,
           level:indexes[5].level,
           name:indexes[5].name,
       }
      let indexesData={pp,gm,xc,ct,uv,yd};
       
       //-----------天气状况-------------------
       let {sD,wD,wS,temp,weather}=realtime;
       
       let realtimeData={sD,wD,wS,temp,weather};
       //-----------------------------------
    this.setState({indexesData,realtimeData});   

    }
    switchChange(checked,value){
     this.setState({
       checked:!checked,
       value
     })
    }
    render(){
        let {switchChange}=this;
        let {indexesData,realtimeData,checked,value}=this.state;
        const {city}=this.props;
        console.log(city);
        let {pp,gm,xc,ct,uv,yd}=indexesData,
            {sD,wD,wS,temp,weather}=realtimeData;
        return (
            <div>
                <Row type="flex" justify="space-around" align="center" className="indexes">
                <Col md={8} sm={12} xs={24} className="indexes-box">
                    <Switch size="small" 
                      checked={value==1&&checked}
                      className="ex-switch"
                      onChange={(checked,value=1) => {
                        switchChange(!checked,value);
                      }}
                    />
                    <div className={checked&&value==1?"indexes-item indexeshide":"indexes-item"}>
                        <img src={require('../../assets/imgs/cosmetic.png')} />
                        <p>{pp.name}</p>
                        <h1>{pp.level}</h1>
                    </div>
                    <div className={checked&&value==1?"indexes-info indexesshow":"indexes-info"} >
                        <h1>{pp.level}</h1>
                        <p>{pp.content}</p>
                        <div>
                            <div>
                              <h3>{city}</h3>
                              <p>湿度 {sD}%</p>
                              <p>温度 {temp}℃</p>
                              <p>风力风向 {wD} {wS}</p>
                            </div>
                            <img src={require('../../assets/imgs/cosmetic.png')} />
                        </div>
                    </div>
                </Col>
                <Col md={8} sm={12} xs={24} className="indexes-box">
                  <Switch size="small" 
                    checked={value==2&&checked}
                    className="ex-switch"
                    onChange={(checked,value=2) => {
                      switchChange(!checked,value);
                    }}
                  />
                    <div className={checked&&value==2?"indexes-item indexeshide":"indexes-item"}>
                        <img src={require('../../assets/imgs/fever.png')} />
                        <p>{gm.name}</p>
                        <h1>{gm.level}</h1>
                    </div>
                    <div className={checked&&value==2?"indexes-info indexesshow":"indexes-info"} >
                        <h1>{gm.level}</h1>
                        <p>{gm.content}</p>
                        <div>
                            <div>
                              <h3>{city}</h3>
                              <p>天气状况 {weather}</p>
                              <p>温度 {temp}℃</p>
                              <p>风力风向 {wD} {wS}</p>
                            </div>
                            <img src={require('../../assets/imgs/fever.png')} />
                        </div>
                    </div>
                    
                </Col>
                <Col md={8} sm={12} xs={24} className="indexes-box">
                  <Switch size="small" 
                    checked={value==3&&checked}
                    className="ex-switch"
                    onChange={(checked,value=3) => {
                      switchChange(!checked,value);
                    }}
                  />
                    <div className={checked&&value==3?"indexes-item indexeshide":"indexes-item"}>
                        <img src={require('../../assets/imgs/washcar.png')} />
                        <p>{xc.name}</p>
                        <h1>{xc.level}</h1>
                    </div>
                    <div className={checked&&value==3?"indexes-info indexesshow":"indexes-info"} >
                        <h1>{xc.level}</h1>
                        <p>{xc.content}</p>
                        <div>
                            <div>
                              <h3>{city}</h3>
                              <p>天气状况 {weather}</p>
                              <p>风力风向 {wD} {wS}</p>
                            </div>
                            <img src={require('../../assets/imgs/washcar.png')} />
                        </div>
                    </div>
                </Col>
                <Col md={8} sm={12} xs={24} className="indexes-box">
                  <Switch size="small" 
                    checked={value==4&&checked}
                    className="ex-switch"
                    onChange={(checked,value=4) => {
                      switchChange(!checked,value);
                    }}
                  />
                    <div className={checked&&value==4?"indexes-item indexeshide":"indexes-item"}>
                        <img src={require('../../assets/imgs/clothes.png')} />
                        <p>{ct.name}</p>
                        <h1>{ct.level}</h1>
                    </div>
                    <div className={checked&&value==4?"indexes-info indexesshow":"indexes-info"} >
                        <h1>{ct.level}</h1>
                        <p>{ct.content}</p>
                        <div>
                            <div>
                              <h3>{city}</h3>
                              <p>天气状况 {weather}</p>
                              <p>温度 {temp}℃</p>
                              <p>风力风向 {wD} {wS}</p>
                            </div>
                            <img src={require('../../assets/imgs/clothes.png')} />
                        </div>
                    </div>
                </Col>
                <Col md={8} sm={12} xs={24} className="indexes-box">
                  <Switch size="small" 
                    checked={value==5&&checked}
                    className="ex-switch"
                    onChange={(checked,value=5) => {
                      switchChange(!checked,value);
                    }}
                  />
                    <div className={checked&&value==5?"indexes-item indexeshide":"indexes-item"}>
                        <img src={require('../../assets/imgs/zwx.png')} />
                        <p>{uv.name}</p>
                        <h1>{uv.level}</h1>
                    </div>
                    <div className={checked&&value==5?"indexes-info indexesshow":"indexes-info"} >
                        <h1>{uv.level}</h1>
                        <p>{uv.content}</p>
                        <div>
                            <div>
                              <h3>{city}</h3>
                              <p>天气状况 {weather}</p>
                              <p>温度 {temp}℃</p>
                              <p>风力风向 {wD} {wS}</p>
                            </div>
                            <img src={require('../../assets/imgs/zwx.png')} />
                        </div>
                    </div>
                </Col>
                <Col md={8} sm={12} xs={24} className="indexes-box">
                  <Switch size="small" 
                    checked={value==6&&checked}
                    className="ex-switch"
                    onChange={(checked,value=6) => {
                      switchChange(!checked,value);
                    }}
                  />
                    <div className={checked&&value==6?"indexes-item indexeshide":"indexes-item"}>
                        <img src={require('../../assets/imgs/sport.png')} />
                        <p>{yd.name}</p>
                        <h1>{yd.level}</h1>
                    </div>
                    <div className={checked&&value==6?"indexes-info indexesshow":"indexes-info"} >
                        <h1>{yd.level}</h1>
                        <p>{yd.content}</p>
                        <div>
                            <div>
                              <h3>{city}</h3>
                              <p>天气状况 {weather}</p>
                              <p>温度 {temp}℃</p>
                              <p>风力风向 {wD} {wS}</p>
                            </div>
                            <img src={require('../../assets/imgs/sport.png')} />
                        </div>
                    </div>
                </Col>
            </Row>    
            </div>
        );
    }
};

export default Lifenote;