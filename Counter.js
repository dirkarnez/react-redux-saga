/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

class Counter extends React.Component {
  render() {
    return (
      <div>
      <button onClick={this.props.onIncrementAsync}>
        Increment
      </button>
      {' '}
      <button onClick={this.props.onDecrement}>
        To decrement
      </button>
      <hr />
      <div>
        Clicked: {this.props.value} times
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIncrement: () => {
      dispatch({type:'INCREMENT'});
    },
    onIncrementAsync: () => {
      dispatch({type:'MY_HTTP'});
    },
    onDecrement: () => {
      dispatch({type:'DECREMENT'});
    }
  }
}

export default connect(  
  mapStateToProps,
  mapDispatchToProps
)(Counter);

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
};