import {Group, ScreenSpinner} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React from 'react';
import GeoButton from "./GeoButton";
import bridge from "@vkontakte/vk-bridge";
import GoogleMapReact from 'google-map-react';
import Marker from '../panels/Marker'
import ApiConnector from "../services/apiConnector";
import Constants from "../constants";

class Gmap extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            geoLocation: null,
            subscribers: null,
            user_id: null,
        }
        this.getGeoDataFromServer();
    }

    static defaultProps = {
        center:{
            lat:30,
            lng:30
        },
        zoom: 7
    };

    getGeo = async () =>  {
        return await bridge.send('VKWebAppGetGeodata');
    }

    sendGeoToServer = async () => {
        await this.getGeo().then(data => {
            if (data.lat !== 0 && data.long !== 0) {
                ApiConnector.addUserLocation(this.state.user_id, data.lat, data.long);
                this.setState({
                    geoLocation: {
                        lat: data.lat,
                        lng: data.long,
                    }
                });
            }
        });
    }

    getGeoDataFromServer = async () => {
        let subscribers = []
        await bridge.send('VKWebAppGetUserInfo')
            .then(userInfo => {
                this.setState({ user_id: userInfo.id });
                ApiConnector.getSubscribers(userInfo.id).then((response) => {
                    response.json().then((data) => {
                        bridge.send('VKWebAppGetAuthToken', {"app_id": Constants.VK_APP_ID, "scope": "users"}).then(response => {
                            bridge.send('VKWebAppCallAPIMethod', {
                                method: "users.get",
                                request_id: "64test",
                                params: {
                                    user_ids: data.subs.toString(),
                                    fields: "first_name, last_name",
                                    v: Constants.VK_API_VERSION,
                                    access_token: response.access_token,
                                }
                            }).then((data) => {
                                data.response.forEach(user => {
                                    ApiConnector.getUserLocation(user.id).then((response) => {
                                        response.json().then((location) => {
                                            if (location.date !== "") {
                                                const userLocation = {
                                                    id: location.id,
                                                    name: user.first_name + ' ' + user.last_name,
                                                    date: location.date,
                                                    lat: location.lat,
                                                    lng: location.lng,
                                                }
                                                subscribers.push(userLocation)
                                            }
                                        });
                                    });
                                });
                                this.setState({
                                    subscribers: subscribers
                                });
                            })
                        })
                    })
                });
            });
    }

    render () {
        return (this.state.subscribers)
        ? (
            <Group style={{
                height: '65vh', width: '95%',
                marginLeft: "auto",
                marginRight: "auto"
            }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCA-CWX9xnTnxGmzIxkH_WIsGUrdeRI444' }}
                center={this.state.geoLocation ? this.state.geoLocation : this.props.center}
                zoom={this.props.zoom}>
                {this.state.geoLocation ? <Marker lat={this.state.geoLocation.lat} lng={this.state.geoLocation.lng} name={'Вы'} date={new Date().toISOString().split("T")[0]}/>:''}
                {this.state.subscribers.map((friend) => {
                    return <Marker key={friend.id} lat={friend.lat} lng={friend.lng} name={friend.name} date={friend.date}/>})}
            </GoogleMapReact>
            <GeoButton onClick={this.sendGeoToServer}/>
            </Group>
        )
        : (<ScreenSpinner size="large" />)
    }
}
export default Gmap
