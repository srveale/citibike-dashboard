import axios from 'axios';
import moment from 'moment';

export function fetchRealtime (stationIdQuery) {
	return axios.get('https://cors-anywhere.herokuapp.com/https://feeds.citibikenyc.com/stations/stations.json')
	.then(realtimeResult => {
		if (stationIdQuery) {
			return realtimeResult.data.stationBeanList.filter(station => String(station.id) === String(stationIdQuery))[0];
		} else {
			return realtimeResult.data.stationBeanList;
		}
	})
}

export function fetchRecent (stationIdQuery) {
	return axios.get(`https://cors-anywhere.herokuapp.com/http://162.246.156.121/api/recent-data?${stationIdQuery ? `stationid=${String(stationIdQuery)}` : ""}`)
	.then(pastTwoHoursResult => {
		const pastTwoHours = {
		  data: {
		    series: [pastTwoHoursResult.data.map(log => log.availableBikes)],
		    labels: pastTwoHoursResult.data.map(log => moment(log.executionTime).add(-6, 'hours').format('h:mm')) 
		  },
		  logs: pastTwoHoursResult.data,
		};
		return pastTwoHours;
	})
}

export function fetchWeather () {
	return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=41&lon=-74&appid=516a3b4a9edf4219fe0e86d9c6ae1965`)
	.then(weatherResult => {
		return weatherResult.data;
	})
}

export function fetchHourlyAverage (stationIdQuery) {
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
