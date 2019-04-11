import React from "react";

import { fetchRecent, fetchRealtime, fetchHourlyAverage } from '../../api/api';


class TripCount extends React.Component {
  state = {
  	appURL: "https://datascience.jimkemper.site:8080/app",
  }

  updateYear(appURL) {
  	this.setState({ appURL });
  } 

  render() {
    return (
    	<div>
	    	<a href="#" onClick={() => this.updateYear("https://datascience.jimkemper.site:8080/app2016")} class="active">2016  </a>
	    	<a href="#" onClick={() => this.updateYear("https://datascience.jimkemper.site:8080/app2017")}>2017  </a>
	    	<a href="#" onClick={() => this.updateYear("https://datascience.jimkemper.site:8080/app")}>2018</a>
	      <iframe src={this.state.appURL} style={{"width": "100%", "height": "500px"}}></iframe>
	     </div>
    )
  }
}


export default TripCount;