import {Group, ScreenSpinner} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React from 'react';
import GeoButton from "./GeoButton";
import bridge from "@vkontakte/vk-bridge";
import ApiConnector from "../services/apiConnector";
import Constants from "../constants";
import {YMaps, Map, Clusterer, Placemark} from "react-yandex-maps";

class MapComponent extends React.Component {
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
            if (data && data.lat !== 0 && data.long !== 0) {
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
                                                    location: [location.lat, location.long],
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
                height: '100%', width: '100%',
                marginLeft: "auto",
                marginRight: "auto"
            }}>
            <YMaps>
                <Map
                    state={{
                        center: [55.75, 37.57],
                        zoom: 9,
                        controls: ['zoomControl'],
                    }}
                    modules={['control.ZoomControl']}
                    width={'100%'}
                    height={'70vh'}
                >
                    <Clusterer
                        options={{
                            preset: 'islands#invertedVioletClusterIcons',
                            groupByCoordinates: true,
                        }}
                    >
                        {this.state.subscribers.map((subscriber) => (
                            <Placemark key={subscriber.id}
                                       geometry={subscriber.location}
                            />
                        ))}
                    </Clusterer>
                </Map>
            </YMaps>
            <GeoButton onClick={this.sendGeoToServer}/>
            </Group>
        )
        : (<ScreenSpinner size="large" />)
    }
}
export default MapComponent
