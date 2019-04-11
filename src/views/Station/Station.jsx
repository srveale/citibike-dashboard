import React from "react";
import PropTypes from "prop-types";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// @material-ui/core
import queryString from 'query-string';
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

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

import { fetchRecent, fetchRealtime, fetchHourlyAverage, fetchPredictions } from '../../api/api';


import {
  dailySalesChart,
  hour12Chart,
  emailsSubscriptionChart,
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const AvailabilityChart = (data, chart, classes) => (
  <Card chart>
    <CardHeader color="success">
      <ChartistGraph
        className="ct-chart"
        data={data}
        type="Line"
        options={chart.options}
        listener={chart.animation}
      />
    </CardHeader>
    <CardBody>
      <h4 className={classes.cardTitle}>Available Bikes History</h4>
      <p className={classes.cardCategory}>
        How many bikes were available at this station
      </p>
    </CardBody>
  </Card>
);

class Station extends React.Component {
  state = {
    value: 0,
    currentData: {
      availableBikes: 0,
      totalDocks: 0,
      stationName: "No Station Selected",
      latitude: 40.8038654,
      longitude: -73.9559308,
    },
    past2Hours: {
      data: {
        labels: [],
        series: [],
      },
      logs: []
    },
    past12Hours: {
      data: {
        labels: [],
        series: [],
      },
      logs: []
    },
    past24Hours: {
      data: {
        labels: [],
        series: [],
      },
      logs: []
    },
    hourlyAverage: {
      data: {
        labels: ["00:00","03:00","06:00","09:00","12:00","15:00","18:00","21:00"],
        series: [],
      }
    },
    predictions: {},
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    const parsed = queryString.parse(this.props.location.search);
    const stationIdQuery = parsed.station || 72;

    // Get data from citibike realtime API and our API
    const apiResults = await Promise.all([
      fetchRecent(stationIdQuery, 2),
      fetchRecent(stationIdQuery, 12),
      fetchRecent(stationIdQuery, 24),
      fetchRealtime(stationIdQuery),
      fetchHourlyAverage(),
      fetchPredictions(),
    ])
    const [past2Hours, past12Hours, past24Hours, currentData, hourlyAverage, predictions] = apiResults;

    if (currentData) {
      this.setState({
        currentData,
        past2Hours,
        past12Hours,
        past24Hours,
        hourlyAverage,
        predictions,
        isLoading: false,
      })
    } else {
      this.setState({
        past2Hours,
        past12Hours,
        past24Hours,
        hourlyAverage,
        predictions,
        isLoading: false
      })
    }
  }

  // async updateHistory(stationIdQuery, historyDuration) {

  //   const past2Hours = await fetchRecent(stationIdQuery, 2);
  //   this.setState({ past2Hours });
  // }

  render() {
    if (this.state.isLoading) {
      return (
        <div>Loading</div>
      )
    };
    const { classes } = this.props;
    console.log('this.state', this.state)
    const {currentData, predictions} = this.state;
    const mapUrl = "http://b.tile.osm.org/{z}/{x}/{y}.png";

    const parsed = queryString.parse(this.props.location.search);
    const stationIdQuery = parsed.station || 72;

    let emptyChance;

    if (predictions[stationIdQuery]) {
      emptyChance = Math.round(predictions[stationIdQuery]*100) + '%';
    } else {
      emptyChance = "Unknown";
    }

    return (
      <div>
        <h2> {currentData.stationName}</h2>      
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Available Bikes / Station Capacity</p>
                <h3 className={classes.cardTitle}>
                  {currentData.availableBikes}/{currentData.totalDocks}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                  </Danger>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>warning</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Chance that station will be empty 1 hour from now</p>
                <h3 className={classes.cardTitle}>{emptyChance}</h3>
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
            <CustomTabs
              title="Time scale:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "2 hours",
                  tabContent: (
                    AvailabilityChart(this.state.past2Hours.data, dailySalesChart, classes)
                  )
                },
                {
                  tabName: "12 hours",
                  tabContent: (
                    AvailabilityChart(this.state.past12Hours.data, hour12Chart, classes)
                  )
                },
                {
                  tabName: "24 hours",
                  tabContent: (
                    AvailabilityChart(this.state.past24Hours.data, hour12Chart, classes)
                  )
                },
              ]}
            />
          </GridItem>


          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={this.state.hourlyAverage.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Average Daily Availability</h4>
                <p className={classes.cardCategory}>
                  Typical bike availability by hour
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime />
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Map 
              center={[currentData.latitude, currentData.longitude]} 
              zoom={15}
              style={{ width: '100%', height: '300px' }} >
              <TileLayer
                attribution='
                  <a href=\"https://www.mapbox.com/about/maps/\" target=\"_blank\">© Mapbox</a> 
                  <a href=\"http://www.openstreetmap.org/about/\" target=\"_blank\">© OpenStreetMap</a>
                  <a class=\"mapbox-improve-map\" href=\"https://www.mapbox.com/map-feedback/\" target=\"_blank\">
                    Improve this map
                  </a> 
                  <a href=\"https://www.digitalglobe.com/\" target=\"_blank\">© DigitalGlobe</a>'
                url={mapUrl}
              />
              <Marker position={[currentData.latitude, currentData.longitude]}>
                <Popup>
                  <a href={`/admin/station?station=${currentData.id}`}>{currentData.stationName}</a>
                </Popup>
              </Marker>
            </Map>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Station.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Station);
