import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { changeActiveStatus } from "../../actions/serviceActions";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Toggle from "../toggle/Toggle";

const ServiceCard = props => {
  const id = props.service.id;

  return (
    <Card className="card-wrapper-category-card" variant="outlined">
      <div>
        <img className="service-images" src={`/images/${id}.png`} alt="..." />
        <CardContent>
          <div className="service-name-with-toggle">
            <Typography className="title-category-card">
              {props.service.name}
            </Typography>
            <Toggle
              clickAction={() =>
                props.changeActiveStatus(
                  props.service.category_id,
                  props.service.id
                )
              }
            >
              {props.service.active ? "Turn OFF" : "Turn ON"}{" "}
            </Toggle>
          </div>
          <Typography variant="body">
            {props.service.description.slice(0, 200)}...
          </Typography>
        </CardContent>
      </div>
      <div>
        <CardActions>
          <Link
            className="button-style-service-card"
            to={`/service/${props.service.category_id}/${props.service.id}`}
          >
            <span>Configure</span>
          </Link>
        </CardActions>
      </div>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  const foundCategoryIndex = state.categories.findIndex(
    category => category.id === ownProps.categoryId
  );
  const foundServiceIndex = state.categories[
    foundCategoryIndex
  ].services.findIndex(service => service.id === ownProps.serviceId);

  return {
    service: state.categories[foundCategoryIndex].services[foundServiceIndex]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeActiveStatus: (categoryId, serviceId) =>
      dispatch(changeActiveStatus(categoryId, serviceId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceCard);
