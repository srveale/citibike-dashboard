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
	return axios.get(`http://162.246.156.121/api/recent-data?${stationIdQuery ? `stationid=${String(stationIdQuery)}` : ""}`)
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
