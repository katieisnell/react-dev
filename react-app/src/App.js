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
    let txt = this.props.txt
    return (
      <div>
        <h1>{this.state.txt}</h1>
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

const Widget = (props) => {
  return <input type="text" onChange={props.update} />
}

const Button = (props) => {
  return <button>{props.children}</button>
}

App.propTypes = {
  txt: PropTypes.string,
  cat: PropTypes.number.isRequired
}

App.defaultProps = {
  txt: "This is the default txt"
}

export default App