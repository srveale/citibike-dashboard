import React from "react";

import { fetchRecent, fetchRealtime, fetchHourlyAverage } from '../../api/api';


class TripCount extends React.Component {
  state = {
  }

  render() {
    return (
      <iframe src="https://datascience.jimkemper.site:8080/app" style={{"width": "100%", "height": "500px"}}></iframe>
    )
  }
}


export default TripCount;