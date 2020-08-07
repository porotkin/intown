import React from 'react';
import {Group, Header, Avatar} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import SubscribeButton from "./SubscribeButton";
import bridge from '@vkontakte/vk-bridge';
import SimpleCell from "@vkontakte/vkui/dist/components/SimpleCell/SimpleCell";

class Friends extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          access_token: null,
          friends: null
        };
        bridge.send("VKWebAppGetAuthToken", {"app_id": 7550756, "scope": "friends"})
            .then(data => {
                this.setState({
                    access_token: data.access_token
                })
                this.getFriends()
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
                    return <SimpleCell before={<Avatar size={48} src={friend.photo_50}/>} after={<SubscribeButton subscribed={false}/>} description={friend.id}>{friend.first_name + ' ' + friend.last_name}</SimpleCell>
                }) : <SimpleCell>Loading</SimpleCell>}
            </Group>
        )
    }
}
export default Friends