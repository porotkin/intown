import React from 'react';
import {Group, Header, Avatar} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import SubscribeButton from "./SubscribeButton";
import bridge from '@vkontakte/vk-bridge';
import SimpleCell from "@vkontakte/vkui/dist/components/SimpleCell/SimpleCell";
import Constants from "../../constants";

class Friends extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          access_token: null,
          friends: null,
          user_id: null,
          subscribers: null,
        };
        bridge.send("VKWebAppGetUserInfo", {}).then((data) => {
            this.setState({
                user_id: data.id
            });
        })
        bridge.send("VKWebAppGetAuthToken", {"app_id": 7550756, "scope": "friends"})
            .then(data => {
                this.setState({
                    access_token: data.access_token
                })
                this.getFriends()
                fetch(Constants.SERVER_API_ADDRESS + "/user/" + this.state.user_id, {
                    mode: "cors",
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    response.json().then((data) => {
                        this.setState({
                            subscribers: data
                        });
                    });
                });
            });
    }

    getFriends = async () => {
        await bridge
            .send('VKWebAppCallAPIMethod', {method: "friends.get", request_id: "32test", params: {
                    fields: "id, photo_50", order: "name", access_token: this.state.access_token,
                    v: "5.122",
                }})
            .then(data => {
                this.setState({
                    friends: data.response.items
                });
                console.log(data)
            })
            .catch(error => {
                // Handling an error
                console.log(error);
            });
    }

    render () {
        return (
            <Group>
                <Header mode="secondary">Список друзей</Header>
                {this.state.friends ? this.state.friends.map((friend) => {
                    return <SimpleCell before={<Avatar size={48} src={friend.photo_50}/>} after={<SubscribeButton subscribed={ this.state.subscribers.includes(friend.id) } />} description={friend.id}>{friend.first_name + ' ' + friend.last_name}</SimpleCell>
                }) : <SimpleCell>Loading</SimpleCell>}
            </Group>
        )
    }
}
export default Friends