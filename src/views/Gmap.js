import {Group} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React from 'react';
import GeoButton from "./GeoButton";
import bridge from "@vkontakte/vk-bridge";
import GoogleMapReact from 'google-map-react';
import Marker from '../panels/Marker'

class Gmap extends React.Component {
    constructor (props) {
        super(props);
        this.state = {geoLocation: null}
    }
    static defaultProps = {
        center:{
            lat:30,
            lng:30
        },
        zoom: 11
    };
    FriendsCoordinates

    getGeo = async () =>  {
        await bridge.send('VKWebAppGetGeodata')
        .then(data => {
            this.setState({
                geoLocation: {
                    lat:data.lat,
                    lng:data.long,
                }
            })
        });
    }

    render () {
        if (this.state.geoLocation)
            this.FriendsCoordinates = [
                {name: 'Michael Porotkin', lat: this.state.geoLocation.lat-1 , lng: this.state.geoLocation.lng},
                {name: 'Some One', lat: this.state.geoLocation.lat, lng: this.state.geoLocation.lng+1}
        ];
        return (
            <Group style={{
                height: '65vh', width: '95%',
                marginLeft: "auto",
                marginRight: "auto"
            }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCA-CWX9xnTnxGmzIxkH_WIsGUrdeRI444' }}
                center={this.state.geoLocation ? this.state.geoLocation : this.props.center}
                zoom={this.props.zoom}
            >
                {this.state.geoLocation ? <Marker lat={this.state.geoLocation.lat} lng={this.state.geoLocation.lng} name={'Artem Buslaev'}/>:''}
                {this.FriendsCoordinates ? this.FriendsCoordinates.map((Friend) => {
                    return <Marker lat={Friend.lat} lng={Friend.lng} name={Friend.name}/>}):''}
            </GoogleMapReact>
            <GeoButton onClick={this.getGeo}/>
            </Group>
        )
    }
}
export default Gmap