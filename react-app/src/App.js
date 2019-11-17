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
      <Parent>
        <div className='childA'></div>
        <div className='childB'></div>
      </Parent>
    )
  }
}

class Parent extends React.Component {
  render() {
    console.log(this.props.children);
    let children = this.props.children.map(child => child); // Throws an error if we have <= 1 child

    /* Below are different ways to map the children and check some information about them */
    // let children = React.Children.map(this.props.children, child => child);
    // let children = React.Children.toArray(this.props.children);
    // let children = React.Children.forEach(this.props.children, child => console.log(child.props.className)); 
    // let children = React.Children.only(this.props.children); // Throws an error if we have more than 1 child
    
    console.log(children);
    return null;
  }
}

export default App