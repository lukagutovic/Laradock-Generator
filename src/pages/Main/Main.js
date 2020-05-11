import React from "react";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { connect } from "react-redux";
import {
  findMostPopular,
  searchServices,
  changeIsActive
} from "../../actions/categoryActions";
import Grid from "@material-ui/core/Grid";
import cloneDeep from "lodash/cloneDeep";
import Toggle from "../../components/toggle/Toggle";

const Main = props => {
  const customStyleCategories = {
    display: "flex"
  };

  const customStyleServices = {
    display: "flex",
    flexWrap: "wrap"
  };

  let active = true;

  const categories = props.mostPopular.map(category => {
    return <CategoryCard category={category} key={category.id} />;
  });
  // ---------------------------------------------------
  const services = props.searchResult
    // .filter(service => service.variables.length > 0)
    .map(service => (
      <ServiceCard
        serviceId={service.id}
        categoryId={service.category_id}
        key={service.id}
      />
    ));

  let fileData = [];
  const categoriesClone = cloneDeep(props.allCategories);
  categoriesClone.map(category => {
    let filteredServices = category.services.filter(
      service => service.active === true
    );
    filteredServices = filteredServices.map(service => {
      const parsedVariables = service.variables.map(variable => {
        if (!Object.hasOwnProperty("value")) {
          variable["value"] = variable.default_value;
        }
        return variable;
      });
      service.variables = parsedVariables;
      return service;
    });
    category.services = filteredServices;

    if (category.services.length > 0) {
      fileData.push(category);
    }
  });


  return (
    <div className="main-card-wrapper">
      <div className="main-card" style={customStyleCategories}>
        <Grid item xs={12} sm={6}>
          <h2>Choose services</h2>
          <input
            className="search-input-style"
            type="text"
            name="search"
            placeholder="Search services"
            onChange={event =>
              props.searchServices(event.target.value, props.isActive)
            }
          />
        </Grid>
        <div className="toogle-holder">
          <Toggle className="toggle-switcher-component" clickAction={() => {
                    props.changeIsActive();
                    props.searchServices("", active);
                  }}/>
          <p className="toggle-component">Show only selected</p>
        </div>
        <div className="button-wrapper">
          <Grid item xs={12} sm={6} className="box-style">
            <div className="button-wrapper">
              {/* <div className="button1-style">
                <button
                  onClick={() => {
                    props.changeIsActive();
                    props.searchServices("", active);
                  }}
                >
                  {props.isActive ? "Only active" : "Search all"}
                </button>
              </div> */}
              <div className="button2-style">
                <button
                  className="download-button"
                  variant="contained"
                  color="primary"
                >
                  <a
                    href={
                      "data:text/json;charset=utf-8," + JSON.stringify(fileData)
                    }
                    download="test.txt"
                  >
                    {" "}
                    Download .env{" "}
                  </a>
                </button>
              </div>
            </div>
          </Grid>
        </div>
      </div>

      <div className="most-popular-categories">
        <h2>Most popular</h2>
        <Grid container spacing={1}>
          {categories}
        </Grid>
      </div>

      <div className="services-style">
        <h2>Databases</h2>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} style={customStyleServices}>
            {services}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    allCategories: state.categories,
    mostPopular: state.mostPopular,
    selectedServices: state.selectedServices,
    searchResult: state.searchResult,
    isActive: state.isActive
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findMostPopular: () => dispatch(findMostPopular()),
    searchServices: (searchText, isActive) =>
      dispatch(searchServices(searchText, isActive)),
    changeIsActive: () => dispatch(changeIsActive())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
