import React from 'react';
import {Group, Header, Avatar, Spinner} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import SubscribeButton from "./SubscribeButton";
import bridge from '@vkontakte/vk-bridge';
import SimpleCell from "@vkontakte/vkui/dist/components/SimpleCell/SimpleCell";
import ApiConnector from "../services/apiConnector";
import Constants from "../constants";
import Search from "@vkontakte/vkui/dist/components/Search/Search";

class Friends extends React.Component {
    searchChange = (e) => {
        this.setState({
            search: e.target.value
        });
    };

    get friends() {
        const search = this.state.search.toUpperCase();
        return this.state.search !== ''
            ? this.state.friends.filter((friend) => friend.first_name.toUpperCase().indexOf(search) > -1
            || friend.last_name.toUpperCase().indexOf(search) > -1)
            : this.state.friends;
    }

    constructor (props) {
        super(props);
        this.state = {
          friends: null,
          user_id: null,
          subscribers: null,
          search: '',
          userSubscribers: null,
        };
        bridge.send("VKWebAppGetUserInfo", {}).then((user_data) => {
            ApiConnector.getSubscribers(user_data.id).then((response) => {
                response.json().then((api) => {
                    ApiConnector.getUserSubscribers(user_data.id).then((resp) => {
                        resp.json().then(userSubs => {
                            bridge.send("VKWebAppGetAuthToken", {"app_id": Constants.VK_APP_ID, "scope": "friends"})
                                .then(data => {
                                    this.getFriends(data.access_token).then(data => {
                                        this.setState({
                                            user_id: user_data.id,
                                            subscribers: api.subs,
                                            friends: data.response.items,
                                            userSubscribers: userSubs.subs,
                                        });
                                    });
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
                        v: Constants.VK_API_VERSION,
                    }
                });
    }

    render () {
        return (
            <Group>
                <Header mode="secondary" popout={this.state.popout}>Список друзей</Header>
                <Search value={this.state.search} onChange={this.searchChange} after={null}/>
                {this.state.friends ? this.friends.map((friend) => {
                    return <SimpleCell
                        key={friend.id}
                        before={<Avatar size={48} src={friend.photo_50}/>}
                        after={<SubscribeButton
                            user_id={this.state.user_id}
                            friend_id={friend.id}
                            subscribed={this.state.subscribers ? this.state.subscribers.includes(friend.id) : false}
                        />}
                        description={(this.state.userSubscribers && this.state.userSubscribers.indexOf(friend.id) > -1) ? "Ваш подписчик" : ""}
                    >{friend.first_name + ' ' + friend.last_name}</SimpleCell>
                }) : <Spinner size="regular" style={{ marginTop: 20 }}/> }
            </Group>
        )
    }
}
export default Friends
