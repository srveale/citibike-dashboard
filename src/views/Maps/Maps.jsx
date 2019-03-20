import React from "react";

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const long2tile = (lon,zoom) => (Math.floor((lon+180)/360*Math.pow(2,zoom)));
const lat2tile = (lat,zoom) => (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));

class Maps extends React.Component {
  state = {
    lat: 40.7128,
    lng: -74.0060,
    zoom: 12,
  }

  render() {
    const position = [this.state.lat, this.state.lng]

    console.log('position', position)

    const tilelong = long2tile(this.state.lng, this.state.zoom)
    const tileLat = lat2tile(this.state.lat, this.state.zoom)
    console.log(tilelong, tileLat)
    const url = "http://b.tile.osm.org/{z}/{x}/{y}.png";
    // const url = `https://api.mapbox.com/v4/mapbox.streets/${this.state.zoom}/${tilelong}/${tileLat}@2x.png?access_token=pk.eyJ1Ijoic3J2ZWFsZSIsImEiOiJjanMwdDV5eW4wcjFiNGFtZ3ZjamgxZHU3In0.DIhnZPEkQ_1NwdP4NNbgcA`
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
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}


export default Maps;