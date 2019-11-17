import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

  componentDidMount() {
    console.log('App componentDidMount()'); // Shows just after render when the component rendered safely
    console.log('App ' + ReactDOM.findDOMNode(this));
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount()'); // Shows just after the component has unmounted
  }

  render() {
    console.log('App render()');
    return (
      <Buttons>
        <button value='A'>A</button>
        <button value='B'>B</button>
        <button value='C'>C</button>
      </Buttons>
    )
  }
}

class Buttons extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 'None'
    }
  }

  selectItem(selected) {
    this.setState({
      selected
    })
  }

  render() {
    let fn = child => React.cloneElement(child, {
      onClick: this.selectItem.bind(this, child.props.value)
    });
    let items = React.Children.map(this.props.children, fn);
    return (
      <div>
        <h1>You have selected {this.state.selected}</h1>
        {items}
      </div>
    )
  }


}

export default App