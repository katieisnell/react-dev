import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

const HOC = (InnerComponent) => class extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    }
  }

  update() {
    this.setState({
      count: this.state.count + 1
    })
  }
  componentDidMount() {
    console.log('HOC componentDidMount()');
  }

  render() {
    return (
      <InnerComponent
        {...this.props} // Need this to pass the props through to the component
        {...this.state}
        update={this.update.bind(this)}
      />
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'This is the state txt',
      currentEvent: '?',
      a: '',
      b: '',
      c: '',
      d: '',
      val: 0,
      items: []
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
      d: this.d.refs.input.value,
      val: this.state.val + 1
    })
  }

  componentDidMount() {
    console.log('App componentDidMount()'); // Shows just after render when the component rendered safely
    console.log('App ' + ReactDOM.findDOMNode(this));
    // this.inc = setInterval(this.update, 500);

    fetch('https://swapi.co/api/people/?format=json')
      .then(response => response.json())
      .then(({ results: items }) => this.setState({ items }));
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount()'); // Shows just after the component has unmounted
    // clearInterval(this.inc); // Make sure to clean up
  }

  filter(e) {
    this.setState({
      filter: e.target.value
    });
  }

  render() {
    console.log('App render()');
    // let txt = this.props.txt

    let items = this.state.items;
    if (this.state.filter) {
      items = items.filter(item => item.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    }
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
        <button onClick={this.update}>{this.state.val}</button>
        <hr/>
        <input type='text' onChange={this.filter.bind(this)}/>
        <div>
          {items.map( item => <Person key={item.name} person={item}/>)}
        </div>
        <hr/>
        <div>
          <Button>Button</Button>
          <br/>
          <LabelHOC>Label</LabelHOC>
        </div>
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

class Label extends React.Component {
  componentDidMount() {
    console.log('Label componentDidMount()');
  }

  render() {
    return <label onMouseMove={this.props.update}>{this.props.children} ({this.props.count})</label>
  }
}

const LabelHOC = HOC(Label);

const Title = (props) => {
  return <h1>{props.text}</h1>
}

const Widget = (props) => {
  return <input type="text" onChange={props.update} />
}

const Button = HOC((props) => {
  return <button onClick={props.update}>{props.children} ({props.count})</button>
})

const Person = (props) => {
  return <h4>{props.person.name}</h4>
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