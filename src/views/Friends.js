import React from 'react';
import {Group, Header, Avatar, Spinner} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import SubscribeButton from "./SubscribeButton";
import bridge from '@vkontakte/vk-bridge';
import SimpleCell from "@vkontakte/vkui/dist/components/SimpleCell/SimpleCell";
import ApiConnector from "../services/apiConnector";

class Friends extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          friends: null,
          user_id: null,
          subscribers: null,
        };
        bridge.send("VKWebAppGetUserInfo", {}).then((user_data) => {
            ApiConnector.getSubscribers(user_data.id).then((response) => {
                response.json().then((api) => {
                    bridge.send("VKWebAppGetAuthToken", {"app_id": 7550756, "scope": "friends"})
                        .then(data => {
                            this.getFriends(data.access_token).then(data => {
                                this.setState({
                                    user_id: user_data.id,
                                    subscribers: api.subs,
                                    friends: data.response.items
                                });
                            });
                        });
                });
            }, (reject) => {
                console.log(reject)
            });
        })
    }

    getFriends = async (access_token) => {
        return await bridge
            .send('VKWebAppCallAPIMethod',
                {method: "friends.get", request_id: "32test",
                    params: {
                        fields: "id, photo_50",
                        order: "name",
                        access_token: access_token,
                        v: "5.122",
                    }
                });
    }

    render () {
        return (
            <Group>
                <Header mode="secondary" popout={this.state.popout}>Список друзей</Header>
                {this.state.friends ? this.state.friends.map((friend) => {
                    return <SimpleCell
                        key={friend.id}
                        before={<Avatar size={48} src={friend.photo_50}/>}
                        after={<SubscribeButton
                            user_id={this.state.user_id}
                            friend_id={friend.id}
                            subscribed={this.state.subscribers ? this.state.subscribers.includes(friend.id) : false}
                        />}
                        description={friend.id}
                    >{friend.first_name + ' ' + friend.last_name}</SimpleCell>
                }) : <Spinner size="regular" style={{ marginTop: 20 }}/> }
            </Group>
        )
    }
}
export default Friends