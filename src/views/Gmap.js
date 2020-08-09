import {Group} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React from 'react';
import GeoButton from "./GeoButton";
import bridge from "@vkontakte/vk-bridge";
import GoogleMapReact from 'google-map-react';
import Marker from '../panels/Marker'
import ApiConnector from "../services/apiConnector";

class Gmap extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            geoLocation: null,
            subscribers: []
        }
    }
    static defaultProps = {
        center:{
            lat:30,
            lng:30
        },
        zoom: 11
    };
    friendsCoordinates = []

    getGeo = async () =>  {
        await bridge.send('VKWebAppGetGeodata')
        .then(data => {
            this.setState({
                geoLocation: {
                    lat: data.lat,
                    lng: data.long,
                }
            });
            this.sendGeoToServer(data);
        });
    }

    sendGeoToServer = async (data) => {
        await bridge.send('VKWebAppGetUserInfo')
            .then(userInfo => {
                ApiConnector.addUserLocation(userInfo.id, data.lat, data.long).then();
                ApiConnector.getSubscribers(userInfo.id).then((response) => {
                    response.json((data) => {
                        bridge.send('VKWebAppCallAPIMethod', {
                            method: "users.get",
                            request_id: "test64",
                            params: {
                                user_ids: data.subs,
                                fields: "first_name, last_name",
                                v: "5.122",
                            }
                        }).then((data) => {
                            for (const user in data.response) {
                                ApiConnector.getUserLocation(user.id).then((response) => {
                                   response.json((location) => {
                                       const userLocation = {
                                           id: location.id,
                                           name: user.first_name + ' ' + user.last_name,
                                           date: location.date,
                                           lat: location.lat,
                                           lng: location.long,
                                       }
                                       this.friendsCoordinates.push(userLocation)
                                   });
                                });
                            }
                        })
                    })
                },
                    (reject) => {
                        console.log(reject)
                    });
            });
    }

    render () {
        if (this.state.geoLocation)
            this.friendsCoordinates = [
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
                {this.friendsCoordinates ? this.friendsCoordinates.map((friend) => {
                    return <Marker lat={friend.lat} lng={friend.lng} name={friend.name}/>}):''}
            </GoogleMapReact>
            <GeoButton onClick={this.getGeo}/>
            </Group>
        )
    }
}
export default Gmap