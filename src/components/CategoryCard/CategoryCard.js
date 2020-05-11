import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { setSelectedServices } from "../../actions/categoryActions";
import { makeStyles } from "@material-ui/core/styles";

const CategoryCard = props => {
  const id = props.category.id;

  const useStyles = makeStyles({
    root: {
      width: 250,
      height: 100,
      minWidth: 205,
      marginLeft: 10,
      cursor: "pointer"
    }
  });
  const classes = useStyles();
  return (
    <div className="testClasa">
      <Card className={classes.root} variant="outlined">
        <img
          className="categories-logo-style"
          src={`/images/logo/${id}.png`}
          alt="[...]"
        />
        <div
          className="testKlasa"
          onClick={() => props.setSelectedServices(props.category.services)}
        >
          <div>
            <CardContent>
              <Typography>
                <p className="category-name">{props.category.name}</p>
              </Typography>

              <Typography>
                <p className="category-length">
                  {props.category.services.length} services
                </p>
              </Typography>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedServices: services => dispatch(setSelectedServices(services))
  };
};

export default connect(null, mapDispatchToProps)(CategoryCard);
