import React from "react";

import { fetchRecent, fetchRealtime, fetchHourlyAverage } from '../../api/api';


class TripCount extends React.Component {
  state = {
  }

  render() {
    return (
      <iframe src="https://162.246.156.30:8080/" style={{"width": "100%", "height": "500px"}}></iframe>
    )
  }
}


export default TripCount;