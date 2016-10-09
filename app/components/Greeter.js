import React from 'react'
import config from './config.json';
import styles from './Greeter.scss';
class Greeter extends React.Component{
  render() {
    return (
      <div>
        <span className = {styles.greeter}>欢迎</span>
        <p>你好</p>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter