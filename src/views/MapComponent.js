import {Group, ScreenSpinner} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import React from 'react';
import GeoButton from "./GeoButton";
import bridge from "@vkontakte/vk-bridge";
import ApiConnector from "../services/apiConnector";
import Constants from "../constants";
import {YMaps, Map, ObjectManager} from "react-yandex-maps";

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
            long:30
        },
        zoom: 7
    };

    getGeo = async () =>  {
        return await bridge.send('VKWebAppGetGeodata');
    }

    sendGeoToServer = async () => {
        await this.getGeo().then(data => {
            ApiConnector.addUserLocation(this.state.user_id, data.lat, data.long);
        });
    }

    getGeoDataFromServer = async () => {
        await this.getGeo().then((data) => {
            this.setState({
                geoLocation: {
                    lat: data.lat,
                    long: data.long,
                }
            });
        })
        let subscribers = {
            type: "FeatureCollection",
            features: [],
        }
        subscribers.features.push({
            type: "Feature",
            id: 0,
            geometry: {
                type: "Point",
                coordinates: [this.state.geoLocation.lat, this.state.geoLocation.long],
            },
            properties: {
                balloonContentHeader: "Вы",
                balloonContentBody: "Нажмите на кнопку снизу, чтобы поделиться местоположением с друзьями!",
                balloonContentFooter: new Date().toISOString().split('T')[0],
            }
        });
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
                                                    type: "Feature",
                                                    id: location.id,
                                                    geometry: {
                                                        type: "Point",
                                                        coordinates: [location.lat, location.long],
                                                    },
                                                    properties: {
                                                        balloonContentHeader: user.first_name + ' ' + user.last_name,
                                                        balloonContentBody: "Ваш друг поделился местоположением!",
                                                        balloonContentFooter: location.date.toString().split('T')[0],
                                                    }
                                                }
                                                subscribers.features.push(userLocation)
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
                        center: [this.state.geoLocation.lat, this.state.geoLocation.long],
                        zoom: 7,
                        controls: ['zoomControl'],
                    }}
                    modules={['control.ZoomControl']}
                    width={'100%'}
                    height={'60vh'}
                >
                    <ObjectManager
                        options={{
                            clusterize: true,
                            gridSize: 32,
                        }}
                        objects={{
                            openBalloonOnClick: true,
                            preset: 'islands#blueDotIcon',
                        }}
                        clusters={{
                            preset: 'islands#greenClusterIcons',
                        }}
                        features={this.state.subscribers}
                        modules={[
                            'objectManager.addon.objectsBalloon',
                            'objectManager.addon.objectsHint',
                        ]}
                    />
                </Map>
            </YMaps>
            <GeoButton onClick={this.sendGeoToServer}/>
            </Group>
        )
        : (<ScreenSpinner style={{
                            margin: "75% 0 0 0",
                          }}
                          size="large" />)
    }
}
export default MapComponent
