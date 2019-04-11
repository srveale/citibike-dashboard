import React from "react";
import PropTypes from "prop-types";
import queryString from 'query-string';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general.jsx";

import { fetchRecent, fetchRealtime, fetchWeather, fetchPredictions } from '../../api/api';



import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const toFahrenheit = (kelvin) => {
  return Math.round(kelvin * 9/5 - 459.67, 0)
}

class Dashboard extends React.Component {
  state = {
    value: 0,
    currentData: [],
    pastTwoHours: {
      data: {
        labels: [],
        series: [],
      },
      logs: []
    },
    weatherData: {
      main: {},
      weather: [{}],
    },
    isLoading: true,
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    const parsed = queryString.parse(this.props.location.search);
    const stationIdQuery = parsed.station;

    // Get data from citibike realtime API and our API
    const apiResults = await Promise.all([fetchRecent(stationIdQuery), fetchRealtime(), fetchWeather(), fetchPredictions()])
    const [pastTwoHours, currentData, weatherData, predictions] = apiResults;


    this.setState({
      currentData,
      pastTwoHours,
      weatherData,
      predictions,
      isLoading: false,
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>Loading</div>
      )
    }
    const { classes } = this.props;
    const { currentData, pastTwoHours, weatherData, predictions } = this.state;
    const inServiceStations = currentData.filter(station => {
      return station.statusValue === "In Service" && station.availableDocks > 0;
    });
    const currentEmptyStations = inServiceStations.filter(station => station.availableBikes === 0);

    const predictedEmptyStations = Object.values(predictions).filter(pred => pred > 0.5 )
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Empty Stations</p>
                <h3 className={classes.cardTitle}>
                  {currentEmptyStations.length}/{currentData.length}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Stations predicted to be empty in 1 hour</p>
                <h3 className={classes.cardTitle}>{predictedEmptyStations.length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  More info
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Current Weather</h4>
                <p className={classes.cardCategoryWhite}>
                  {String(new Date())}
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableData={[
                    ["Conditions", weatherData.weather[0].description, "", ""],
                    ["Temperature (°F)", 
                      "current: " + String(toFahrenheit(weatherData.main.temp)),
                      "high: " + String(toFahrenheit(weatherData.main.temp_max)),
                      "low: " + String(toFahrenheit(weatherData.main.temp_min))],
                    ["Windspeed (m/s)", String(weatherData.wind.speed), "", ""],
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <img 
              style={{"width":"100%", "height": "100%"}}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/USDOT_highway_sign_bicycle_symbol_-_black.svg/1280px-USDOT_highway_sign_bicycle_symbol_-_black.svg.png"
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
