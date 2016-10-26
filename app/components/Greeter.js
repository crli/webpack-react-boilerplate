import React, { Component }from 'react'
import $ from 'jquery';
import styles from './Greeter.scss';

class Greeter extends Component{
  constructor(props){
      super(props);
      this.state = {
        liked: false,
        value: "crlin"
      }
    }
    handleClick(){
      this.setState({
        liked: !this.state.liked
      })
    }
    handleChange(event){
      this.setState({
        value: event.target.value
      })
    }
    render(){
      let text = this.state.liked ? 'like' : 'haven\'t liked',
          value = this.state.value;
      return (   
        <div> 
          <p onClick={this.handleClick.bind(this)}>You {text} this. Click to toggle.</p>
          <input type="text" value={value} onChange={this.handleChange.bind(this)} />
          <p>{value}</p>
        </div>
      );
    }
}

export default Greeter;