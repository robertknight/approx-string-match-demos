import React, { Component } from 'react';
import './App.css';
import AutomatonTable from './AutomatonTable';
import DynamicProgrammingTable from './DynamicProgrammingTable';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'four score and seven',
      pattern: 'annd',
      maxErrors: 3,
      method: 'dynamic-programming',
    };
  }

  render() {
    const { text, pattern, maxErrors, method } = this.state;

    const setText = (e) => this.setState({ text: e.target.value });
    const setPattern = (e) => this.setState({ pattern: e.target.value });
    const setMaxErrors = (e) => this.setState({
      maxErrors: parseInt(e.target.value, 10) || 0,
    });
    const setMethod = (e) => this.setState({
      method: e.target.value,
    });

    return (
      <div className="App">
        <h2>Approximate String Search Demos</h2>
        <p className="App-intro">
          This playground illustrates different methods for locating
          occurences of a <i>pattern</i> in a <i>text</i> allowing for
          some number of errors.
        </p>
        <form className="App-settings-form">
          <span className="App-settings-form-item">
            <label htmlFor="text">Text: </label>
            <input name="text" type="text" onInput={setText} value={text} />
          </span>
          <span className="App-settings-form-item">
            <label htmlFor="pattern">Pattern: </label>
            <input name="pattern" type="text" onInput={setPattern} value={pattern} />
          </span>
          <span className="App-settings-form-item">
            <label htmlFor="maxErrors">Max errors: </label>
            <input name="maxErrors" type="text" onInput={setMaxErrors} value={maxErrors} />
          </span>
          <span className="App-settings-form-item">
            <label htmlFor="method">Method: </label>
            <select name="method" onInput={setMethod}>
              <option value="dynamic-programming">Dynamic programming</option>
              <option value="automaton">NFA Automaton</option>
            </select>
          </span>
        </form>
        {method === 'dynamic-programming' && <DynamicProgrammingTable text={text} pattern={pattern} maxErrors={maxErrors} />}
        {method === 'automaton' && <AutomatonTable text={text} pattern={pattern} maxErrors={maxErrors} />}
      </div>
    );
  }
}

export default App;
