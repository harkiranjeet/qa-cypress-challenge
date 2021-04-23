import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { getMedian } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pending: false,
      value: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.error !== nextProps.error) {
      this.handleError(nextProps.error);
    } else if (nextProps.median !== this.props.median) {
      this.setState({pending: false});
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    var value = this.state.value;
    this.setState({
      pending: true, 
      value: ''
    }, () => {
      this.props.getMedian(value);
    });
  }

  onInputChange(e) {
    this.setState({value: e.target.value});
  }

  renderResult() {
    var className = `${this.props.median.length === 0 || this.state.pending ? 'hidden' : ''}`

    return (
      <h2 className={className}>The median is: [{this.props.median.toString()}]</h2>
    );
  }

  handleError(e) {
    this.setState({pending: false}, () => {
      alert(e.message);
    });
  }

  render() {
    return (
      <div className="mainContainer">
        <h1>Enter a number to get the median of primes:</h1>
        <form action="" onSubmit={(e) => this.onFormSubmit(e)}>
          <input 
            type="number" 
            onChange={(e) => this.onInputChange(e)}
            value={this.state.value} />
          <button 
            disabled={this.state.pending}
            type="submit">Submit</button>
          <FontAwesome
            className={!this.state.pending ? 'loader hidden' : 'loader'}
            name="spinner"
            size="2x"
            spin
          />
        </form>
        {this.renderResult()}
      </div>
    );
  }
}

function mapStateToProps({ median, error }) {
  return { median, error };
}

export default connect(mapStateToProps, { getMedian })(App);