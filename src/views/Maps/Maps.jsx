import React from "react";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import queryString from 'query-string';
import L from 'leaflet';
import Icon from './Icon';
import ReactDOMServer from 'react-dom/server';

import { fetchRecent, fetchRealtime, fetchHourlyAverage } from '../../api/api';


class Maps extends React.Component {
  state = {
    lat: 40.7128,
    lng: -74.0060,
    zoom: 14,
    loading: true,
    currentData: {
      logs: [],
    },
    isLoading: true,
  }

  async componentDidMount(){
    const parsed = queryString.parse(this.props.location.search);
    const stationIdQuery = parsed.station;

    const apiResults = await Promise.all([fetchRecent(stationIdQuery), fetchRealtime()]);
    const [pastTwoHours, currentData] = apiResults;

    this.setState({
      pastTwoHours,
      currentData,
      isLoading: false
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>Loading</div>
      )
    }

    const position = [this.state.lat, this.state.lng]
    const url = "http://b.tile.osm.org/{z}/{x}/{y}.png";
    const stations = this.state.currentData;
    console.log('stations', stations)
    return (
      <Map center={position} zoom={this.state.zoom} style={{ width: '100%', height: '800px' }}>
        <TileLayer
          attribution='
            <a href=\"https://www.mapbox.com/about/maps/\" target=\"_blank\">© Mapbox</a> 
            <a href=\"http://www.openstreetmap.org/about/\" target=\"_blank\">© OpenStreetMap</a>
            <a class=\"mapbox-improve-map\" href=\"https://www.mapbox.com/map-feedback/\" target=\"_blank\">
              Improve this map
            </a> 
            <a href=\"https://www.digitalglobe.com/\" target=\"_blank\">© DigitalGlobe</a>'
          url={url}
        />
        { stations.map(station => {
          const perc = Math.round(station.availableBikes / station.totalDocks * 100)
          const icon = L.divIcon({
            className: 'custom-icon',
            html: ReactDOMServer.renderToString(<Icon perc={perc} availableBikes={station.availableBikes} totalDocks={station.totalDocks}/>)
          });
          const stationLocation = [station.latitude, station.longitude];
          return (
            <Marker position={stationLocation} key={station.id} icon={icon}>
              <Popup style={{color:"red"}}>
                <a href={`/admin/station?station=${station.id}`}>{station.stationName}</a>
              </Popup>
            </Marker>
          )
        })
        }
      </Map>
    )
  }
}


export default Maps;