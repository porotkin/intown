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
        console.log("sendGeoToServer started")
        await bridge.send('VKWebAppGetUserInfo')
            .then(userInfo => {
                console.log("got user info")
                ApiConnector.addUserLocation(userInfo.id, data.lat, data.long);
                console.log("user location sent")
                ApiConnector.getSubscribers(userInfo.id).then((response) => {
                    response.json().then((data) => {
                        console.log("got subs from backend api")
                        bridge.send('VKWebAppGetAuthToken', {"app_id": 7550756, "scope": "users"}).then(response => {
                            bridge.send('VKWebAppCallAPIMethod', {
                                method: "users.get",
                                request_id: "64test",
                                params: {
                                    user_ids: data.subs,
                                    fields: "first_name, last_name",
                                    v: "5.122",
                                    access_token: response.access_token,
                                }
                            }).then((data) => {
                                console.log(data.response)
                                data.response.forEach(user => {
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
                                });
                                this.setState({
                                    subscribers: this.friendsCoordinates
                                });
                            })
                        })
                    })
                });
            });
    }

    render () {
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
                {this.state.geoLocation ? <Marker lat={this.state.geoLocation.lat} lng={this.state.geoLocation.lng} name={'Вы'}/>:''}
                {this.state.subscribers.map((friend) => {
                    return <Marker key={friend.id} lat={friend.lat} lng={friend.lng} name={friend.name}/>})}
            </GoogleMapReact>
            <GeoButton onClick={this.getGeo}/>
            </Group>
        )
    }
}
export default Gmap