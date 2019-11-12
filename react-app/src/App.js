import React from 'react';

import PropTypes from 'prop-types'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'This is the state txt'
    }
  }

  update( e ) {
    this.setState({
      txt: e.target.value
    })
  }

  render() {
    // let txt = this.props.txt
    return (
      <div>
        <Title text='My Title'/>
        <Widget update={this.update.bind(this)}/>
        <Button>I <Heart/> React</Button>
      </div>
    )
  }
}

class Heart extends React.Component {
  render() {
    return <span>&hearts;</span>
  }
}

const Title = (props) => {
  return <h1>{props.text}</h1>
}

const Widget = (props) => {
  return <input type="text" onChange={props.update} />
}

const Button = (props) => {
  return <button>{props.children}</button>
}

App.propTypes = {
  txt: PropTypes.string,
  // cat: PropTypes.number.isRequired // Will show the error in the console
}

App.defaultProps = {
  txt: "This is the default txt"
}

Title.propTypes = {
  text(props, propName, component){
    if (!(propName in props)) {
      return new Error(`Missing ${propName}`) // Will throw an error in the console
    } else {
      if (props[propName].length < 6) {
        return new Error(`${propName} is too short, must be bigger than 5 characters`) // Will throw an error in the console
      }
    }
  }
}

export default App