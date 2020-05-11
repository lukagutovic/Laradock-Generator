import React, { Component } from "react";

class Toggle extends Component {
  render() {
    return (
      <div className="toggler-container">
        <label className="switch">
          <input type="checkbox" onChange={this.props.clickAction}/>
          <span className="slider round"></span>
        </label>
      </div>
    );
  }
}

export default Toggle;
