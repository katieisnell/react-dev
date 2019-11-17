import React from 'react';
import ReactDOM from 'react-dom';

import './App.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '/* Add your JSX here */',
      output: '',
      error: ''
    }
    this.update = this.update.bind(this)
  }

  update( e ) {
    let code = e.target.value;
    try {
      this.setState({
        output: window.Babel
          .transform(code, { presets: ['es2015', 'react']})
          .code, err: ''
      })
    } catch (err) {
      this.setState({
        err: err.message
      })
    }
  }

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
      <div>
        <header>{this.state.err}</header>
        <div className='container'>
          <textarea 
            onChange={this.update.bind(this)}
            defaultValue={this.state.input}/>
            <pre>
              {this.state.output}
            </pre>
        </div>
      </div>
    )
  }
}

export default App