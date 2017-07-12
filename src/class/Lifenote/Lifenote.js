import axios from 'axios';
import { Card,Input,Row,Col } from 'antd';
import './Lifenote.less';
import getJsonp from '../../assets/script/getJsonp';

class Lifenote extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            city:'北京',
            indexes:{
                pp:'',
                gm:'',
                xc:'',
                ct:'',
                uv:'',
                yd:'',
            }
        }
        this.renderData=this.renderData.bind(this);
    }

    componentWillMount(){
       getJsonp('北京',true).then((data) => {
           console.log(data);
           let {indexes}=data.value[0];
           this.renderData(indexes);
       })
    }
    renderData(indexes){
      let {pp,gm,xc,ct,uv,yd}=this.state.indexes;

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
       indexes={pp,gm,xc,ct,uv,yd};
    this.setState({indexes});   

    }
    render(){
        let {pp,gm,xc,ct,uv,yd}=this.state.indexes;
      console.log(pp.name,gm,xc,ct,uv,yd);
        return (
            <div>
                <Row type="flex" justify="space-around" align="center" className="indexes">
                <Col md={8} sm={12} xs={24}>
                    <div className="indexes-item">
                        <img src={require('../../assets/imgs/cosmetic.png')} />
                        <p>{pp.name}</p>
                        <h1>{pp.level}</h1>
                    </div>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <div className="indexes-item">
                        <img src={require('../../assets/imgs/fever.png')} />
                        <p>{gm.name}</p>
                        <h1>{gm.level}</h1>
                    </div>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <div className="indexes-item">
                        <img src={require('../../assets/imgs/washcar.png')} />
                        <p>{xc.name}</p>
                        <h1>{xc.level}</h1>
                    </div>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <div className="indexes-item">
                        <img src={require('../../assets/imgs/clothes.png')} />
                        <p>{ct.name}</p>
                        <h1>{ct.level}</h1>
                    </div>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <div className="indexes-item">
                        <img src={require('../../assets/imgs/zwx.png')} />
                        <p>{uv.name}</p>
                        <h1>{uv.level}</h1>
                    </div>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <div className="indexes-item">
                        <img src={require('../../assets/imgs/sport.png')} />
                        <p>{yd.name}</p>
                        <h1>{yd.level}</h1>
                    </div>
                </Col>
            </Row>    
            </div>
        );
    }
};

export default Lifenote;