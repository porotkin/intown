import {Group, Header, Avatar} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import GeoButton from "./GeoButton";
import bridge from "@vkontakte/vk-bridge";

class Gmap extends React.Component {
    constructor (props) {
        super(props);
        this.state ={GeoLocation: {lat:39,long:39}}
        this.state = {
            places: [],
        };
    }
    componentDidMount() {
        fetch('places.json')
            .then((response) => response.json())
            .then((data) => this.setState({ places: data.results }));
    }
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };
    getGeo = () => {bridge.send('VKWebAppGetGeodata')
        .then(data=> {this.setState({disabled:true,GeoLocation:data});this.defaultProps={ center: {
            lat: 100,
            lng: 100
        },
        zoom: 11}})
    }
    render () {
        return (
            <Group style={{
                height: '65vh', width: '95%' ,
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCA-CWX9xnTnxGmzIxkH_WIsGUrdeRI444' }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                    </GoogleMapReact>
                <GeoButton onClick={this.getGeo}/>

            </Group>
        )
    }
}
export default Gmap