import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const style = {
    maxWidth: "750px",
    height: "350px",
    overflowX: "hidden",
    overflowY: "hidden",
    left: '-50%',
};
const containerStyle = {
    maxWidth: "750px",
    height: "350px",
    float: 'left',
};
const textStyle = {
    fontWeight: 'bold'
}
export class HotelMap extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };
    render() {
        const { hotel } = this.props;
        return (
            <Map
                onClick={this.onMapClicked}
                style={style} containerStyle={containerStyle}
                google={this.props.google}
                zoom={15}
                initialCenter={
                    {
                        lat: hotel.lat,
                        lng: hotel.lon
                    }
                }>
                <Marker
                    lat={hotel.lat} lng={hotel.lon}
                    name={hotel.hotelName}
                    address={hotel.address}
                    onClick={this.onMarkerClick}>
                </Marker>
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <p style={textStyle}>
                            {this.state.selectedPlace.name}
                        </p>
                        <p style={textStyle}>
                            {this.state.selectedPlace.address}
                        </p>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper(
    (props) => ({
        apiKey: 'AIzaSyDvq_Ch67gUltcUNpo-yf7NeoUe6fJuq4U'
    }
    ))(HotelMap)
