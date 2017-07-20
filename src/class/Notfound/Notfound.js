import React from 'react';
import img from '../../assets/imgs/404.png';
import './Notfound.less';

class NotFound extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        animated: ''
    };
    this.enter=this.enter.bind(this);
  }
    
    enter(){
        this.setState({animated: 'hinge'})
    };
    render() {
      const {animated}=this.state;
      const {enter}=this;
        return (
            <div className="center" style={{height: '100%'}}>
                <img src={img} alt="404" className={`animated swing ${animated}`} onMouseEnter={enter} />
            </div>
        )
    }
}

export default NotFound;