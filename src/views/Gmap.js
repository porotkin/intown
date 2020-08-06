import {Group, Header, Avatar} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React, { Component } from 'react';
import GeoButton from "./GeoButton";
import bridge from "@vkontakte/vk-bridge";
import GoogleMapReact from 'google-map-react';
import Marker from '../panels/Marker'
import SimpleCell from "@vkontakte/vkui/dist/components/SimpleCell/SimpleCell";
import SubscribeButton from "./SubscribeButton";
class Gmap extends React.Component {
    constructor (props) {
        super(props);
        this.state ={GeoLocation: null}
    }
    static defaultProps = {
        center:{
            lat:30,
            lng:30
        },
        zoom: 11
    };
    FriendsCoord

    getGeo = async () =>  {await bridge.send('VKWebAppGetGeodata')
        .then(data=> {this.setState({GeoLocation: {lat:data.lat,lng:data.long}})});

    }
    render () {
        if(this.state.GeoLocation)this.FriendsCoord = [{name: 'Michael Porotkin', lat: this.state.GeoLocation.lat-1 , lng: this.state.GeoLocation.lng},
            {name: 'Some One', lat: this.state.GeoLocation.lat, lng: this.state.GeoLocation.lng+1}];
        return (

            <Group style={{
                height: '65vh', width: '95%' ,
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCA-CWX9xnTnxGmzIxkH_WIsGUrdeRI444' }}
                        center={this.state.GeoLocation?this.state.GeoLocation:this.props.center}
                        zoom={this.props.zoom}
                    >
                        {this.state.GeoLocation ? <Marker lat={this.state.GeoLocation.lat} lng={this.state.GeoLocation.lng} name={'Artem Buslaev'}/>:''}
                        {this.FriendsCoord ? this.FriendsCoord.map((Friend) => {
                            return <Marker lat={Friend.lat} lng={Friend.lng} name={Friend.name}/>}):''}
                    </GoogleMapReact>
                <GeoButton onClick={this.getGeo}/>

            </Group>
        )
    }
}
export default Gmap