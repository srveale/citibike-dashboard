import React from "react";

import { fetchRecent, fetchRealtime, fetchHourlyAverage } from '../../api/api';

const appURLs = {
	2016: "https://datascience.jimkemper.site:8080/app2016",
	2017: "https://datascience.jimkemper.site:8080/app2017",
	2018: "https://datascience.jimkemper.site:8080/app"
}

class TripCount extends React.Component {
  state = {
  	year: 2018,
  }

  updateYear(year) {
  	this.setState({ year });
  }

  render() {
    return (
    	<div>
	    	{this.state.year !== 2016 && <a href="#" onClick={() => this.updateYear(2016)}>2016  </a>}
	    	{this.state.year !== 2017 && <a href="#" onClick={() => this.updateYear(2017)}>2017  </a>}
	    	{this.state.year !== 2018 && <a href="#" onClick={() => this.updateYear(2018)}>2018  </a>}
	    	<h3>Showing total trip counts for {this.state.year}</h3>
	      <iframe src={appURLs[this.state.year]} style={{"width": "100%", "height": "500px"}}></iframe>
	     </div>
    )
  }
}


export default TripCount;