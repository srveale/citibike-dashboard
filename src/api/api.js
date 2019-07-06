import axios from 'axios';
import moment from 'moment';

export function fetchRealtime (stationIdQuery) {
	return axios.get('https://cors-anywhere.herokuapp.com/https://feeds.citibikenyc.com/stations/stations.json')
	.then(realtimeResponse => {
		if (stationIdQuery) {
			return realtimeResponse.data.stationBeanList.filter(station => String(station.id) === String(stationIdQuery))[0];
		} else {
			return realtimeResponse.data.stationBeanList;
		}
	})
}

export function fetchRecent (stationIdQuery, historyDuration) {
	return {
		data: {
			series: [],
			labels: [],
		}
	}

	// return axios.get(`
	// 	https://cors-anywhere.herokuapp.com/
	// 	http://162.246.156.121/api/recent-data?
	// 	${stationIdQuery ? `stationid=${String(stationIdQuery)}` : ""}&
	// 	${historyDuration ? `historyDuration=${String(historyDuration)}` : ""}
	// 	`)
	// .then(pastTwoHoursResponse => {
	// 	// Format data for use in the chart
	// 	let labels = pastTwoHoursResponse.data.map(log => moment(log.executionTime).add(-6, 'hours').format('h:mm'));
	// 	let series = [pastTwoHoursResponse.data.map(log => log.availableBikes)];
	// 	if (historyDuration === 12) {
	// 		series = [series[0].filter((point, i) => i % 3 === 0)];
	// 		labels = labels.map((label, i) => i % 5 === 0 ? label : "").filter((point, i) => i % 3 === 0);
	// 	}
	// 	if (historyDuration === 24) {
	// 		series = [series[0].filter((point, i) => i % 6 === 0)];
	// 		labels = labels.map((label, i) => i % 30 === 0 ? label : "").filter((point, i) => i % 6 === 0);
	// 	}
	// 	const pastTwoHours = {
	// 	  data: {
	// 	    series,
	// 	    labels
	// 	  },
	// 	  logs: pastTwoHoursResponse.data,
	// 	};
	// 	return pastTwoHours;
	// })
}

export function fetchWeather () {
	return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=41&lon=-74&appid=516a3b4a9edf4219fe0e86d9c6ae1965`)
	.then(weatherResponse => {
		return weatherResponse.data;
	})
}

export function fetchPredictions() {
	return [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		   0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		       0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
		        0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		            0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		             0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	// return axios.get(`https://cors-anywhere.herokuapp.com/http://162.246.156.121/api/predictions`)
	// .then(predictionsResponse => {
	// 	return predictionsResponse.data;
	// })	
}

export function fetchHourlyAverage (stationIdQuery) {
	return {
		data: {
			series: [],
			labels: [
			  "00:00","","",
			  "03:00","","",
			  "06:00","","",
			  "09:00","","",
			  "12:00","","",
			  "15:00","","",
			  "18:00","","",
			  "21:00","","",
			],
		}
	};

	return axios.get(`https://cors-anywhere.herokuapp.com/http://162.246.156.121/api/hourly-averages?${stationIdQuery ? `stationid=${String(stationIdQuery)}` : ""}`)
	.then(hourlyResult => {
		const sortedHours = hourlyResult.data.sort((a, b) => a.hour - b.hour);
		const hourlyAverage = {
			data: {
			  series: [sortedHours.map(hour => hour.avail_bikes)],
			  labels: [
			    "00:00","","",
			    "03:00","","",
			    "06:00","","",
			    "09:00","","",
			    "12:00","","",
			    "15:00","","",
			    "18:00","","",
			    "21:00","","",
			  ], 
			},
		}
		return hourlyAverage;
	})
}
