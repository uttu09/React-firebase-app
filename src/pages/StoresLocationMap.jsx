import React, { Component } from 'react';
import firebase from 'firebase';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { Backdrop, CircularProgress } from '@material-ui/core';

const mapStyles = {
    width: '100%',
    height: '100%',
    position: 'relative'
};

export class StoresLocationMap extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('stores');
        this.unsubscribe = null;
        this.state = {
            loading: true,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            coordinates: [
                {
                    store_name: '',
                    cord: {}
                }
            ],
        }
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    onCollectionUpdate = (querySnapshot) => {
        const coordinateList = [];
        querySnapshot.forEach(obj => {
            const { store_name, lat, long } = obj.data();
            let objCoord = { lat: lat, lng: long };
            coordinateList.push({
                name: store_name,
                cord: objCoord
            })
            this.setState({
                coordinates: coordinateList,
                loading: false
            })
        });
    }

    fetchMarkers = () => {
        return this.state.coordinates.map((item) => {
            return (
                <Marker
                    onClick={(obj, marker, e) => this.onMarkerClick(obj, marker, e)}
                    name={item.name}
                    position={item.cord}
                />
            )
        })
    }

    onMarkerClick = (props, marker, e) => {
        console.log("Props :", props)
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loading ?
                 <Backdrop style={{ zIndex: 1000,color: '#fff'}} open={this.state.loading}>
                    <CircularProgress color="#1c1c1c" />
                </Backdrop> :
                    <Map
                        className={'map'}
                        google={this.props.google}
                        zoom={6}
                        style={mapStyles}
                        initialCenter={
                            {
                                lat: 10.435344335545,
                                lng: -13.34334534544
                            }
                        }
                        >
                        {this.fetchMarkers()}

                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={(obj) => this.onClose(obj)}
                        >
                            <div>
                                <h4>{this.state.selectedPlace.name}</h4>
                            </div>
                        </InfoWindow>
                    </Map>}
            </React.Fragment>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD1gToABojHGrZWrTgCVb94UVIrOSPPopM'
})(StoresLocationMap);