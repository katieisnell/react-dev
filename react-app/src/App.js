import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'This is the state txt',
      currentEvent: '?',
      a: '',
      b: '',
      c: '',
      d: ''
    }
    this.update = this.update.bind(this)
  }

  update( e ) {
    this.setState({
      txt: e.target.value,
      currentEvent: e.type,
      a: this.refs.a.value,
      b: this.b.value,
      c: ReactDOM.findDOMNode(this.c).value,
      d: this.d.refs.input.value
    })
  }

  render() {
    // let txt = this.props.txt
    return (
      <div>
        <Title text='My Title'/>
        <hr/>

        <Widget update={this.update.bind(this)}/>
        <Button>I <Heart/> React</Button>
        <hr/>

        <div>
          <textarea
            onKeyPress={this.update}
            onCut={this.update}
            onCopy={this.update}
            onPaste={this.update}
            onFocus={this.update} // When clicking inside the box
            onBlur={this.update} // When clicking outside the box
            onDoubleClick={this.update}
            onTouchStart={this.update} // On touch screens, triggered when clicking on the corner draggable bit
            onTouchMove={this.update} // On touch screens, triggered when moving using the corner draggable bit
            onTouchEnd={this.update} // On touch screens, triggered when finished dragging the corner draggable bit
            rows={5}/>
          <h1>{this.state.currentEvent}</h1>
        </div>
        <hr/>

        <div>
          <input
            ref='a'
            type='text'
            onChange={this.update.bind(this)}
          /> {this.state.a}
          <br/>
          <input
            ref={ node => this.b = node}
            type='text'
            onChange={this.update.bind(this)}
          /> {this.state.b}
          <br/>
          <Input
            ref={ component => this.c = component }
            update={this.update.bind(this)}
          /> {this.state.c}
          <br/>
          <InputDiv
            ref={ component => this.d = component }
            update={this.update.bind(this)}
          /> {this.state.d}
        </div>




        <hr/>
      </div>
    )
  }
}

class Heart extends React.Component {
  render() {
    return <span>&hearts;</span>
  }
}

class Input extends React.Component {
  render() {
    return <input type='text' onChange={this.props.update}/>
  }
}

class InputDiv extends React.Component {
  render() {
    return <div><input ref='input' type='text' onChange={this.props.update}/></div>
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