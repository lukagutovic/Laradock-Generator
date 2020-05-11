import React, { Component } from "react";
import { connect } from "react-redux";
import { updateService } from "../../actions/serviceActions";
import cloneDeep from "lodash/cloneDeep";
import Link from "@material-ui/core/Link";

const customStyleCategories = {
  display: "flex"
};

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: this.props.service,
      variables: this.props.variables
    };
    console.log(this.props.service.description, "description");
    console.log(this.props.service.id, "ID ");
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState(prevState => {
      return {
        variables: {
          ...prevState.variables,
          [key]: value
        }
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const clonedService = cloneDeep(this.state.service);
    clonedService.variables.map(variable => {
      variable["value"] = this.state.variables[variable.name]
        ? this.state.variables[variable.name]
        : variable.default_value;
    });
    console.log("SERVICE: ", clonedService);
    this.props.updateService(clonedService);
  }

  setDefaultValue(name) {
    const defaultValue = this.state.service.variables.find(
      variable => variable.name === name
    ).default_value;
    console.log(defaultValue, " defVal <-");
    this.setState(prevState => {
      return {
        variables: {
          ...prevState.variables,
          [name]: defaultValue
        }
      };
    });
  }

  render() {
    const variableInputs = Object.keys(this.state.variables).map(variable => {
      return (
        <div key={variable} className="main-wrapper">
          <div className="port-style-div">
            <div key={variable}>
              <label className="label-style">{variable}</label>
              <br />
              <div className="wrapper-style">
                <div className="input-wrapper">
                  <div className="input-style">
                    <input
                      className="input-style position"
                      name={variable}
                      value={this.state.variables[variable]}
                      onChange={event => this.handleChange(event)}
                    />
                    <input
                      className="button-set-to-default position"
                      type="button"
                      value="set to default"
                      onClick={() => this.setDefaultValue(variable)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="short-explanation">
              Set the port at which {variable} will run. Usually it's set <br />
              to default, but can be any port. This is the port you'll <br />
              need to configure in Laravel (if you change it from <br />
              default) and any other apps accessing the <br />
              database.
            </p>
          </div>
        </div>
      );
    });
    return (
      <div className="main-card-wrapper">
        <div className="main-card" style={customStyleCategories}>
          <div className="container">
            <Link href={"/"}>
              <p className="back-arrow-style">
                <i class="fas fa-arrow-left"></i>BACK
              </p>
            </Link>
            <div className="description-style">
              <h1>{this.props.service.name}</h1>
              <img
                className="service-logo-style"
                src={`/images/${this.props.service.id}.png`}
                alt="[...]"
              />
              <div className="service-description-style">
                {this.props.service.description}
              </div>
            </div>

            <div className="save-button-style">
              <input type="submit" value="Save" />
            </div>

            <form onSubmit={event => this.handleSubmit(event)}>
              {variableInputs}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { categoryId, serviceId } = ownProps.match.params;

  const foundCategoryIndex = state.categories.findIndex(
    category => category.id === categoryId
  );
  const foundServiceIndex = state.categories[
    foundCategoryIndex
  ].services.findIndex(service => service.id === serviceId);

  const service =
    state.categories[foundCategoryIndex].services[foundServiceIndex];
  const variables = {};
  service.variables.map(variable => {
    variables[variable.name] = "";
  });
  return {
    service: service,
    variables: variables
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateService: service => dispatch(updateService(service))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);
